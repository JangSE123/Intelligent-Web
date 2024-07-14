// HelpDocs.js

import React, { useState } from "react";
import styles from "./HelpDocs.module.css";

export default function HelpDocs() {
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
                <ul>
                  <li>
                    <strong>Git 저장소 호스팅 서비스</strong>: GitHub는 Git
                    저장소를 호스팅하는 클라우드 기반 플랫폼으로, 개발자들이
                    프로젝트를 관리하고 협업할 수 있는 도구와 기능을 제공합니다.
                  </li>
                  <li>
                    <strong>협업 및 코드 공유</strong>: GitHub는 여러 개발자들이
                    동시에 프로젝트에 기여할 수 있도록 협업 도구를 제공하며,
                    코드 리뷰, 이슈 추적, 프로젝트 관리 등을 지원합니다.
                  </li>
                </ul>
              </div>
              <div className={`${styles.contentItem} ${styles.sectionContent}`}>
                <p>
                  <strong>Git</strong>:
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 272.96 114.01"
                >
                  <path
                    fill="#413000"
                    d="m163.59,38.806c-5.985,0-10.442,2.9389-10.442,10.012,0,5.3291,2.9375,9.0284,10.12,9.0284,6.0875,0,10.222-3.5869,10.222-9.2485,0-6.416-3.7-9.7915-9.9-9.7915zm-11.97,49.94c-1.4162,1.7382-2.8275,3.585-2.8275,5.7646,0,4.3482,5.545,5.6568,13.162,5.6568,6.31,0,14.905-0.44188,14.905-6.3085,0-3.4869-4.135-3.7028-9.36-4.0304l-15.88-1.0825zm32.201-49.611c1.955,2.5029,4.025,5.9848,4.025,10.989,0,12.075-9.465,19.146-23.169,19.146-3.485,0-6.64-0.43412-8.5962-0.97712l-3.5912,5.7648,10.66,0.65125c18.822,1.1992,29.915,1.7442,29.915,16.208,0,12.514-10.985,19.581-29.915,19.581-19.69,0-27.196-5.0049-27.196-13.598,0-4.8975,2.1762-7.5025,5.9838-11.098-3.5912-1.518-4.7862-4.2362-4.7862-7.1748,0-2.395,1.195-4.5702,3.1562-6.6386,1.9575-2.065,4.1325-4.1348,6.7438-6.5274-5.33-2.6104-9.3562-8.2676-9.3562-16.319,0-12.509,8.2688-21.1,24.91-21.1,4.6788,0,7.5088,0.43062,10.011,1.0874h21.215v9.2446l-10.01,0.76175"
                  />
                  <path
                    fill="#413000"
                    d="m212.98,19.366c-6.2025,0-9.7912-3.5932-9.7912-9.7964,0-6.1954,3.5888-9.5704,9.7912-9.5704,6.31,0,9.9,3.375,9.9,9.5704,0,6.2031-3.59,9.7964-9.9,9.7964zm-14.036,65.376,0-8.5899,5.55-0.75925c1.5238-0.22075,1.74-0.5445,1.74-2.1802v-31.983c0-1.1942-0.325-1.959-1.4162-2.2828l-5.8738-2.0688,1.1962-8.8086h22.521v45.144c0,1.7438,0.105,1.9595,1.7412,2.1802l5.5488,0.75925v8.5899h-31.008"
                  />
                  <path
                    fill="#413000"
                    d="m272.97,80.526c-4.68,2.2818-11.532,4.3491-17.736,4.3491-12.945,0-17.839-5.2168-17.839-17.515v-28.5c0-0.65138,0-1.0884-0.87375-1.0884h-7.6138v-9.6816c9.5762-1.0908,13.381-5.8784,14.578-17.736h10.336v15.453c0,0.75875,0,1.0874,0.87125,1.0874h15.338v10.877h-16.209v25.999c0,6.4194,1.525,8.9194,7.3962,8.9194,3.05,0,6.2012-0.75925,8.8125-1.7392l2.94,9.5761"
                  />
                  <path
                    fill="#f05133"
                    d="M111.78,51.977,62.035,2.2381c-2.8622-2.8648-7.5082-2.8648-10.374,0l-10.329,10.33,13.102,13.102c3.0459-1.0284,6.5371-0.33888,8.9639,2.0884,2.4394,2.4424,3.124,5.9634,2.0698,9.0195l12.628,12.628c3.0551-1.0528,6.58-0.37262,9.0195,2.0712,3.4106,3.4096,3.4106,8.9345,0,12.345-3.4111,3.4116-8.936,3.4116-12.349,0-2.5645-2.5665-3.1988-6.3345-1.8999-9.4942l-11.777-11.777-0.001,30.991c0.8315,0.41162,1.6162,0.961,2.3091,1.6509,3.4096,3.4092,3.4096,8.9331,0,12.348-3.4106,3.4091-8.938,3.4091-12.345,0-3.4101-3.4146-3.4101-8.9385,0-12.348,0.84275-0.84125,1.8179-1.478,2.8584-1.9048v-31.279c-1.041-0.425-2.015-1.057-2.859-1.905-2.583-2.581-3.2051-6.372-1.8804-9.5439l-12.916-12.918-34.106,34.105c-2.8657,2.867-2.8657,7.513,0,10.378l49.742,49.739c2.8638,2.8648,7.5082,2.8648,10.376,0l49.512-49.504c2.8648-2.8662,2.8648-7.5136,0-10.379"
                  />
                </svg>
                <ul>
                  <li>
                    <strong>분산 버전 관리 시스템</strong>: Git는 분산 버전 관리
                    시스템으로, 코드 변경 사항을 기록하고 추적하며, 여러 버전의
                    소스를 관리할 수 있습니다.
                  </li>
                  <li>
                    <strong>효율적인 협업</strong>: Git는 브랜치, 병합,
                    리베이스와 같은 기능을 통해 여러 개발자들이 효율적으로
                    협업할 수 있도록 지원합니다. 각 개발자는 독립적으로 작업한
                    후, 변경 사항을 중앙 저장소에 병합할 수 있습니다.
                  </li>
                </ul>
              </div>
              <div className={styles.sectionSeparator}></div>
              <div className={`${styles.contentItem} ${styles.sectionContent}`}>
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
                    저장소에 푸시한 변경 사항을 내려받아 로컬 저장소와 동기화할
                    수 있습니다.
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
                    <strong>정의</strong>: 푸시는 로컬 저장소의 변경 사항을 원격
                    저장소로 전송하는 작업입니다. 변경된 파일이나 폴더를 원격
                    저장소에 업로드하여 다른 개발자와 공유하거나 백업할 수
                    있습니다.
                  </li>
                  <li>
                    <strong>사용</strong>: Git에서 로컬 저장소의 변경 사항을
                    푸시하여, 원격 저장소에 업데이트할 수 있습니다.
                  </li>
                </ul>
              </div>
              <div className={styles.GitConnect}>
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
                    <a href="https://code.visualstudio.com/" target="_blank">
                      VS Code 다운로드 페이지
                    </a>
                    에서 VS Code를 다운로드하여 설치합니다.
                  </li>
                  <li>
                    <a href="https://git-scm.com/" target="_blank">
                      Git 다운로드 페이지
                    </a>
                    에서 Git을 다운로드하여 설치합니다.
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
