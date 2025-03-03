# Texter

## Overview
Texter is an AI-powered automation tool designed to enhance text processing capabilities. It provides features like text summarization, sentiment analysis, and text refinement, making it an essential tool for users who need quick and accurate text insights.

### Problem Statement
In the digital era, managing large amounts of textual data efficiently is a challenge. Users often struggle with extracting key information, understanding sentiment, and refining text for better readability. Texter aims to solve this problem by leveraging AI to automate text processing and provide valuable insights instantly.

## Features
- **Text Summarizer**: Condenses lengthy text into concise summaries, making it easier to grasp key points.
- **Sentiment Analyzer**: Determines the sentiment (positive, negative, or neutral) of a given text to provide an emotional analysis.
- **Text Refiner**: Enhances text quality by improving readability, coherence, and structure.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: FastAPI (Python)
- **AI Integration**: Gemini API for text processing
- **Authentication**: Firebase for user authentication

## How It Works
1. The user inputs a paragraph or any text into the web interface.
2. The backend, built using FastAPI, processes the request and interacts with the Gemini API to generate responses.
3. The AI-generated output is then displayed to the user on the frontend.
4. Firebase is used to authenticate users and secure access to the platform.

## Installation & Setup
### Prerequisites
- Python 3.8+
- FASTAPI
- Firebase account for authentication setup

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/anuptiwari17/flashhack.git
   cd flashhack
   ```
2. Install backend dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```
4. Set up Firebase authentication as per the documentation.
5. Open the frontend in a browser and start using Texter.

## Usage Guide
1. Navigate to the web interface.
2. Log in using Firebase authentication.
3. Enter a paragraph or any text input.
4. Choose an operation:
   - **Summarization**: Get a concise summary.
   - **Sentiment Analysis**: Determine the sentiment of the text.
   - **Refinement**: Improve text quality and readability.
5. View the AI-generated results instantly.

## Screenshots
Here are some screenshots of the project:

![Screenshot 1](image1.png)
![Screenshot 2](image2.png)
![Screenshot 3](image3.png)


## Repository
Find the source code on GitHub: [Texter GitHub Repository](https://github.com/anuptiwari17/flashhack)

## License
This project is licensed under the MIT License.

Feel free to contribute and enhance Texter!

