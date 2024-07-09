//HelpDocs.js

import React, { useState } from 'react';
import styles from './HelpDocs.module.css';

export default function HelpDocs() {
  const [currentSection, setCurrentSection] = useState('github');

  return (
    <div className={styles.helpContainer}>
      <header className={styles.header}>
        <h1>도움말</h1>
      </header>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <button onClick={() => setCurrentSection('github')}>깃허브 사용법</button>
          <button onClick={() => setCurrentSection('homepage')}>홈페이지 사용법</button>
        </nav>
        <div className={styles.mainContent}>
          {currentSection === 'github' && (
            <section>
              <h2>Git과 GitHub의 차이</h2>
              <div className={styles.contentItem}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <p><strong>Git</strong>은 분산 버전 관리 시스템으로, 로컬 저장소에서 작업하고 변경 사항을 추적할 수 있습니다.</p>
              </div>
              <div className={styles.contentItem}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <p><strong>GitHub</strong>는 Git 저장소를 호스팅하는 클라우드 기반 플랫폼으로, 원격 저장소에 저장하고 다른 개발자들과 협업할 수 있습니다.</p>
              </div>
              <div className={styles.contentItem}>
                <h4>Git과 GitHub의 차이</h4>
                <p><strong>Git</strong>:</p>
                <ul>
                  <li><strong>분산 버전 관리 시스템</strong>: Git은 소스 코드를 관리하고 변경 사항을 추적할 수 있는 분산 버전 관리 시스템입니다. 로컬 저장소에서 작업을 하고 변경 사항을 커밋(commit)하며, 필요할 때 원격 저장소에 푸시(push)하여 동기화할 수 있습니다.</li>
                  <li><strong>오프라인 작업 가능</strong>: Git은 로컬 저장소에서 오프라인으로 작업할 수 있으며, 인터넷에 연결되었을 때 원격 저장소와 동기화할 수 있습니다.</li>
                </ul>
                <p><strong>GitHub</strong>:</p>
                <ul>
                  <li><strong>Git 저장소 호스팅 서비스</strong>: GitHub는 Git 저장소를 호스팅하는 클라우드 기반 플랫폼으로, 개발자들이 프로젝트를 관리하고 협업할 수 있는 도구와 기능을 제공합니다.</li>
                  <li><strong>협업 및 코드 공유</strong>: GitHub는 여러 개발자들이 동시에 프로젝트에 기여할 수 있도록 협업 도구를 제공하며, 코드 리뷰, 이슈 추적, 프로젝트 관리 등을 지원합니다.</li>
                </ul>
                <h4>커밋, 풀, 푸시 개념 설명</h4>
                <p><strong>커밋(Commit)</strong>:</p>
                <ul>
                  <li><strong>정의</strong>: 커밋은 변경 사항을 로컬 저장소에 저장하는 작업으로, 각 커밋은 고유한 ID를 가지며, 변경 이력을 기록합니다.</li>
                  <li><strong>역할</strong>: 커밋은 변경 이력을 기록하고, 필요할 때 특정 시점으로 돌아갈 수 있도록 해줍니다.</li>
                </ul>
                <p><strong>풀(Pull)</strong>:</p>
                <ul>
                  <li><strong>정의</strong>: 풀은 원격 저장소의 변경 사항을 로컬 저장소로 가져오는 작업입니다. 풀은 `git fetch`와 `git merge`를 합친 작업으로, 원격 저장소의 최신 상태를 로컬 저장소에 반영합니다.</li>
                  <li><strong>역할</strong>: 풀은 팀원들이 작업한 최신 변경 사항을 로컬에서 반영하여, 협업 중인 코드의 최신 상태를 유지할 수 있도록 해줍니다.</li>
                </ul>
                <p><strong>푸시(Push)</strong>:</p>
                <ul>
                  <li><strong>정의</strong>: 푸시는 로컬 저장소의 변경 사항을 원격 저장소에 업로드하는 작업입니다. 푸시를 통해 로컬에서 작업한 내용을 다른 팀원들과 공유할 수 있습니다.</li>
                  <li><strong>역할</strong>: 푸시는 로컬에서 작업한 변경 사항을 원격 저장소에 반영하여, 팀원들이 최신 변경 사항을 사용할 수 있도록 합니다.</li>
                </ul>
                <h4>GitHub 레포지토리 생성 및 VS Code 연동</h4>
                <p><strong>1단계: GitHub 레포지토리 생성</strong></p>
                <ol>
                  <li>GitHub에 로그인합니다.</li>
                  <li>오른쪽 상단의 **+** 아이콘을 클릭하고 **New repository**를 선택합니다.</li>
                  <li>레포지토리 이름을 입력하고, **Create repository** 버튼을 클릭합니다.</li>
                </ol>
                <p><strong>2단계: VS Code 설치 및 Git 설치</strong></p>
                <ol>
                  <li>[VS Code 다운로드 페이지](https://code.visualstudio.com/)에서 VS Code를 다운로드하여 설치합니다.</li>
                  <li>[Git 다운로드 페이지](https://git-scm.com/)에서 Git을 다운로드하여 설치합니다.</li>
                </ol>
                <p><strong>3단계: VS Code와 GitHub 연동</strong></p>
                <ol>
                  <li>VS Code를 엽니다.</li>
                  <li>View >>> Terminal**을 클릭하여 터미널을 엽니다.</li>
                  <li>아래 명령어를 사용하여 GitHub 레포지토리를 클론(clone)합니다.</li>
                </ol>
                <pre>
                  <code>
                    git clone https://github.com/사용자명/레포지토리명.git
                  </code>
                </pre>
                <ol start="4">
                  <li>클론한 레포지토리 디렉토리로 이동합니다.</li>
                </ol>
                <pre>
                  <code>
                    cd 레포지토리명
                  </code>
                </pre>
                <p><strong>4단계: 변경 사항 커밋 및 푸시</strong></p>
                <ol>
                  <li>VS Code에서 파일을 수정하거나 새 파일을 추가합니다.</li>
                  <li>터미널에서 아래 명령어를 사용하여 변경 사항을 스테이징(staging)합니다.</li>
                </ol>
                <pre>
                  <code>
                    git add .
                  </code>
                </pre>
                <ol start="3">
                  <li>변경 사항을 커밋합니다.</li>
                </ol>
                <pre>
                  <code>
                    git commit -m "커밋 메시지"
                  </code>
                </pre>
                <ol start="4">
                  <li>변경 사항을 원격 저장소에 푸시합니다.</li>
                </ol>
                <pre>
                  <code>
                    git push origin main
                  </code>
                </pre>
                <h4>필요한 명령어 설명</h4>
                <ul>
                  <li><strong>git clone [URL]</strong>: 원격 저장소를 로컬 컴퓨터에 복제합니다.</li>
                </ul>
                <pre>
                  <code>
                    git clone https://github.com/사용자명/레포지토리명.git
                  </code>
                </pre>
                <ul>
                  <li><strong>cd [디렉토리명]</strong>: 지정한 디렉토리로 이동합니다.</li>
                </ul>
                <pre>
                  <code>
                    cd 레포지토리명
                  </code>
                </pre>
                <ul>
                  <li><strong>git add [파일명 또는 .]</strong>: 파일을 스테이징 영역에 추가하여 커밋 준비를 합니다. '.'은 모든 변경 파일을 추가합니다.</li>
                </ul>
                <pre>
                  <code>
                    git add .
                  </code>
                </pre>
                <ul>
                  <li><strong>git commit -m "메시지"</strong>: 스테이징된 변경 사항을 로컬 저장소에 커밋합니다. "메시지"는 변경 사항에 대한 설명입니다.</li>
                </ul>
                <pre>
                  <code>
                    git commit -m "커밋 메시지"
                  </code>
                </pre>
                <ul>
                  <li><strong>git pull origin [브랜치명]</strong>: 원격 저장소의 변경 사항을 로컬 저장소에 가져옵니다. 일반적으로 'main' 또는 'master' 브랜치를 사용합니다.</li>
                </ul>
                <pre>
                  <code>
                    git pull origin main
                  </code>
                </pre>
                <ul>
                  <li><strong>git push origin [브랜치명]</strong>: 로컬 저장소의 변경 사항을 원격 저장소에 푸시합니다. 일반적으로 'main' 또는 'master' 브랜치를 사용합니다.</li>
                </ul>
                <pre>
                  <code>
                    git push origin main
                  </code>
                </pre>
                <p>이 스크립트를 사용하여 초보자들이 Git과 GitHub의 차이를 이해하고, GitHub 레포지토리를 생성하고 VS Code와 연동하여 커밋하고 푸시하는 과정을 쉽게 따라할 수 있습니다. 필요한 명령어들에 대한 설명도 포함되어 있어, 단계별로 따라하기에 용이합니다.</p>
              </div>
            </section>
          )}
          {currentSection === 'homepage' && (
            <section>
              <h2>홈페이지 사용법</h2>
              <p>여기에 홈페이지 사용법에 대한 설명을 추가하세요.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
