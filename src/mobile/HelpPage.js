import React, { useState } from "react";
import styles from "./HelpPage.module.css";

export default function HelpPage() {
  const [currentSection, setCurrentSection] = useState("github");

  return (
    <div className={styles.helpContainer}>
      <header className={styles.header}>
        <h1>도움말</h1>
      </header>
      <div className={styles.container}>
        <div className={styles.ToggleContainer}>
          <div
            className={`${styles.ToggleButton} ${
              currentSection === "github" ? styles.active : ""
            }`}
            onClick={() => setCurrentSection("github")}
          >
            깃허브 사용법
          </div>
          <div
            className={`${styles.ToggleButton} ${
              currentSection === "homepage" ? styles.active : ""
            }`}
            onClick={() => setCurrentSection("homepage")}
          >
            홈페이지 사용법
          </div>
        </div>
        <div className={styles.mainContent}>
          {currentSection === "github" && (
            <section>
              <h2>Git과 GitHub의 차이</h2>

              <div className={`${styles.contentItem} ${styles.sectionContent}`}>
                <div className={styles.GitHubContent}>
                  <div className={styles.GitHubHeader}>
                  <p>
                    <strong>GitHub</strong>:
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>

                  </div>
                  <ul>
                    <li>
                      <strong>Git 저장소 호스팅 서비스</strong>: GitHub는 Git
                      저장소를 호스팅하는 클라우드 기반 플랫폼으로, 개발자들이
                      프로젝트를 관리하고 협업할 수 있는 도구와 기능을
                      제공합니다.<br /><br />
                    </li>
                    <li>
                      <strong>협업 및 코드 공유</strong>: GitHub는 여러
                      개발자들이 동시에 프로젝트에 기여할 수 있도록 협업 도구를
                      제공하며, 코드 리뷰, 이슈 추적, 프로젝트 관리 등을
                      지원합니다.
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`${styles.contentItem} ${styles.sectionContent}`}>
                <div className={styles.GitContent}>
                  <div className={styles.GitHubHeader}>
                    <p>
                      <strong>Git</strong>:
                    </p>
                    <svg
                      width="150"
                      height="70"
                      viewBox="0 0 256 108"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMinYMin meet"
                    >
                      <path
                        d="M152.984 37.214c-5.597 0-9.765 2.748-9.765 9.362 0 4.983 2.747 8.443 9.463 8.443 5.693 0 9.56-3.355 9.56-8.65 0-6-3.46-9.155-9.258-9.155zm-11.19 46.701c-1.325 1.625-2.645 3.353-2.645 5.39 0 4.067 5.186 5.291 12.31 5.291 5.9 0 13.938-.414 13.938-5.9 0-3.261-3.867-3.462-8.753-3.768l-14.85-1.013zm30.113-46.394c1.828 2.34 3.764 5.597 3.764 10.276 0 11.292-8.851 17.904-21.667 17.904-3.259 0-6.209-.406-8.038-.914l-3.359 5.39 9.969.61c17.602 1.122 27.975 1.632 27.975 15.157 0 11.702-10.272 18.311-27.975 18.311-18.413 0-25.433-4.68-25.433-12.716 0-4.578 2.035-7.015 5.596-10.378-3.358-1.419-4.476-3.961-4.476-6.71 0-2.24 1.118-4.273 2.952-6.208 1.83-1.93 3.864-3.865 6.306-6.103-4.984-2.442-8.75-7.732-8.75-15.262 0-11.697 7.733-19.731 23.295-19.731 4.376 0 7.022.402 9.362 1.017h19.84v8.644l-9.361.713zM199.166 19.034c-5.8 0-9.157-3.36-9.157-9.161 0-5.793 3.356-8.95 9.157-8.95 5.9 0 9.258 3.157 9.258 8.95 0 5.801-3.357 9.161-9.258 9.161zM186.04 80.171v-8.033l5.19-.71c1.425-.205 1.627-.509 1.627-2.038V39.48c0-1.116-.304-1.832-1.325-2.134l-5.492-1.935 1.118-8.238h21.061V69.39c0 1.63.098 1.833 1.629 2.039l5.188.71v8.032H186.04zM255.267 76.227c-4.376 2.135-10.785 4.068-16.586 4.068-12.106 0-16.682-4.878-16.682-16.38V37.264c0-.61 0-1.017-.817-1.017h-7.12V27.19c8.955-1.02 12.513-5.496 13.632-16.585h9.666v14.45c0 .71 0 1.017.815 1.017h14.343v10.173H237.36v24.313c0 6.002 1.426 8.34 6.917 8.34 2.852 0 5.799-.71 8.24-1.626l2.75 8.954"
                        fill="#2F2707"
                      />
                      <path
                        d="M104.529 49.53L58.013 3.017a6.86 6.86 0 0 0-9.703 0l-9.659 9.66 12.253 12.252a8.145 8.145 0 0 1 8.383 1.953 8.157 8.157 0 0 1 1.936 8.434L73.03 47.125c2.857-.984 6.154-.347 8.435 1.938a8.161 8.161 0 0 1 0 11.545 8.164 8.164 0 0 1-13.324-8.88L57.129 40.716l-.001 28.98a8.248 8.248 0 0 1 2.159 1.544 8.164 8.164 0 0 1 0 11.547c-3.19 3.19-8.36 3.19-11.545 0a8.164 8.164 0 0 1 2.672-13.328v-29.25a8.064 8.064 0 0 1-2.672-1.782c-2.416-2.413-2.997-5.958-1.759-8.925l-12.078-12.08L2.011 49.314a6.863 6.863 0 0 0 0 9.706l46.516 46.514a6.862 6.862 0 0 0 9.703 0l46.299-46.297a6.866 6.866 0 0 0 0-9.707"
                        fill="#DE4C36"
                      />
                    </svg>
                  </div>

                  <ul>
                  <li>
                <strong>분산 버전 관리 시스템</strong>: Git는 분산 버전 관리 시스템으로, 코드 변경 사항을 기록하고 추적하며, 여러 버전의 소스를 관리할 수 있습니다.<br /><br />
              </li>
              <li>
                <strong>효율적인 협업</strong>: Git는 브랜치, 병합, 리베이스와 같은 기능을 통해 여러 개발자들이 효율적으로 협업할 수 있도록 지원합니다.<br /> 각 개발자는 독립적으로 작업한 후, 변경 사항을 중앙 저장소에 병합할 수 있습니다.
              </li>
                  </ul>
                </div>
              </div>
              <div className={styles.sectionSeparator}></div>
              <div className={`${styles.contentItem} ${styles.sectionContent}`}>
                <div className={styles.GitHelpContent}>
                  <h4>커밋, 풀, 푸시 개념 설명</h4>
                  <p>
                    <strong>커밋(Commit)</strong>:
                  </p>
                  <ul>
                    <li>
                      <strong>정의</strong>: 커밋은 변경 사항을 로컬 저장소에
                      저장하는 작업으로, 각 커밋은 고유한 식별자(해시)를 가지며,
                      이력 관리와 버전 관리를 가능하게 합니다.
                    </li>
                    <li>
                      <strong>사용</strong>: Git에서 파일이나 폴더의 변경 사항을
                      커밋하여, 로컬 저장소의 버전을 관리할 수 있습니다.
                    </li>
                  </ul>
                  <p>
                    <strong>풀(Pull)</strong>:
                  </p>
                  <ul>
                    <li>
                      <strong>정의</strong>: 풀은 원격 저장소의 최신 변경 사항을
                      로컬 저장소로 가져오는 작업입니다. 다른 개발자가 원격
                      저장소에 푸시한 변경 사항을 내려받아 로컬 저장소와
                      동기화할 수 있습니다.
                    </li>
                    <li>
                      <strong>사용</strong>: Git에서 다른 개발자의 변경 사항을
                      풀하여, 원격 저장소의 최신 버전을 로컬 저장소에 반영할 수
                      있습니다.
                    </li>
                  </ul>
                  <p>
                    <strong>푸시(Push)</strong>:
                  </p>
                  <ul>
                    <li>
                      <strong>정의</strong>: 푸시는 로컬 저장소의 변경 사항을
                      원격 저장소로 전송하는 작업입니다. 변경된 파일이나 폴더를
                      원격 저장소에 업로드하여 다른 개발자와 공유하거나 백업할
                      수 있습니다.
                    </li>
                    <li>
                      <strong>사용</strong>: Git에서 로컬 저장소의 변경 사항을
                      푸시하여, 원격 저장소에 업데이트할 수 있습니다.
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.sectionSeparator}></div>

              <div className={`${styles.contentItem} ${styles.sectionContent}`}>
              
              <div className={styles.GitHelp}>
                <h4>GitHub Repository 생성 및 VS Code 연동</h4>
                <p>
                  <strong>1단계: GitHub Repository 생성</strong>
                </p>
                <ol>
                  <li>GitHub에 로그인합니다.</li>
                  <li>
                    오른쪽 상단의 **+** 아이콘을 클릭하고 **New repository**를
                    선택합니다.
                  </li>
                  <li>
                    Repository 이름을 입력하고, **Create repository** 버튼을
                    클릭합니다.
                  </li>
                </ol>
                <p>
                  <strong>2단계: VS Code 설치 및 Git 설치</strong>
                </p>
                <ol>
                  <li>
                      VS Code 다운로드 페이지에서 VS Code를 다운로드하여 설치합니다.
                  </li>
                  <li>
                      Git 다운로드 페이지에서 Git을 다운로드하여 설치합니다.
                  </li>
                </ol>
                <p>
                  <strong>3단계: VS Code와 GitHub 연동</strong>
                </p>
                <ol>
                  <li>VS Code를 엽니다.</li>
                  <li>**View &gt; Terminal**을 클릭하여 터미널을 엽니다.</li>
                  <li>
                    아래 명령어를 사용하여 GitHub Repository를
                    클론(clone)합니다.
                  </li>
                </ol>
                <pre>
                  <code>
                    git clone https://github.com/사용자명/Repository명.git
                  </code>
                </pre>
                <ol start="4">
                  <li>클론한 Repository 디렉토리로 이동합니다.</li>
                </ol>
                <pre>
                  <code>cd Repository명</code>
                </pre>
                <p>
                  <strong>4단계: 변경 사항 커밋 및 푸시</strong>
                </p>
                <ol>
                  <li>VS Code에서 파일을 수정하거나 새 파일을 추가합니다.</li>
                  <li>
                    터미널에서 아래 명령어를 사용하여 변경 사항을
                    스테이징(staging)합니다.
                  </li>
                </ol>
                <pre>
                  <code>git add .</code>
                </pre>
                <ol start="3">
                  <li>변경 사항을 커밋합니다.</li>
                </ol>
                <pre>
                  <code>git commit -m "커밋 메시지"</code>
                </pre>
                <ol start="4">
                  <li>변경 사항을 원격 저장소에 푸시합니다.</li>
                </ol>
                <pre>
                  <code>git push origin main</code>
                </pre>
                <h4>필요한 명령어 설명</h4>
                <ul>
                  <li>
                    <strong>git clone [URL]</strong>: 원격 저장소를 로컬
                    컴퓨터에 복제합니다.
                  </li>
                </ul>
                <pre>
                  <code>
                    git clone https://github.com/사용자명/Repository명.git
                  </code>
                </pre>
                <ul>
                  <li>
                    <strong>cd [디렉토리명]</strong>: 지정한 디렉토리로
                    이동합니다.
                  </li>
                </ul>
                <pre>
                  <code>cd Repository명</code>
                </pre>
                <ul>
                  <li>
                    <strong>git add [파일명 또는 .]</strong>: 파일을 스테이징
                    영역에 추가하여 커밋 준비를 합니다. '.'은 모든 변경 파일을
                    추가합니다.
                  </li>
                </ul>
                <pre>
                  <code>git add .</code>
                </pre>
                <ul>
                  <li>
                    <strong>git commit -m "메시지"</strong>: 스테이징된 변경
                    사항을 로컬 저장소에 커밋합니다. "메시지"는 변경 사항에 대한
                    설명입니다.
                  </li>
                </ul>
                <pre>
                  <code>git commit -m "커밋 메시지"</code>
                </pre>
                <ul>
                  <li>
                    <strong>git pull origin [브랜치명]</strong>: 원격 저장소의
                    변경 사항을 로컬 저장소에 가져옵니다. 일반적으로 'main' 또는
                    'master' 브랜치를 사용합니다.
                  </li>
                </ul>
                <pre>
                  <code>git pull origin main</code>
                </pre>
                <ul>
                  <li>
                    <strong>git push origin [브랜치명]</strong>: 로컬 저장소의
                    변경 사항을 원격 저장소에 푸시합니다. 일반적으로 'main' 또는
                    'master' 브랜치를 사용합니다.
                  </li>
                </ul>
                <pre>
                  <code>git push origin main</code>
                </pre>
                <p>
                  이 스크립트를 사용하여 초보자들이 Git과 GitHub의 차이를
                  이해하고, GitHub Repository를 생성하고 VS Code와 연동하여
                  커밋하고 푸시하는 과정을 쉽게 따라할 수 있습니다. 필요한
                  명령어들에 대한 설명도 포함되어 있어, 단계별로 따라하기에
                  용이합니다.
                </p>
              </div>
              </div>
            </section>
          )}
          {currentSection === "homepage" && (
            <section>
              <h2>홈페이지 사용법</h2>
              <div className={`${styles.contentItem} ${styles.sectionContent}`}>
                <p>홈페이지 사용법에 대한 내용입니다.</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
