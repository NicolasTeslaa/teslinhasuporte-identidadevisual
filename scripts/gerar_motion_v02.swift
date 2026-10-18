import AVFoundation
import AppKit
import CoreGraphics
import CoreText
import Foundation

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let output = root.appendingPathComponent("assets/marketing/2026-10-18_12-34-01_assistencia-tecnica-motion_v02.mp4")
let voice = root.appendingPathComponent("assets/marketing/2026-10-18_12-34-01_locucao-motion_v02.aiff")
let visualURL = root.appendingPathComponent("assets/marketing/2026-10-18_12-34-01_aparelhos-motion_v02.png")
let logoURL = root.appendingPathComponent("assets/logo/LOGO PNG TRANSPARENTE.png")

let width = 1080
let height = 1920
let fps: Int32 = 30
let duration: Double = 8.0

func loadImage(_ url: URL) -> CGImage {
    let source = CGImageSourceCreateWithURL(url as CFURL, nil)!
    return CGImageSourceCreateImageAtIndex(source, 0, nil)!
}

let visual = loadImage(visualURL)
let logo = loadImage(logoURL)

func clamp(_ x: CGFloat) -> CGFloat { max(0, min(1, x)) }
func ease(_ x: CGFloat) -> CGFloat {
    let t = clamp(x)
    return t * t * (3 - 2 * t)
}

func color(_ hex: UInt32, alpha: CGFloat = 1) -> CGColor {
    let r = CGFloat((hex >> 16) & 255) / 255
    let g = CGFloat((hex >> 8) & 255) / 255
    let b = CGFloat(hex & 255) / 255
    return CGColor(red: r, green: g, blue: b, alpha: alpha)
}

func roundedRect(_ ctx: CGContext, _ rect: CGRect, radius: CGFloat, fill: CGColor) {
    ctx.setFillColor(fill)
    ctx.addPath(CGPath(roundedRect: rect, cornerWidth: radius, cornerHeight: radius, transform: nil))
    ctx.fillPath()
}

func drawText(_ ctx: CGContext, _ text: String, _ rect: CGRect, size: CGFloat, color: CGColor, weight: NSFont.Weight = .bold, alignment: NSTextAlignment = .left) {
    let font = NSFont(name: weight == .regular ? "AvenirNext-Regular" : "AvenirNext-Bold", size: size) ?? NSFont.systemFont(ofSize: size, weight: weight)
    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = alignment
    paragraph.lineSpacing = -2
    let attributes: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: NSColor(cgColor: color) ?? NSColor.white,
        .paragraphStyle: paragraph
    ]
    let ns = NSString(string: text)
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = NSGraphicsContext(cgContext: ctx, flipped: true)
    ns.draw(in: rect, withAttributes: attributes)
    NSGraphicsContext.restoreGraphicsState()
}

func drawImageAspectFill(_ ctx: CGContext, _ image: CGImage, _ rect: CGRect, alpha: CGFloat = 1, zoom: CGFloat = 1) {
    let iw = CGFloat(image.width)
    let ih = CGFloat(image.height)
    let scale = max(rect.width / iw, rect.height / ih) * zoom
    let drawW = iw * scale
    let drawH = ih * scale
    let drawRect = CGRect(x: rect.midX - drawW / 2, y: rect.midY - drawH / 2, width: drawW, height: drawH)
    ctx.saveGState()
    ctx.setAlpha(alpha)
    ctx.addPath(CGPath(roundedRect: rect, cornerWidth: 42, cornerHeight: 42, transform: nil))
    ctx.clip()
    ctx.translateBy(x: 0, y: rect.minY + rect.maxY)
    ctx.scaleBy(x: 1, y: -1)
    ctx.draw(image, in: drawRect)
    ctx.restoreGState()
}


