# Audio Intelligence Studio - Troubleshooting Guide

## 🔍 Upload Issues

### Common Upload Errors and Solutions

#### 1. "Upload failed" Error
**Symptoms**: Generic upload failure message
**Solutions**:
- Check if backend is running: `http://localhost:3001/api/test`
- Verify file format is supported (WAV, MP3, OGG, FLAC, M4A)
- Ensure file size is under 100MB
- Check browser console for detailed error messages

#### 2. CORS Error
**Symptoms**: "Access to fetch at 'http://localhost:3001' from origin 'http://localhost:5173' has been blocked by CORS policy"
**Solutions**:
- Ensure backend CORS is properly configured
- Check that both servers are running on correct ports
- Restart both frontend and backend servers

#### 3. "No audio file provided" Error
**Symptoms**: Backend receives request but no file
**Solutions**:
- Check file input is properly configured
- Verify FormData is correctly created
- Ensure file is actually selected

#### 4. Network Error
**Symptoms**: "Failed to fetch" or connection refused
**Solutions**:
- Check if backend server is running: `netstat -ano | findstr :3001`
- Verify port 3001 is not blocked by firewall
- Restart backend server

## 🚀 Quick Fixes

### 1. Restart Both Servers
```bash
# Kill existing processes
taskkill /F /IM node.exe

# Start backend
cd backend
npm start

# Start frontend (in new terminal)
cd ..
npm run dev
```

### 2. Check Server Status
```bash
# Check if backend is running
curl http://localhost:3001/api/test

# Check if frontend is running
curl http://localhost:5173
```

### 3. Test Upload with Simple HTML
Open `test-upload.html` in your browser to test upload functionality directly.

## 🔧 Configuration Issues

### OpenAI API Key
**Problem**: Processing fails after upload
**Solution**: Set your OpenAI API key in `backend/config.env`:
```
OPENAI_API_KEY=your-actual-api-key-here
```

### File Upload Directory
**Problem**: "ENOENT: no such file or directory" error
**Solution**: Ensure `backend/uploads/` directory exists:
```bash
cd backend
mkdir uploads
```

## 🐛 Debug Steps

### 1. Check Backend Logs
Look for error messages in the backend terminal when uploading.

### 2. Check Browser Console
Open Developer Tools (F12) and check Console tab for error messages.

### 3. Test Backend Directly
```bash
curl -X POST -F "audio=@test-file.wav" http://localhost:3001/api/process
```

### 4. Check File Permissions
Ensure the backend has write permissions to the uploads directory.

## 📋 Common Issues Checklist

- [ ] Backend server running on port 3001
- [ ] Frontend server running on port 5173
- [ ] OpenAI API key configured
- [ ] Uploads directory exists
- [ ] File format is supported
- [ ] File size is under 100MB
- [ ] No firewall blocking ports
- [ ] CORS properly configured

## 🆘 Still Having Issues?

1. **Check the logs**: Look at both frontend and backend console output
2. **Test with simple file**: Try uploading a small WAV file first
3. **Use test page**: Open `test-upload.html` to isolate the issue
4. **Check network**: Ensure no proxy or VPN is interfering
5. **Restart everything**: Kill all Node.js processes and restart

## 📞 Getting Help

If you're still experiencing issues:
1. Check the browser console for error messages
2. Check the backend terminal for error logs
3. Try the test upload page
4. Restart both servers
5. Check this troubleshooting guide again

**Remember**: Most upload issues are related to server connectivity or configuration. The step-by-step debugging above should resolve most problems. 