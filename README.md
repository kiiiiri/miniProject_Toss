# miniProject_Toss

*작업 시작전에 pull은 항상 해주세요! 본인 브렌치여도 습관적으로 pull은 해주시는게 좋습니다.

1.본인이 작업할 Branch를 먼저 생성, 브랜치 이름 ex) feature/q&a_leftMenu -> q&a페이지의 왼쪽 메뉴 작업에 대한 Branch
 - branch 생성 후 terminal에서 순서대로 명령어 작성, git fetch (현재 브렌치를 로컬에 가져옴) -> git checkout -b feature/기능명 origin/feature/기능명 -> git status 입력하면 현재 branch 확인 가능.
 - 현재 브랜치가 본인이 checkout 한 branch와 동일하다면 작업 시작.
   
2.작업 중간중간 git add . -> git commit -m"" 을 해줘야 혹시 모를 상황에 되돌릴 수 있음.
 - 전체 작업이 끝났다면 git add . -> git commit -m"왼쪽 메뉴 개발 완료" -> git push 이 순서대로 명령어 입력.
 - push가 성공적으로 되면 merge 후 그 브랜치는 사라지기 때문에 새로운 브랜치를 만들거나 main브랜치에서 작업 시작
 - git checkout origin/main 입력 시 main branch로 이동 후 pull 필수


* git status 를 자주 확인해 주세요! 현재 상태를 알 수 있습니다. ex) 현재 수정된 사항, 현재 브랜치 등등
