#!/bin/bash

# PNG to ICNS Converter for Capto
# 사용법: ./png-to-icns.sh <input.png>

set -e

# 입력 파일 확인
if [ -z "$1" ]; then
    echo "❌ 사용법: ./png-to-icns.sh <input.png>"
    echo "예: ./png-to-icns.sh capto-icon.png"
    exit 1
fi

INPUT_PNG="$1"

if [ ! -f "$INPUT_PNG" ]; then
    echo "❌ 파일을 찾을 수 없습니다: $INPUT_PNG"
    exit 1
fi

echo "🎨 Capto 아이콘을 ICNS로 변환합니다..."
echo "📁 입력 파일: $INPUT_PNG"

# sips 명령어 확인 (macOS 기본 제공)
if ! command -v sips &> /dev/null; then
    echo "❌ sips 명령어를 찾을 수 없습니다. macOS에서만 실행 가능합니다."
    exit 1
fi

# iconset 폴더 생성
ICONSET="capto.iconset"
mkdir -p "$ICONSET"

echo "📐 다양한 크기의 PNG 파일들을 생성 중..."

# sips를 사용하여 각 크기별 PNG 생성
sips -z 16 16 "$INPUT_PNG" --out "$ICONSET/icon_16x16.png" > /dev/null
sips -z 32 32 "$INPUT_PNG" --out "$ICONSET/icon_16x16@2x.png" > /dev/null
sips -z 32 32 "$INPUT_PNG" --out "$ICONSET/icon_32x32.png" > /dev/null
sips -z 64 64 "$INPUT_PNG" --out "$ICONSET/icon_32x32@2x.png" > /dev/null
sips -z 128 128 "$INPUT_PNG" --out "$ICONSET/icon_128x128.png" > /dev/null
sips -z 256 256 "$INPUT_PNG" --out "$ICONSET/icon_128x128@2x.png" > /dev/null
sips -z 256 256 "$INPUT_PNG" --out "$ICONSET/icon_256x256.png" > /dev/null
sips -z 512 512 "$INPUT_PNG" --out "$ICONSET/icon_256x256@2x.png" > /dev/null
sips -z 512 512 "$INPUT_PNG" --out "$ICONSET/icon_512x512.png" > /dev/null
sips -z 1024 1024 "$INPUT_PNG" --out "$ICONSET/icon_512x512@2x.png" > /dev/null

echo "✅ PNG 파일 생성 완료 (10개)"

# iconset을 icns로 변환
echo "🔄 ICNS 파일로 변환 중..."
iconutil -c icns "$ICONSET" -o capto.icns

# 정리
rm -rf "$ICONSET"

echo "✨ 완료! capto.icns 파일이 생성되었습니다."
echo "📁 위치: $(pwd)/capto.icns"
echo ""
echo "💡 이제 이 파일을 macOS/Windows 앱에서 사용할 수 있습니다!"
