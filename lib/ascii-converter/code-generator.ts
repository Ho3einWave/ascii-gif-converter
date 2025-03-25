export function getCodeSnippet(
    frames: string[],
    language: string,
    fps: number
): string {
    if (frames.length === 0) return "";

    const framesEscaped = frames.map((frame) =>
        frame
            .replaceAll(/\\/g, "\\\\")
            .replaceAll(/"/g, '\\"')
            .replaceAll(/'/g, "\\'")
    );

    switch (language) {
        case "javascript":
            return generateJavaScriptCode(framesEscaped, fps);
        case "python":
            return generatePythonCode(framesEscaped, fps);
        case "csharp":
            return generateCSharpCode(framesEscaped, fps);
        case "java":
            return generateJavaCode(framesEscaped, fps);
        case "go":
            return generateGoCode(framesEscaped, fps);
        case "rust":
            return generateRustCode(framesEscaped, fps);
        default:
            return "";
    }
}

function generateJavaScriptCode(frames: string[], fps: number): string {
    return `// JavaScript ASCII Frame
const frames = [
${frames.map((frame) => `\n\`${frame}\`,`).join("\n")}
];

// To display in browser
document.getElementById('ascii-container').innerHTML = \`<pre>\${frame}</pre>\`;

// Animation setup (${fps} FPS)
let currentFrame = 0;
setInterval(() => {
  document.getElementById('ascii-container').innerHTML = \`<pre>\${frames[currentFrame]}</pre>\`;
  currentFrame = (currentFrame + 1) % frames.length;
}, ${Math.round(1000 / fps)});`;
}

function generatePythonCode(frames: string[], fps: number): string {
    return `# Python ASCII Frame
frames = [
${frames.map((frame) => `\n"""${frame}""",`).join("\n")}
]

# Print to console
print(frames[0])

# Animation setup (${fps} FPS)
import time
import os

current_frame = 0
while True:
    os.system('clear' if os.name == 'posix' else 'cls')
    print(frames[current_frame])
    current_frame = (current_frame + 1) % len(frames)
    time.sleep(${(1 / fps).toFixed(3)})`;
}

function generateCSharpCode(frames: string[], fps: number): string {
    return `// C# ASCII Frame
var frames = new List<string> {
${frames.map((frame) => `\n    @"${frame}",`).join("\n")}
};

// Print to console
Console.WriteLine(frames[0]);

// Animation setup (${fps} FPS)
int currentFrame = 0;

while (true)
{
    Console.Clear();
    Console.WriteLine(frames[currentFrame]);
    currentFrame = (currentFrame + 1) % frames.Count;
    Thread.Sleep(${Math.round(1000 / fps)});
}`;
}

function generateJavaCode(frames: string[], fps: number): string {
    return `// Java ASCII Frame
List<String> frames = Arrays.asList(
${frames.map((frame) => `\n    "${frame}",`).join("\n")}
);

// Print to console
System.out.println(frames.get(0));

// Animation setup (${fps} FPS)
int currentFrame = 0;

while (true) {
    System.out.print("\\033[H\\033[2J");
    System.out.flush();
    System.out.println(frames.get(currentFrame));
    currentFrame = (currentFrame + 1) % frames.size();
    Thread.sleep(${Math.round(1000 / fps)});
}`;
}

function generateGoCode(frames: string[], fps: number): string {
    return `// Go ASCII Frame
package main

import (
	"fmt"
	"time"
	"os"
	"os/exec"
	"runtime"
)

func main() {
	frames := []string{
${frames.map((frame) => `\n		\`${frame}\`,`).join("\n")}
	}

	// Print to console
	fmt.Println(frames[0])

	// Animation setup (${fps} FPS)
	currentFrame := 0
	
	for {
		// Clear screen based on OS
		clearScreen()
		
		// Print current frame
		fmt.Println(frames[currentFrame])
		
		// Move to next frame
		currentFrame = (currentFrame + 1) % len(frames)
		
		// Wait based on FPS
		time.Sleep(${Math.round(1000 / fps)} * time.Millisecond)
	}
}

func clearScreen() {
	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		cmd = exec.Command("cmd", "/c", "cls")
	} else {
		cmd = exec.Command("clear")
	}
	cmd.Stdout = os.Stdout
	cmd.Run()
}`;
}

function generateRustCode(frames: string[], fps: number): string {
    return `// Rust ASCII Frame
use std::{thread, time::Duration};

fn main() {
    let frames = vec![
${frames.map((frame) => `\n        r#"${frame}"#,`).join("\n")}
    ];

    // Print to console
    println!("{}", frames[0]);

    // Animation setup (${fps} FPS)
    let mut current_frame = 0;
    
    loop {
        // Clear screen
        print!("\\x1B[2J\\x1B[1;1H");
        
        // Print current frame
        println!("{}", frames[current_frame]);
        
        // Move to next frame
        current_frame = (current_frame + 1) % frames.len();
        
        // Wait based on FPS
        thread::sleep(Duration::from_millis(${Math.round(1000 / fps)}));
    }
}`;
}
