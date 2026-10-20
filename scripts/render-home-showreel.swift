// macOS AVFoundation export, using only Apple frameworks.
// swiftc scripts/render-home-showreel.swift -o /tmp/render-home-showreel
// /tmp/render-home-showreel CONFIG.json OUTPUT_DIR SOURCE_DIR FRAME_DIR
// Source filenames and selected times come from CONFIG. Originals stay outside public/.
// FRAME_DIR receives lossless PNG frames; encode the three selected posters as WebP separately.
import Foundation
import AVFoundation
import AppKit
import CoreImage
import CoreText
import CryptoKit

struct ExportError: Error, CustomStringConvertible { let description:String; init(_ message:String){description=message} }
func require(_ condition:@autoclosure()->Bool,_ message:String)throws{if !condition(){throw ExportError(message)}}
struct Clip:Decodable {let id:String;let file:String;let startSeconds:Double;let durationSeconds:Double;let posterSourceSeconds:Double?}
struct Config:Decodable {
 let width:Int;let height:Int;let frameRate:Int;let averageBitRate:Int
 let brandSeconds:Double;let transitionSeconds:Double;let output:String;let clips:[Clip]
}
let fm=FileManager.default
let args=CommandLine.arguments
guard args.count==5 else{fputs("Usage: render-home-showreel CONFIG.json OUTPUT_DIR SOURCE_DIR FRAME_DIR\n",stderr);exit(2)}
let configURL=URL(fileURLWithPath:args[1]),outputDir=URL(fileURLWithPath:args[2],isDirectory:true)
let sourceDir=URL(fileURLWithPath:args[3],isDirectory:true),frameDir=URL(fileURLWithPath:args[4],isDirectory:true)
let config=try JSONDecoder().decode(Config.self,from:Data(contentsOf:configURL))
try require(config.width%2==0 && config.height%2==0 && config.frameRate>0,"Even dimensions and a positive frame rate are required")
try require(config.clips.count==3 && config.transitionSeconds>0 && config.brandSeconds>config.transitionSeconds,"Three clips and valid brand/dissolve durations are required")
try fm.createDirectory(at:outputDir,withIntermediateDirectories:true)
try fm.createDirectory(at:frameDir,withIntermediateDirectories:true)
let bounds=CGRect(x:0,y:0,width:config.width,height:config.height)
let colorSpace=CGColorSpace(name:CGColorSpace.sRGB)!
let context=CIContext(options:[.workingColorSpace:colorSpace,.outputColorSpace:colorSpace,.cacheIntermediates:false])
let matte=CIImage(color:CIColor(red:17.0/255,green:16.0/255,blue:18.0/255)).cropped(to:bounds)

