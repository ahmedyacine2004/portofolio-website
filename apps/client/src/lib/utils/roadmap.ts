export const roadmapMmd = `%%{init:{"theme":"dark","flowchart":{"curve":"basic"}}}%%

flowchart LR
Start([Education and Activities])

subgraph Education
B1["Baccalaureate<br/>2022 - 16.00/20"]
B2["Second Baccalaureate<br/>2024 - 17.80/20"]
B3["Bachelor's Degree<br/>2025"]
end

subgraph Current
C1["2CP Student<br/>ESTIN"]
C2["Graphic Design Manager<br/>SOAI Club"]
end

Start --> B1 --> B2 --> B3
B3 --> C1
B3 --> C2

classDef edu fill:#1E88E5,color:#fff,stroke:#64B5F6,stroke-width:2px;
classDef current fill:#FB8C00,color:#fff,stroke:#FFB74D,stroke-width:2px;
class B1,B2,B3 edu;
class C1,C2 current;`;
