import AVFoundation
import Foundation

let url = URL(fileURLWithPath: CommandLine.arguments[1])
let asset = AVURLAsset(url: url)
let video = asset.tracks(withMediaType: .video).first!
let size = video.naturalSize.applying(video.preferredTransform)
let width = Int(abs(size.width.rounded()))
let height = Int(abs(size.height.rounded()))
let duration = asset.duration.seconds
let hasAudio = !asset.tracks(withMediaType: .audio).isEmpty

precondition(width == 1080 && height == 1920, "expected 1080x1920, got \(width)x\(height)")
precondition(duration >= 7.9 && duration <= 8.1, "expected ~8 seconds, got \(duration)")
precondition(hasAudio, "expected a narration audio track")
print("motion artifact valid: \(width)x\(height), \(duration)s, audio=yes")
