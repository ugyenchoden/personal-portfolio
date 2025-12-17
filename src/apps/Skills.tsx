type Skill = {
  name: string;
  level: string;
};

const skills: Skill[] = [
  { name: "JavaScript", level: "Expert" },
  { name: "React", level: "Expert" },
  { name: "Node.js", level: "Intermediate" },
];

const Skills = () => {
  return (
    <div className="app-content">
      <h2>My Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.name}>
            {skill.name} - {skill.level}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;