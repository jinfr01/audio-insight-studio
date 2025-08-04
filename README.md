# Audio Intelligence Studio

A comprehensive audio processing system that transforms spoken audio into structured, multilingual textual insights. This system performs speaker identification, diarization, language detection, automatic speech recognition, and neural machine translation.

## 🎯 Features

### Core Capabilities
- **Speaker Identification**: Match each speaker segment to a known identity when enrollment data is available
- **Speaker Diarization**: Segment audio by identifying boundaries between different speakers
- **Language Identification**: Detect the language spoken in each segment, supporting multilingual and code-switched audio
- **Automatic Speech Recognition**: Convert each speaker's speech into accurate text in the spoken script
- **Neural Machine Translation**: Translate the transcribed text into English, preserving speaker-level segmentation

### Technical Specifications
- **Sample Rate Support**: 8kHz - 48kHz
- **Bit Depth**: 4 - 32 bits
- **File Formats**: WAV, MP3, OGG, FLAC, M4A
- **SNR Range**: -5 to 20 dB
- **Real-time Processing**: WebSocket-based progress updates
- **Modern UI**: Built with React, TypeScript, and shadcn/ui

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- FFmpeg (for audio processing)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd audio-insight-studio-main
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   # In backend/config.env
   OPENAI_API_KEY=your-openai-api-key-here
   PORT=3001
   NODE_ENV=development
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1 - Start backend
   cd backend
   npm start
   
   # Terminal 2 - Start frontend
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
audio-insight-studio-main/
├── src/
│   ├── components/
│   │   ├── audio-intelligence/
│   │   │   ├── AudioIntelligenceSystem.tsx    # Main application component
│   │   │   ├── UploadPanel.tsx                # File upload interface
│   │   │   ├── TranscriptPanel.tsx            # Transcription display
│   │   │   ├── TranslationPanel.tsx           # Translation display
│   │   │   ├── PlaybackControls.tsx           # Audio playback controls
│   │   │   ├── ProcessingTimeline.tsx         # Processing progress
│   │   │   ├── SettingsSidebar.tsx            # Configuration panel
│   │   │   └── StatusIndicators.tsx           # Processing status
│   │   └── ui/                                # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx                          # Main page
│   │   └── NotFound.tsx                       # 404 page
│   └── lib/                                   # Utility functions
├── backend/
│   ├── index.js                               # Express server
│   ├── package.json                           # Backend dependencies
│   └── uploads/                               # Uploaded audio files
├── public/                                    # Static assets
└── package.json                               # Frontend dependencies
```

## 🔧 Configuration

### Backend Configuration
The backend can be configured through environment variables:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Server Configuration
PORT=3001
NODE_ENV=development

# Audio Processing Configuration
MAX_FILE_SIZE=104857600
SUPPORTED_FORMATS=wav,mp3,ogg,flac,m4a

# Processing Settings
AUDIO_SAMPLE_RATE=16000
AUDIO_CHANNELS=1
AUDIO_BIT_DEPTH=16
```

### Frontend Configuration
The frontend uses Vite for development and building. Key configuration files:
- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 🎵 Usage

### Uploading Audio
1. Drag and drop an audio file onto the upload area or click to browse
2. Supported formats: WAV, MP3, OGG, FLAC, M4A
3. Maximum file size: 100MB

### Processing Pipeline
The system automatically processes uploaded audio through these stages:

1. **File Upload** - Validates and stores the audio file
2. **Speaker Identification** - Identifies and maps speakers
3. **Speaker Diarization** - Segments audio by speaker boundaries
4. **Language Identification** - Detects languages in each segment
5. **Speech Recognition** - Converts speech to text
6. **Translation** - Translates text to English

### Viewing Results
- **Transcript Panel**: View the original transcription with speaker labels
- **Translation Panel**: View English translations with confidence scores
- **Playback Controls**: Navigate through the audio timeline
- **Settings**: Configure processing parameters

## 🔌 API Endpoints

### POST `/api/process`
Upload and process an audio file
```bash
curl -X POST -F "audio=@file.wav" http://localhost:3001/api/process
```

### GET `/api/status/:sessionId`
Get processing status for a session
```bash
curl http://localhost:3001/api/status/session-id
```

### GET `/api/results/:sessionId`
Get processing results for a completed session
```bash
curl http://localhost:3001/api/results/session-id
```

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
npm run dev  # Start Vite dev server
npm run build  # Build for production
npm run preview  # Preview production build
```

### Adding New Features
1. **Backend**: Add new processing methods to the `AudioProcessor` class
2. **Frontend**: Create new components in `src/components/audio-intelligence/`
3. **API**: Add new endpoints in `backend/index.js`

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
npm run test
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend
npm run build

# Start backend in production
cd backend
NODE_ENV=production npm start
```

### Docker Deployment
```dockerfile
# Example Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- OpenAI for Whisper and GPT models
- shadcn/ui for the beautiful component library
- FFmpeg for audio processing capabilities
- The open-source community for various tools and libraries

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Built with ❤️ for audio intelligence and multilingual communication**