func picture(_ ctx: CGContext, _ image: CGImage, _ rect: CGRect) {
    ctx.saveGState()
    ctx.translateBy(x: rect.minX, y: rect.maxY); ctx.scaleBy(x: 1, y: -1)
    ctx.draw(image, in: CGRect(x: 0, y: 0, width: rect.width, height: rect.height))
    ctx.restoreGState()
}
func label(_ ctx: CGContext, _ text: String, _ x: CGFloat, _ y: CGFloat,
           _ size: CGFloat, _ hex: UInt32, regular: Bool = false, centered: Bool = false) {
    drawText(ctx, text, CGRect(x: x, y: y, width: 1080-2*x, height: size*1.55),
             size: size, color: color(hex), weight: regular ? .regular : .bold,
             alignment: centered ? .center : .left)
}
func brand(_ ctx: CGContext, dark: Bool = false) {
    roundedRect(ctx, CGRect(x: 84, y: 205, width: 82, height: 82), radius: 18, fill: color(0x101B36))
    picture(ctx, logo, CGRect(x: 95, y: 215, width: 60, height: 61))
    label(ctx, "Teslinha", 186, 201, 40, dark ? 0xFFFFFF : 0x101B36)
    label(ctx, "S U P O R T E", 188, 252, 17, dark ? 0xFFFFFF : 0x075BFF)
}
func scene(_ ctx: CGContext, _ number: Int, _ t: Double) {
    let blue: UInt32 = 0x075BFF, navy: UInt32 = 0x101B36
    ctx.setFillColor(color(number == 1 ? blue : 0xFFFFFF))
    ctx.fill(CGRect(x: 0, y: 0, width: 1080, height: 1920))
    brand(ctx, dark: number == 1)
    let enter = 1-pow(1-min(max(t/0.65,0),1),4)
    if number == 0 {
        label(ctx, "Deu", 84, 378, 126, navy)
        label(ctx, "problema?", 84, 520, 126, blue)
        label(ctx, "A gente cuida.", 88, 696, 46, navy, regular: true)
        let w = CGFloat(1040*(1+0.025*t))
        picture(ctx, visual, CGRect(x: (1080-w)/2, y: 846+CGFloat(1-enter)*60, width: w, height: w*2/3))
        label(ctx, "Computadores • Notebooks • Celulares", 70, 1590, 33, navy, regular: true, centered: true)
        ctx.setFillColor(color(blue))
        ctx.fill(CGRect(x: 84, y: 1683, width: 912*CGFloat(min(t/2.9,1)), height: 5))
    } else if number == 1 {
        label(ctx, "Assistência", 84, 410, 92, 0xFFFFFF)
        label(ctx, "técnica.", 84, 515, 92, 0xFFFFFF)
        for (i, word) in ["Diagnóstico", "Manutenção", "Reparos", "Upgrades"].enumerated() {
            let p = min(max((t-Double(i)*0.12)/0.42,0),1)
            let e = 1-pow(1-p,3)
            ctx.saveGState(); ctx.setAlpha(CGFloat(e))
            ctx.translateBy(x: CGFloat(1-e)*65, y: 0)
            let y = CGFloat(806+i*154)
            label(ctx, word, 87, y, 66, 0xFFFFFF)
            ctx.setFillColor(color(0xFFFFFF, alpha: 0.28))
            ctx.fill(CGRect(x: 88, y: y+112, width: 904, height: 1.5))
            ctx.restoreGState()
        }
        label(ctx, "Para sua tecnologia voltar à rotina.", 88, 1535, 34, 0xFFFFFF, regular: true)
    } else {
        label(ctx, "Vamos", 84, 420, 120, navy)
        label(ctx, "resolver?", 84, 558, 120, blue)
        picture(ctx, visual, CGRect(x: 130, y: 785, width: 820, height: 820*2/3))
        label(ctx, "Fale com a Teslinha", 84, 1365, 48, navy)
        roundedRect(ctx, CGRect(x: 84, y: 1463, width: 912, height: 164), radius: 24, fill: color(blue))
        label(ctx, "WhatsApp", 112, 1482, 26, 0xFFFFFF, regular: true)
        label(ctx, "(11) 91024-6542", 112, 1524, 58, 0xFFFFFF)
        label(ctx, "Várzea Paulista • Jundiaí e região", 84, 1665, 28, navy, regular: true)
    }
}
func drawFrame(_ ctx: CGContext, time: Double) {
    let edges: [Double] = [2.85,5.35]
    let number = time < edges[0] ? 0 : (time < edges[1] ? 1 : 2)
    let start = number == 0 ? 0 : edges[number-1]
    if number > 0 && time-start < 0.32 {
        scene(ctx, number-1, time-(number == 1 ? 0 : edges[0]))
        let p = CGFloat((time-start)/0.32), reveal = 1-pow(1-CGFloat((time-start)/0.32),3)
        _ = p
        ctx.saveGState()
        ctx.clip(to: CGRect(x: 1080*(1-reveal), y: 0, width: 1080*reveal, height: 1920))
        scene(ctx, number, time-start); ctx.restoreGState()
    } else { scene(ctx, number, time-start) }
}

