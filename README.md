# ASCII GIF Converter

A web application that converts GIF animations into ASCII art. Watch your favorite GIFs transform into text-based animations that preserve the motion and character of the original.

## Features

- **GIF to ASCII Conversion**: Upload any GIF and convert it to ASCII art in real-time
- **Customizable Settings**:
  - Adjust width and height of the ASCII output
  - Change font size for better viewing
  - Control playback speed (FPS)
  - Invert colors
  - Customize the ASCII character set
- **Live Preview**: Watch your ASCII animation as it plays
- **Community Gallery**: Share your creations with others and browse the community's submissions
- **Code Snippet**: Get the code to embed your ASCII art in other projects

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation Processing**: gifuct-js for GIF parsing and frame extraction
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components with Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ascii-gif-converter.git
   cd ascii-gif-converter
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with necessary configurations.

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How It Works

1. Upload a GIF file using the file input
2. The application processes each frame of the GIF using the `gifuct-js` library
3. Each frame is rendered to a canvas and converted to ASCII characters
4. The brightness of each pixel determines which ASCII character is used
5. The frames are displayed in sequence to create an animated ASCII art

## Customization

- **ASCII Character Set**: Change the characters used for rendering (default: ` .:\`'\",;><)(}{[]_|\\/-^~=?+*%$#`)
- **Dimensions**: Adjust width and height sliders to change resolution
- **Font Size**: Use the slider to make the ASCII art larger or smaller
- **Playback Speed**: Control the frames per second (FPS)
- **Color Inversion**: Toggle between light characters on dark background or vice versa

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 