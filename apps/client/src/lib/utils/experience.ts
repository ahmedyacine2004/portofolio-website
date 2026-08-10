export const experienceDb = `-- SQLite: experience.db
-- Connection established.
-- Engine: SQLite 3.46

SELECT * FROM experience;

+----+-----------------------------+--------------------------+---------------------+----------+------+
| ID | POSITION                    | COMPANY                  | PERIOD              | LOCATION | TYPE |
+----+-----------------------------+--------------------------+---------------------+----------+------+
| 01 | Graphic Designer            | Freelance                | 2022 - Present      | Remote   | PT   |
| 02 | Frontend Developer          | Freelance                | 2023 - Present      | Remote   | FT   |
| 03 | Full Stack Developer        | Personal Projects        | 2024 - Present      | Remote   | FT   |
| 04 | Design Team Lead            | University Organizations | 2024 - 2025         | Algeria  | VOL  |
| 05 | Software Engineering Intern | SOMIPHOS                 | Jul 2025 - Sep 2025 | Tebessa  | INT  |
| 06 | Founder & Lead Developer    | CONSULTIFY               | 2026 - Present      | Remote   | CEO  |
+----+-----------------------------+--------------------------+---------------------+----------+------+
6 row(s) returned in 0.003s

SELECT COUNT(*) AS total_experience FROM experience;

+------------------+
| total_experience |
+------------------+
| 6                |
+------------------+

SELECT DISTINCT type FROM experience;

+------+
| TYPE |
+------+
| PT   |
| FT   |
| VOL  |
| INT  |
| CEO  |
+------+

Query completed successfully.`;