func makePixelBuffer(_ time: Double, pool: CVPixelBufferPool) -> CVPixelBuffer {
    var pixelBuffer: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, pool, &pixelBuffer)
    let buffer = pixelBuffer!
    CVPixelBufferLockBaseAddress(buffer, [])
    let base = CVPixelBufferGetBaseAddress(buffer)!
    let bytesPerRow = CVPixelBufferGetBytesPerRow(buffer)
    let ctx = CGContext(data: base, width: width, height: height, bitsPerComponent: 8, bytesPerRow: bytesPerRow, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)!
    ctx.translateBy(x: 0, y: CGFloat(height))
    ctx.scaleBy(x: 1, y: -1)
    drawFrame(ctx, time: time)
    CVPixelBufferUnlockBaseAddress(buffer, [])
    return buffer
}


if CommandLine.arguments.contains("--preview") {
    for (i,t) in [1.5,4.4,6.8].enumerated() {
        let ctx = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: width*4, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        ctx.translateBy(x: 0, y: CGFloat(height)); ctx.scaleBy(x: 1, y: -1)
        drawFrame(ctx, time: t)
        let rep = NSBitmapImageRep(cgImage: ctx.makeImage()!)
        try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "/tmp/teslinha-v02-scene-\(i).png"))
    }
    exit(0)
}
let writer = try AVAssetWriter(outputURL: output, fileType: .mp4)
let settings: [String: Any] = [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: width, AVVideoHeightKey: height, AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 8_000_000, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel]]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA, kCVPixelBufferWidthKey as String: width, kCVPixelBufferHeightKey as String: height])
let voiceAsset = AVURLAsset(url: voice)
let voiceReader = try AVAssetReader(asset: voiceAsset)
let voiceTrack = voiceAsset.tracks(withMediaType: .audio).first!
let voiceOutput = AVAssetReaderTrackOutput(track: voiceTrack, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM, AVSampleRateKey: 22050, AVNumberOfChannelsKey: 1, AVLinearPCMBitDepthKey: 16, AVLinearPCMIsFloatKey: false, AVLinearPCMIsBigEndianKey: false])
voiceReader.add(voiceOutput)
let audioInput = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 22050, AVNumberOfChannelsKey: 1, AVEncoderBitRateKey: 64000])
writer.add(input)
writer.add(audioInput)
voiceReader.startReading()
writer.startWriting()
writer.startSession(atSourceTime: .zero)

let pool = adaptor.pixelBufferPool!
let appendGroup = DispatchGroup()
appendGroup.enter()
DispatchQueue.global(qos: .userInitiated).async {
    for frame in 0..<Int(duration * Double(fps)) {
        while !input.isReadyForMoreMediaData { usleep(1000) }
        let time = Double(frame) / Double(fps)
        if !adaptor.append(makePixelBuffer(time, pool: pool), withPresentationTime: CMTime(value: CMTimeValue(frame), timescale: fps)) {
            let errorDescription = writer.error?.localizedDescription ?? "unknown"
            fputs("Frame append failed: \(errorDescription)\n", stderr)
            exit(1)
        }
    }
    input.markAsFinished()
    appendGroup.leave()
}
appendGroup.enter()
DispatchQueue.global(qos: .userInitiated).async {
    while let sample = voiceOutput.copyNextSampleBuffer() {
        while !audioInput.isReadyForMoreMediaData { usleep(1000) }
        audioInput.append(sample)
    }
    audioInput.markAsFinished()
    appendGroup.leave()
}
appendGroup.wait()
let writerSemaphore = DispatchSemaphore(value: 0)
writer.finishWriting { writerSemaphore.signal() }
writerSemaphore.wait()
guard writer.status == .completed else {
    let errorDescription = writer.error?.localizedDescription ?? "unknown"
    fputs("Writer failed: \(errorDescription)\n", stderr)
    exit(1)
}
print("motion written to \(output.path)")


