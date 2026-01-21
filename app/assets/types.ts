export type Agent = {
  uuid: string
  alias: string
  description: string
  prompt: string
  language: string

  greeting_enabled: boolean
  greeting: string

  phrase_hopelessness_enabled: boolean
  phrase_hopelessness: string

  llm_model_profile_id: number
  embedding_model_id: number
  temperature: number

  // строка с JSON внутри
  settings: string

  asr_profile_id: number
  tts_profile_id: number

  voice_settings: {
    decode_numbers: boolean
    replace_yo: boolean
    speed: number
    pitch: number
    volume: number
    role: string
    stability: number
    similarity_boost: number
    use_speaker_boost: boolean
    style: number
    voice: string
  }

  interruption_enabled: boolean
  interruption_occurrence_count: number
  interruption_window_length_seconds: number

  acknowledgement_enabled: boolean
  acknowledgement_intensity: number

  reminder_enabled: boolean
  reminder_timeout_seconds: number
  reminder_count: number

  max_call_duration_seconds: number
}
