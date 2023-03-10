import fs from "fs";
import { join } from 'path'
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote";

const projectsDirectory = join(process.cwd(), 'src/app/projects')

function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory)
}

async function getFirstProjectsInfo(){
  const directoryContent = fs.readdirSync(projectsDirectory)

  const firstProject = directoryContent[0];

  const source = fs.readFileSync(
    join(projectsDirectory, firstProject),
    'utf8'
  );

  return serialize<Record<string, unknown>, Record<string, "title">>(source, { parseFrontmatter: true });
}

export default async function Page() {
  const project = await getFirstProjectsInfo();

  return (
    <>
    <h1>Codely - My portfolio</h1>

    {project.frontmatter.title}


    {/* <ul>
      {projects.map(p => (<li key={p}>{p}</li>))}
    </ul>     */}
    </>
  );
}