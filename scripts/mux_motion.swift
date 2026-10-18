import AVFoundation
import Foundation

let root = URL(fileURLWithPath: "/Users/tesla/Documents/teslinhasuporte-identidadevisual")
let visualURL = root.appendingPathComponent("assets/marketing/.motion-visual.mov")
let voiceURL = root.appendingPathComponent("assets/marketing/.motion-voice.aiff")
let outputURL = root.appendingPathComponent("assets/marketing/2026-10-18_12-26-31_assistencia-tecnica-motion_v01.mov")

let visualAsset = AVURLAsset(url: visualURL)
let voiceAsset = AVURLAsset(url: voiceURL)
let videoTrack = visualAsset.tracks(withMediaType: .video).first!
let audioTrack = voiceAsset.tracks(withMediaType: .audio).first!

let reader = try AVAssetReader(asset: visualAsset)
let videoOutput = AVAssetReaderTrackOutput(track: videoTrack, outputSettings: nil)
reader.add(videoOutput)
let audioReader = try AVAssetReader(asset: voiceAsset)
let audioOutput = AVAssetReaderTrackOutput(track: audioTrack, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM, AVSampleRateKey: 22050, AVNumberOfChannelsKey: 1, AVLinearPCMBitDepthKey: 16, AVLinearPCMIsFloatKey: false, AVLinearPCMIsBigEndianKey: false])
audioReader.add(audioOutput)

let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mov)
let videoInput = AVAssetWriterInput(mediaType: .video, outputSettings: nil)
let audioInput = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 22050, AVNumberOfChannelsKey: 1, AVEncoderBitRateKey: 64000])
writer.add(videoInput)
writer.add(audioInput)
reader.startReading()
audioReader.startReading()
writer.startWriting()
writer.startSession(atSourceTime: .zero)

var videoSample: CMSampleBuffer? = videoOutput.copyNextSampleBuffer()
var audioSample: CMSampleBuffer? = audioOutput.copyNextSampleBuffer()
while videoSample != nil || audioSample != nil {
    let videoTime = videoSample.map { CMSampleBufferGetPresentationTimeStamp($0) }
    let audioTime = audioSample.map { CMSampleBufferGetPresentationTimeStamp($0) }
    let useVideo = audioTime == nil || (videoTime != nil && videoTime! <= audioTime!)
    if useVideo, let sample = videoSample {
        while !videoInput.isReadyForMoreMediaData { usleep(1000) }
        videoInput.append(sample)
        videoSample = videoOutput.copyNextSampleBuffer()
    } else if let sample = audioSample {
        while !audioInput.isReadyForMoreMediaData { usleep(1000) }
        audioInput.append(sample)
        audioSample = audioOutput.copyNextSampleBuffer()
    }
}
videoInput.markAsFinished()
audioInput.markAsFinished()
let semaphore = DispatchSemaphore(value: 0)
writer.finishWriting { semaphore.signal() }
semaphore.wait()
guard writer.status == .completed else {
    fputs("Mux failed: \(writer.error?.localizedDescription ?? "unknown")\n", stderr)
    exit(1)
}
print("final motion written to \(outputURL.path)")
