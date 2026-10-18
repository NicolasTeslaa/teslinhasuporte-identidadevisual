import AVFoundation
import AppKit
import CoreGraphics
import CoreText
import Foundation

let root = URL(fileURLWithPath: "/Users/tesla/Documents/teslinhasuporte-identidadevisual")
let output = root.appendingPathComponent("assets/marketing/2026-10-18_12-26-31_assistencia-tecnica-motion_v01.mov")
let voice = root.appendingPathComponent("assets/marketing/.motion-voice.aiff")
let visualURL = root.appendingPathComponent("assets/marketing/2026-10-18_11-00-06_assistencia-notebook-lento-story_v01.png")
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
    let font = NSFont.systemFont(ofSize: size, weight: weight)
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

func drawFrame(_ ctx: CGContext, time: Double) {
    ctx.setFillColor(color(0xF8FBFF))
    ctx.fill(CGRect(x: 0, y: 0, width: width, height: height))

    // Brand arc and subtle background motion.
    ctx.saveGState()
    ctx.setStrokeColor(color(0x075BFF, alpha: 0.94))
    ctx.setLineWidth(30)
    let arcShift = CGFloat(sin(time * 0.9)) * 35
    let arc = CGMutablePath()
    arc.move(to: CGPoint(x: -180, y: 260 + arcShift))
    arc.addCurve(to: CGPoint(x: 1250, y: 80 + arcShift), control1: CGPoint(x: 260, y: 1060), control2: CGPoint(x: 860, y: 860))
    ctx.addPath(arc)
    ctx.strokePath()
    ctx.restoreGState()

    let navy = color(0x101B36)
    let blue = color(0x075BFF)
    let lightBlue = color(0x55B8FF)

    if time < 2.0 {
        let p = ease(CGFloat(time / 0.55))
        drawText(ctx, "SEU", CGRect(x: 82, y: 1370 - 100 * (1 - p), width: 916, height: 120), size: 92, color: blue)
        drawText(ctx, "COMPUTADOR, NOTEBOOK\nOU CELULAR DEU PROBLEMA?", CGRect(x: 82, y: 1015 - 90 * (1 - p), width: 916, height: 300), size: 66, color: navy)
        drawText(ctx, "A assistência certa começa pelo diagnóstico.", CGRect(x: 86, y: 820, width: 880, height: 100), size: 34, color: navy, weight: .regular)
        roundedRect(ctx, CGRect(x: 120, y: 330, width: 840, height: 360), radius: 38, fill: color(0xEAF3FF))
        drawText(ctx, "💻     💻     📱", CGRect(x: 140, y: 440, width: 800, height: 150), size: 92, color: blue, alignment: .center)
    } else if time < 4.0 {
        let p = ease(CGFloat((time - 2.0) / 0.6))
        let imageRect = CGRect(x: 70, y: 690, width: 940, height: 1010)
        drawImageAspectFill(ctx, visual, imageRect, alpha: 0.95, zoom: 1.05 + p * 0.04)
        roundedRect(ctx, CGRect(x: 64, y: 1180, width: 952, height: 470), radius: 38, fill: color(0x050B1A, alpha: 0.75))
        drawText(ctx, "A TESLINHA\nRESOLVE.", CGRect(x: 110, y: 1290 - 40 * (1 - p), width: 860, height: 240), size: 82, color: color(0xFFFFFF))
        drawText(ctx, "Suporte técnico para voltar à rotina.", CGRect(x: 112, y: 1170, width: 820, height: 80), size: 30, color: color(0xFFFFFF), weight: .regular)
    } else if time < 6.5 {
        let p = ease(CGFloat((time - 4.0) / 0.45))
        drawText(ctx, "ASSISTÊNCIA TÉCNICA", CGRect(x: 70, y: 1510, width: 940, height: 100), size: 44, color: blue, alignment: .center)
        let items = ["Diagnóstico", "Manutenção", "Reparos", "Upgrades"]
        for (i, item) in items.enumerated() {
            let y = CGFloat(1230 - i * 155) + 80 * (1 - p)
            roundedRect(ctx, CGRect(x: 150, y: y, width: 780, height: 106), radius: 28, fill: color(0xFFFFFF))
            ctx.setStrokeColor(color(0xD7E7FF))
            ctx.setLineWidth(2)
            ctx.addPath(CGPath(roundedRect: CGRect(x: 150, y: y, width: 780, height: 106), cornerWidth: 28, cornerHeight: 28, transform: nil))
            ctx.strokePath()
            drawText(ctx, "✓  (item)", CGRect(x: 205, y: y + 25, width: 650, height: 60), size: 34, color: navy, weight: .semibold)
        }
    } else {
        let p = ease(CGFloat((time - 6.5) / 0.45))
        let logoRect = CGRect(x: 300, y: 1120, width: 480, height: 480)
        ctx.saveGState()
        ctx.setAlpha(p)
        ctx.draw(logo, in: logoRect)
        ctx.restoreGState()
        drawText(ctx, "CHAME NO WHATSAPP", CGRect(x: 70, y: 900, width: 940, height: 90), size: 46, color: navy, alignment: .center)
        roundedRect(ctx, CGRect(x: 120, y: 700, width: 840, height: 140), radius: 70, fill: blue)
        drawText(ctx, "(11) 91024-6542", CGRect(x: 140, y: 735, width: 800, height: 70), size: 48, color: color(0xFFFFFF), alignment: .center)
        drawText(ctx, "Teslinha Suporte", CGRect(x: 70, y: 500, width: 940, height: 80), size: 34, color: lightBlue, weight: .semibold, alignment: .center)
    }
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

let writer = try AVAssetWriter(outputURL: output, fileType: .mov)
let settings: [String: Any] = [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: width, AVVideoHeightKey: height, AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 5_000_000, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel]]
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

