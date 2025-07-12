import Timeline from "../components/timeline";
import skillsData from "../data/skills.json";

export default function About() {

  const { skills } = skillsData;
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-black mb-8 text-center">About me</h1>
        <div className="max-w-4xl mx-auto">
          <Timeline />
        </div>
  
        <h2 className="text-3xl font-extrabold mb-6 text-center underline decoration-double">
          Skills
        </h2>
  
        {skills.map(({ category, items }) => (
          <section key={category}>
            <h2 className="pt-3 text-2xl font-bold mb-4 text-center">
              {category}
            </h2>
            <div className="mx-auto max-w-3xl px-16 text-center">
              {items.map((item) => (
                <kbd key={item} className="mx-1">{item}</kbd>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }