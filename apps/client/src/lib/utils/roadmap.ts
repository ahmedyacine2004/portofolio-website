export const roadmapMmd = `%%{init:{"theme":"dark","flowchart":{"curve":"basic"}}}%%

flowchart LR
Start([Journey Begins])

subgraph Education
B1["Baccalaureate<br/>2022 - 16.00/20"]
B2["Bachelor's Degree<br/>2022-2025 - 17.80/20"]
B3["ESTIN Engineering<br/>2025-Present"]
end

subgraph Skills
S1["Frontend"] --> C1
S2["Backend"] --> C1
S3["Databases"] --> C2
S4["Design"] --> C3
end

subgraph Current
C1["CONSULTIFY"]
C2["AI Integration"]
C3["3D Portfolio"]
end

subgraph Future
F1["Cloud Computing"]
F2["System Architecture"]
F3["Startup Growth"]
end

Start --> B1 --> B2 --> B3
B3 ==> S1 & S2 & S3 & S4
C1 ==> F1 & F2
C2 ==> F3
C3 ==> F3

classDef edu fill:#1E88E5,color:#fff,stroke:#64B5F6,stroke-width:2px;
classDef skill fill:#43A047,color:#fff,stroke:#81C784,stroke-width:2px;
classDef current fill:#FB8C00,color:#fff,stroke:#FFB74D,stroke-width:2px;
classDef future fill:#8E24AA,color:#fff,stroke:#BA68C8,stroke-width:2px;
classDef future fill:#8E24AA,color:#fff,stroke:#BA68C8,stroke-width:2px;
class C1,C2,C3 current; class F1,F2,F3 future;`;
