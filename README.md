# News in One Scrapper

A web application that aggregates news headlines from multiple sources including major news outlets and scientific journals.

# 노트
ESM(ECMAScript Module)은 Javascript의 최신 표준 모듈 시스템. import, export로 모듈, 파일 간 코드 분리 가능. CJS(Common JS)와 달리 비동기, 트리셰이킹(최적화), 브라우저 호환성 좋음. 최신 Node.js에선 ESM이 표준.
    - Typescript 4.7이상에서 지원.


AWS 접속방법:
ssh -i NewsAWSServerKey.pem ec2-user@ec2-54-84-105-117.compute-1.amazonaws.com



## Features

- Display news headlines from multiple sources on a single page
- Support for major news outlets (BBC, Al Jazeera)
- Support for Korean news sources (매일경제, 연합뉴스)
- Support for scientific journals (Nature, Science, Cell)
- Customizable website list with add/delete functionality
- Archive and trash functionality for news items
- Automatic periodic updates of news content

## Tech Stack

- Backend: Python with FastAPI
- Frontend: React with TypeScript
- Database: SQLite
- Web Scraping: BeautifulSoup4, requests
- RSS Feed Processing: feedparser

## Setup Instructions

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend server:
```bash
uvicorn app.main:app --reload
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

## Project Structure

```
newsinone/
├── app/                    # Backend application
│   ├── routers/
│   │   ├── news.py	   # News-related endpoints
│   │   └── sources.py	   # Endpoint to manage sources
│   ├── main.py            # FastAPI application
│   ├── models.py          # Database models
│   ├── schemas.py         # Pydantic schemas
│   ├── scrapers/          # Web scrapers
│   │   ├── bbc_scraper.py
│   │   ├── aljazeera_scraper.py
│   │   ├── yonhap_scraper.py
│   │   └── mk_scraper.py
│   └── database.py        # Database configuration
│   
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
│   └── package.json
└── requirements.txt       # Python dependencies
``` 