func writePNG(_ image:CIImage,_ url:URL)throws{
 guard let cg=context.createCGImage(image,from:bounds) else{throw ExportError("Could not make poster frame")}
 let rep=NSBitmapImageRep(cgImage:cg)
 guard let png=rep.representation(using:.png,properties:[:]) else{throw ExportError("PNG encoding failed")}
 try png.write(to:url,options:.atomic)
}
func brandImage()throws->CIImage{
 guard let cg=CGContext(data:nil,width:config.width,height:config.height,bitsPerComponent:8,bytesPerRow:0,space:colorSpace,bitmapInfo:CGImageAlphaInfo.premultipliedLast.rawValue) else{throw ExportError("Brand context failed")}
 cg.setFillColor(CGColor(red:17.0/255,green:16.0/255,blue:18.0/255,alpha:1));cg.fill(bounds)
 let scale=CGFloat(config.width)/1280
 cg.saveGState();cg.scaleBy(x:scale,y:scale)
 let font=NSFont(name:"HelveticaNeue-Bold",size:108) ?? NSFont.systemFont(ofSize:108,weight:.bold)
 let orange=NSColor(calibratedRed:1,green:112.0/255,blue:73.0/255,alpha:1)
 let title=NSMutableAttributedString(string:"Game",attributes:[.font:font,.foregroundColor:NSColor(calibratedWhite:0.96,alpha:1),.kern:-4])
 title.append(NSAttributedString(string:"Map",attributes:[.font:font,.foregroundColor:orange,.kern:-4]))
 let line=CTLineCreateWithAttributedString(title),textWidth=CGFloat(CTLineGetTypographicBounds(line,nil,nil,nil))
 let markSize:CGFloat=112,gap:CGFloat=31,total=markSize+gap+textWidth,start=(1280-total)/2
 // Exact polygon coordinates of website/public/assets/brand/gamemap-mark.svg, y flipped for Quartz.
 func polygon(_ points:[CGPoint],_ color:CGColor){
  cg.beginPath();cg.move(to:points[0]);for point in points.dropFirst(){cg.addLine(to:point)};cg.closePath();cg.setFillColor(color);cg.fillPath()
 }
 cg.saveGState();cg.translateBy(x:start,y:330+markSize);cg.scaleBy(x:markSize/72,y:-markSize/72)
 polygon([CGPoint(x:31,y:3),CGPoint(x:48.3,y:13),CGPoint(x:35.5,y:20.4),CGPoint(x:31,y:17.8),CGPoint(x:13.5,y:27.9),CGPoint(x:13.5,y:48.1),CGPoint(x:31,y:58.2),CGPoint(x:48.5,y:48.1),CGPoint(x:48.5,y:43),CGPoint(x:31,y:43),CGPoint(x:31,y:30.5),CGPoint(x:61,y:30.5),CGPoint(x:61,y:54.4),CGPoint(x:31,y:71.7),CGPoint(x:1,y:54.4),CGPoint(x:1,y:20.3)],orange.cgColor)
 polygon([CGPoint(x:1,y:20.3),CGPoint(x:13.5,y:27.9),CGPoint(x:13.5,y:48.1),CGPoint(x:31,y:58.2),CGPoint(x:31,y:71.7),CGPoint(x:1,y:54.4)],NSColor(calibratedRed:204.0/255,green:89.0/255,blue:56.0/255,alpha:1).cgColor)
 polygon([CGPoint(x:61,y:1),CGPoint(x:69,y:5.6),CGPoint(x:69,y:14.8),CGPoint(x:61,y:19.4),CGPoint(x:53,y:14.8),CGPoint(x:53,y:5.6)],orange.cgColor)
 cg.restoreGState()
 cg.textPosition=CGPoint(x:start+markSize+gap,y:345);CTLineDraw(line,cg)
 let subtitle=NSAttributedString(string:"AI × GAMES × WORLDS",attributes:[.font:NSFont.systemFont(ofSize:18,weight:.medium),.foregroundColor:NSColor(calibratedWhite:0.64,alpha:1),.kern:4.8])
 let subLine=CTLineCreateWithAttributedString(subtitle),subWidth=CGFloat(CTLineGetTypographicBounds(subLine,nil,nil,nil))
 cg.textPosition=CGPoint(x:(1280-subWidth)/2,y:278);CTLineDraw(subLine,cg)
 cg.restoreGState()
 guard let image=cg.makeImage() else{throw ExportError("Brand image failed")};return CIImage(cgImage:image)
}
let brand=try brandImage()

