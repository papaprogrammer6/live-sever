@echo off
setlocal enabledelayedexpansion

set SERVER_DIR=%~dp0
set PID_FILE=%SERVER_DIR%server.pid
set LOG_FILE=%SERVER_DIR%server.log
set DEBUG_LOG=%SERVER_DIR%debug.log

echo %date% %time% - Script started with parameter: %1 >> "%DEBUG_LOG%"

if "%1"=="start" (
    echo %date% %time% - Starting server... >> "%DEBUG_LOG%"
    cd /d "%SERVER_DIR%"
    echo %date% %time% - Changed directory to %SERVER_DIR% >> "%DEBUG_LOG%"
    start /b "" node server.js > "%LOG_FILE%" 2>&1
    echo %date% %time% - Attempted to start Node.js server >> "%DEBUG_LOG%"
    for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo list /v ^| find /i "PID:"') do (
        echo %%i > "%PID_FILE%"
        echo %date% %time% - Server started with PID %%i >> "%DEBUG_LOG%"
        goto :eof
    )
) else if "%1"=="stop" (
    if exist "%PID_FILE%" (
        set /p PID=<"%PID_FILE%"
        echo %date% %time% - Stopping server with PID !PID!... >> "%DEBUG_LOG%"
        taskkill /PID !PID! /F
        if !ERRORLEVEL! equ 0 (
            del "%PID_FILE%"
            echo %date% %time% - Server stopped successfully >> "%DEBUG_LOG%"
        ) else (
            echo %date% %time% - Failed to stop server. It may have already been stopped. >> "%DEBUG_LOG%"
        )
    ) else (
        echo %date% %time% - PID file not found. Server might not be running. >> "%DEBUG_LOG%"
    )
) else (
    echo %date% %time% - Invalid command. Use "start" or "stop". >> "%DEBUG_LOG%"
)

echo %date% %time% - Script ended >> "%DEBUG_LOG%"