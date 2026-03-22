#!/bin/bash

# Capto SVG to ICNS Converter Script
# 사용법: ./create-icns.sh

set -e

echo "🎨 Capto 아이콘을 ICNS로 변환합니다..."

# 1. iconset 폴더 생성
ICONSET="capto.iconset"
mkdir -p "$ICONSET"

# 2. SVG를 다양한 크기의 PNG로 변환 (librsvg 또는 ImageMagick 필요)
# brew install librsvg 또는 brew install imagemagick 필요

SVG_FILE="public/images/capto-icon.svg"

if ! command -v rsvg-convert &> /dev/null; then
    echo "❌ rsvg-convert가 설치되어 있지 않습니다."
    echo "다음 명령어로 설치하세요:"
    echo "brew install librsvg"
    exit 1
fi

echo "📐 PNG 파일들을 생성 중..."

# 각 크기별 PNG 생성
rsvg-convert -w 16 -h 16 "$SVG_FILE" > "$ICONSET/icon_16x16.png"
rsvg-convert -w 32 -h 32 "$SVG_FILE" > "$ICONSET/icon_16x16@2x.png"
rsvg-convert -w 32 -h 32 "$SVG_FILE" > "$ICONSET/icon_32x32.png"
rsvg-convert -w 64 -h 64 "$SVG_FILE" > "$ICONSET/icon_32x32@2x.png"
rsvg-convert -w 128 -h 128 "$SVG_FILE" > "$ICONSET/icon_128x128.png"
rsvg-convert -w 256 -h 256 "$SVG_FILE" > "$ICONSET/icon_128x128@2x.png"
rsvg-convert -w 256 -h 256 "$SVG_FILE" > "$ICONSET/icon_256x256.png"
rsvg-convert -w 512 -h 512 "$SVG_FILE" > "$ICONSET/icon_256x256@2x.png"
rsvg-convert -w 512 -h 512 "$SVG_FILE" > "$ICONSET/icon_512x512.png"
rsvg-convert -w 1024 -h 1024 "$SVG_FILE" > "$ICONSET/icon_512x512@2x.png"

echo "✅ PNG 파일 생성 완료"

# 3. iconset을 icns로 변환
echo "🔄 ICNS 파일로 변환 중..."
iconutil -c icns "$ICONSET" -o capto.icns

# 4. 정리
rm -rf "$ICONSET"

echo "✨ 완료! capto.icns 파일이 생성되었습니다."
echo "📁 위치: $(pwd)/capto.icns"