final class VideoSource {
 let clip:Clip;let reader:AVAssetReader;let output:AVAssetReaderTrackOutput;let track:AVAssetTrack
 var current:CMSampleBuffer?;var next:CMSampleBuffer?;var actual:[String:Any]
 init(_ clip:Clip)throws{
  self.clip=clip
  let source=sourceDir.appendingPathComponent(clip.file)
  try require(fm.fileExists(atPath:source.path),"Missing original: \(clip.file)")
  let asset=AVURLAsset(url:source)
  guard let track=asset.tracks(withMediaType:.video).first else{throw ExportError("No video: \(clip.file)")};self.track=track
  let duration=CMTimeGetSeconds(asset.duration)
  try require(duration>=clip.startSeconds+clip.durationSeconds,"Selected range exceeds \(clip.file): \(duration)s")
  reader=try AVAssetReader(asset:asset)
  output=AVAssetReaderTrackOutput(track:track,outputSettings:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32BGRA])
  output.alwaysCopiesSampleData=false
  try require(reader.canAdd(output),"Cannot decode \(clip.file)");reader.add(output)
  reader.timeRange=CMTimeRange(start:CMTime(seconds:clip.startSeconds,preferredTimescale:60000),duration:CMTime(seconds:clip.durationSeconds,preferredTimescale:60000))
  let rect=CGRect(origin:.zero,size:track.naturalSize).applying(track.preferredTransform)
  actual=["id":clip.id,"file":clip.file,"width":abs(rect.width),"height":abs(rect.height),"durationSeconds":duration,"frameRate":track.nominalFrameRate,"sourceStartSeconds":clip.startSeconds,"selectedDurationSeconds":clip.durationSeconds]
  try require(reader.startReading(),"Reader failed: \(reader.error?.localizedDescription ?? clip.file)")
  next=output.copyNextSampleBuffer()
 }
 func image(at elapsed:Double)throws->CIImage{
  let target=clip.startSeconds+max(0,min(clip.durationSeconds,elapsed))
  while let sample=next {
   let pts=CMTimeGetSeconds(CMSampleBufferGetPresentationTimeStamp(sample))
   if current != nil && pts>target{break}
   current=sample;next=output.copyNextSampleBuffer()
  }
  if reader.status == .failed{throw ExportError("Decode failed \(clip.file): \(reader.error?.localizedDescription ?? "unknown")")}
  guard let sample=current,let pixel=CMSampleBufferGetImageBuffer(sample) else{throw ExportError("No decoded frame: \(clip.file)")}
  var image=CIImage(cvPixelBuffer:pixel).transformed(by:track.preferredTransform)
  let rect=image.extent
  image=image.transformed(by:CGAffineTransform(translationX:-rect.minX,y:-rect.minY))
  let scale=min(bounds.width/rect.width,bounds.height/rect.height)
  image=image.transformed(by:CGAffineTransform(scaleX:scale,y:scale))
  image=image.transformed(by:CGAffineTransform(translationX:(bounds.width-rect.width*scale)/2,y:(bounds.height-rect.height*scale)/2))
  return image.composited(over:matte).cropped(to:bounds)
 }
}
let sources=try config.clips.map{try VideoSource($0)}
struct Segment {let start:Double;let duration:Double;let source:Int?;var end:Double{start+duration}}
var segments=[Segment(start:0,duration:config.brandSeconds,source:nil)]
for (index,clip) in config.clips.enumerated(){segments.append(Segment(start:segments.last!.end-config.transitionSeconds,duration:clip.durationSeconds,source:index))}
segments.append(Segment(start:segments.last!.end-config.transitionSeconds,duration:config.brandSeconds,source:nil))
let intendedDuration=segments.last!.end,totalFrames=Int(ceil(intendedDuration*Double(config.frameRate)))
let duration=Double(totalFrames)/Double(config.frameRate)
func picture(_ segment:Segment,_ t:Double)throws->CIImage{if let source=segment.source{return try sources[source].image(at:t-segment.start)};return brand}
func outputImage(_ t:Double)throws->CIImage{
 let active=segments.filter{$0.start<=t && t<$0.end}
 guard let first=active.first else{return brand}
 let a=try picture(first,t)
 if active.count<2{return a}
 let b=active[1],progress=max(0,min(1,(t-b.start)/config.transitionSeconds))
 return a.applyingFilter("CIDissolveTransition",parameters:[kCIInputTargetImageKey:try picture(b,t),kCIInputTimeKey:progress]).cropped(to:bounds)
}
// Posters retain complete source frames, before any title/dissolve. A separate reader
// permits a clearer mid-shot poster without changing the movie reader's frame position.
for clip in config.clips {
 let posterSource=try VideoSource(clip)
 let sourceTime=clip.posterSourceSeconds ?? clip.startSeconds
 try require(sourceTime>=clip.startSeconds && sourceTime<clip.startSeconds+clip.durationSeconds,"Poster must belong to the selected source range")
 try writePNG(posterSource.image(at:sourceTime-clip.startSeconds),frameDir.appendingPathComponent(clip.id+".png"))
}
try writePNG(brand,frameDir.appendingPathComponent("gamemap-brand.png"))
let movie=outputDir.appendingPathComponent(config.output)
// AVFoundation may retain an intermediate .sb file during fast-start atom relocation.
// Stage that work beside temporary frames so only the finished movie enters public/.
let stagedMovie=frameDir.appendingPathComponent("export-"+UUID().uuidString+".mp4")
let writer=try AVAssetWriter(outputURL:stagedMovie,fileType:.mp4);writer.shouldOptimizeForNetworkUse=true
let input=AVAssetWriterInput(mediaType:.video,outputSettings:[
 AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:config.width,AVVideoHeightKey:config.height,
 AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:config.averageBitRate,AVVideoProfileLevelKey:AVVideoProfileLevelH264MainAutoLevel,AVVideoMaxKeyFrameIntervalKey:config.frameRate*2,AVVideoExpectedSourceFrameRateKey:config.frameRate],
 AVVideoColorPropertiesKey:[AVVideoColorPrimariesKey:AVVideoColorPrimaries_ITU_R_709_2,AVVideoTransferFunctionKey:AVVideoTransferFunction_ITU_R_709_2,AVVideoYCbCrMatrixKey:AVVideoYCbCrMatrix_ITU_R_709_2]
])
input.expectsMediaDataInRealTime=false
let adaptor=AVAssetWriterInputPixelBufferAdaptor(assetWriterInput:input,sourcePixelBufferAttributes:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32BGRA,kCVPixelBufferWidthKey as String:config.width,kCVPixelBufferHeightKey as String:config.height,kCVPixelBufferIOSurfacePropertiesKey as String:[:]])
try require(writer.canAdd(input),"Cannot add H.264 writer");writer.add(input)
try require(writer.startWriting(),"Cannot start writer: \(writer.error?.localizedDescription ?? "unknown")");writer.startSession(atSourceTime:.zero)
for frame in 0..<totalFrames {
 try autoreleasepool {
  while !input.isReadyForMoreMediaData {
   try require(writer.status != .failed,"Writer failed: \(writer.error?.localizedDescription ?? "unknown")")
   Thread.sleep(forTimeInterval:0.002)
  }
  var buffer:CVPixelBuffer?
  guard let pool=adaptor.pixelBufferPool else{throw ExportError("No output pixel pool")}
  try require(CVPixelBufferPoolCreatePixelBuffer(kCFAllocatorDefault,pool,&buffer)==kCVReturnSuccess,"Cannot allocate output frame")
  guard let pixel=buffer else{throw ExportError("Missing output frame")}
  let t=Double(frame)/Double(config.frameRate),image=try outputImage(t)
  context.render(image,to:pixel,bounds:bounds,colorSpace:colorSpace)
  try require(adaptor.append(pixel,withPresentationTime:CMTime(value:Int64(frame),timescale:Int32(config.frameRate))),"Could not encode frame \(frame): \(writer.error?.localizedDescription ?? "unknown")")
 }
 if frame%120==0{print("Encoded \(frame)/\(totalFrames) frames")}
}
writer.endSession(atSourceTime:CMTime(value:Int64(totalFrames),timescale:Int32(config.frameRate)))
input.markAsFinished();let finished=DispatchSemaphore(value:0);writer.finishWriting{finished.signal()};finished.wait()
try require(writer.status == .completed,"Export failed: \(writer.error?.localizedDescription ?? "unknown")")
if fm.fileExists(atPath:movie.path){try fm.removeItem(at:movie)}
try fm.moveItem(at:stagedMovie,to:movie)
let asset=AVURLAsset(url:movie),video=asset.tracks(withMediaType:.video).first!
let bytes=try Data(contentsOf:movie)
let sha256=SHA256.hash(data:bytes).map{String(format:"%02x",$0)}.joined()
let clipTimeline=segments.compactMap{segment->[String:Any]? in
 guard let index=segment.source else{return nil};var item=sources[index].actual
 item["startSeconds"]=segment.start;item["endSeconds"]=segment.end
 item["seekSeconds"]=segment.start+config.transitionSeconds
 item["poster"]=config.clips[index].id+".webp"
 return item
}
let transitions=segments.dropFirst().map{["startSeconds":$0.start,"endSeconds":$0.start+config.transitionSeconds]}
let result:[String:Any]=[
 "asset":config.output,"width":config.width,"height":config.height,"frameRate":video.nominalFrameRate,
 "framesEncoded":totalFrames,"intendedDurationSeconds":intendedDuration,"durationSeconds":CMTimeGetSeconds(asset.duration),"frameAlignedDurationSeconds":duration,
 "codec":"avc1","silent":asset.tracks(withMediaType:.audio).isEmpty,"audioTracks":asset.tracks(withMediaType:.audio).count,
 "fastStart":true,"bytes":bytes.count,"sha256":sha256,"averageBitRate":config.averageBitRate,"fullFramePreserved":true,"fit":"contain","matte":"#111012",
 "brand":["introStartSeconds":0,"introEndSeconds":config.brandSeconds,"outroStartSeconds":segments.last!.start,"outroEndSeconds":duration,"sameImageAtBothEnds":true],
 "clips":clipTimeline,"transitions":transitions,"exportedAt":ISO8601DateFormatter().string(from:Date())
]
let json=try JSONSerialization.data(withJSONObject:result,options:[.prettyPrinted,.sortedKeys])
try json.write(to:frameDir.appendingPathComponent("render-metadata.json"),options:.atomic)
print(String(data:json,encoding:.utf8)!)
