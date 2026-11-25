export const ANSH_LATEX_RESUME = String.raw`\documentclass[a4paper,9pt]{extarticle}
\usepackage[left=0.55in,top=0.5in,right=0.55in,bottom=0.4in]{geometry}
\usepackage{iftex}
\ifPDFTeX
  \input{glyphtounicode}
  \pdfgentounicode=1
\fi
\usepackage{hyperref}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage{parskip}

\hypersetup{colorlinks=true, urlcolor=blue, linkcolor=blue}
\titleformat{\section}{\large\bfseries\uppercase}{}{0em}{}[\titlerule]
\titlespacing{\section}{0pt}{10pt}{5pt}
\setlist[itemize]{itemsep=3pt, topsep=2pt, leftmargin=14pt}
\setlength{\parskip}{0pt}
\setlength{\parindent}{0pt}
\urlstyle{same}
\renewcommand{\baselinestretch}{1.03}
\hyphenpenalty=10000
\exhyphenpenalty=10000
\tolerance=2000
\emergencystretch=2em
\pagenumbering{gobble}

\begin{document}
\begin{center}
    {\huge \textbf{Ansh Joshi}} \\
    \vspace{4pt}
    {\large Golang Backend Engineer} \\
    \vspace{4pt}
    \small
    Pune, India $|$
    +91-6355025431 $|$
    \href{mailto:anshsjoshi07@gmail.com}{anshsjoshi07@gmail.com} $|$
    \href{https://linkedin.com/in/anshjoshi1811}{linkedin.com/in/anshjoshi1811} $|$
    \href{https://github.com/ANSHJOSHI1811}{github.com/ANSHJOSHI1811}
\end{center}

\section{Summary}
Golang backend engineer with 2.5 years of experience building REST APIs and microservices (Gin, GORM, PostgreSQL) and running them on Kubernetes. Ran 15+ microservices on a 3-node cluster, cut 22 Jenkins pipelines down to 4, and cut query timeout errors by about 35\%. Works with Claude Code and GitHub Copilot in a plan, build, test and review loop, and reviews and tests everything they generate. \textbf{Star Employee of the Month}.

\section{Skills}
\begin{itemize}[leftmargin=0pt, label={}, itemsep=2pt]
    \item \textbf{Languages:} Go (Golang), Python, SQL, Bash
    \item \textbf{Backend \& Platform:} REST API, Microservices, Gin, GORM, PostgreSQL, Kubernetes, Docker
    \item \textbf{CI/CD \& Cloud:} Jenkins, SonarQube, AWS CodePipeline, AWS (S3, IAM, VPC, ECR), Terraform, Git, Linux
    \item \textbf{Observability:} Prometheus, ELK Stack (Filebeat), Logging, Debugging
    \item \textbf{AI-Assisted Development:} Claude Code, GitHub Copilot, Agent Loop Engineering
\end{itemize}

\section{Work Experience}
\textbf{Development Engineer in Cloud, Calsoft} \hfill \textit{April 2025 -- Present} \\
\textit{Pune / Remote}

\vspace{4pt}
\textbf{Open Network Automation Platform (ONAP)} \textemdash{} \textit{Kubernetes / Jenkins / SonarQube / Docker}
\begin{itemize}
    \item Made dev deployments repeatable for 15+ ONAP microservices (13 owned by my team) by running them as pods on a 3-node \textbf{Kubernetes} cluster (1 master, 2 workers) on AWS-hosted servers.
    \item Cut 22 \textbf{Jenkins} pipelines across 4 projects down to 4 (one per project, with developer and QA stages), replacing manual dev deployments.
    \item Replaced manual code scans with automated \textbf{SonarQube} analysis inside the same Jenkins pipelines, next to the build, tag and Kubernetes deployment stages.
\end{itemize}

\vspace{4pt}
\textbf{Multi-Cloud Networking (MCN)} \textemdash{} \textit{Terraform / AWS / Docker / Prometheus / ELK}
\begin{itemize}
    \item Standardized 3 environments (dev, staging, production) by provisioning AWS infrastructure (S3, IAM, VPC) as code with \textbf{Terraform}.
    \item Cut manual deployment steps and made releases consistent by building \textbf{CI/CD pipelines} with AWS CodePipeline and CodeBuild, triggered by Git tags.
    \item Made application behavior easier to see by adding \textbf{Prometheus and ELK Stack (Filebeat)} monitoring and log collection, with components containerized in \textbf{Docker} and AWS ECR.
\end{itemize}

\vspace{5pt}
\textbf{Software Engineering Intern (Back End), Calsoft} \hfill \textit{April 2024 -- April 2025} \\
\textit{Pune, India}

\vspace{4pt}
\textbf{Multi-Cloud Pricing Ingestion Pipeline} \textemdash{} \textit{Go / GORM / PostgreSQL / Gin}
\begin{itemize}
    \item Enabled zero-downtime catalog updates for multi-GB AWS pricing files by building a \textbf{Go} ingestion pipeline with stream-based JSON parsing, idempotent SKU ingestion through \textbf{GORM} and a Blue/Green update strategy.
    \item Cut query timeout errors by about 35\% by contributing \textbf{Gin} REST APIs and \textbf{PostgreSQL} indexing improvements.
\end{itemize}

\section{Projects}
\textbf{AWS Cloud Simulator Platform (CalCS)} \textemdash{} \textit{Go, Gin, Docker, Claude Code}
\begin{itemize}
    \item Cut onboarding time for new simulations by 40\% by designing a plugin-based architecture for SQS and Lambda in a \textbf{Go (Gin)} simulator of 20+ cloud services, which also removed vendor cloud costs.
    \item Cut team setup time by 60\% by containerizing the platform with \textbf{Docker}.
    \item Sped up simulator feature work by using \textbf{agent loop engineering} with Claude Code: plan, implement, test and review cycles guided by project rules and skills, with every generated change reviewed and tested by me.
\end{itemize}

\section{Certifications}
AWS Certified Solutions Architect -- Associate \\
AWS Certified Cloud Practitioner

\section{Education}
\textbf{B.Tech, Computer Science and Engineering} \hfill \textit{2020 -- 2024} \\
Acropolis Group of Institutions, Indore (RGPV University) \hfill \textit{CGPA: 7.88 / 10.0}
\end{document}
`;

export function downloadResumeLatex() {
  const blob = new Blob([ANSH_LATEX_RESUME], {
    type: 'application/x-tex;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Ansh_Joshi_Resume.tex';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function downloadFormattedResumeHtml() {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Ansh Joshi — Golang Backend Engineer Resume</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1f1f1f; max-width: 780px; margin: 36px auto; padding: 0 24px; line-height: 1.48; font-size: 13.5px; }
  header { text-align: center; border-bottom: 1.5px solid #252525; padding-bottom: 14px; margin-bottom: 18px; }
  h1 { margin: 0; font-size: 26px; letter-spacing: -0.02em; }
  .role { font-size: 15px; color: #444; margin: 4px 0 6px; font-weight: 600; }
  .meta { font-size: 12px; color: #555; }
  .meta a { color: #252525; text-decoration: none; border-bottom: 1px solid #bbb; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #252525; padding-bottom: 3px; margin: 18px 0 8px; }
  h3 { font-size: 13.5px; margin: 10px 0 2px; display: flex; justify-content: space-between; }
  .sub { font-style: italic; color: #555; font-size: 12.5px; margin-bottom: 4px; }
  ul { margin: 4px 0 8px 18px; padding: 0; }
  li { margin-bottom: 4px; }
  .skills { list-style: none; margin-left: 0; }
  @media print { body { margin: 12px auto; } }
</style>
</head>
<body>
  <header>
    <h1>Ansh Joshi</h1>
    <div class="role">Golang Backend Engineer</div>
    <div class="meta">
      Pune, India &middot; +91-6355025431 &middot;
      <a href="mailto:anshsjoshi07@gmail.com">anshsjoshi07@gmail.com</a> &middot;
      <a href="https://linkedin.com/in/anshjoshi1811">linkedin.com/in/anshjoshi1811</a> &middot;
      <a href="https://github.com/ANSHJOSHI1811">github.com/ANSHJOSHI1811</a>
    </div>
  </header>
  <h2>Summary</h2>
  <p>Golang backend engineer with 2.5 years of experience building REST APIs and microservices (Gin, GORM, PostgreSQL) and running them on Kubernetes. Ran 15+ microservices on a 3-node cluster, cut 22 Jenkins pipelines down to 4, and cut query timeout errors by about 35%. Works with Claude Code and GitHub Copilot in a plan, build, test and review loop, and reviews and tests everything they generate. <strong>Star Employee of the Month.</strong></p>

  <h2>Skills</h2>
  <ul class="skills">
    <li><strong>Languages:</strong> Go (Golang), Python, SQL, Bash</li>
    <li><strong>Backend &amp; Platform:</strong> REST API, Microservices, Gin, GORM, PostgreSQL, Kubernetes, Docker</li>
    <li><strong>CI/CD &amp; Cloud:</strong> Jenkins, SonarQube, AWS CodePipeline, AWS (S3, IAM, VPC, ECR), Terraform, Git, Linux</li>
    <li><strong>Observability:</strong> Prometheus, ELK Stack (Filebeat), Logging, Debugging</li>
    <li><strong>AI-Assisted Development:</strong> Claude Code, GitHub Copilot, Agent Loop Engineering</li>
  </ul>

  <h2>Work Experience</h2>
  <h3><span>Development Engineer in Cloud, Calsoft</span><span>April 2025 – Present</span></h3>
  <div class="sub">Pune / Remote</div>
  <div><strong>Open Network Automation Platform (ONAP)</strong> — <em>Kubernetes / Jenkins / SonarQube / Docker</em></div>
  <ul>
    <li>Made dev deployments repeatable for 15+ ONAP microservices (13 owned by my team) by running them as pods on a 3-node Kubernetes cluster (1 master, 2 workers) on AWS-hosted servers.</li>
    <li>Cut 22 Jenkins pipelines across 4 projects down to 4 (one per project, with developer and QA stages), replacing manual dev deployments.</li>
    <li>Replaced manual code scans with automated SonarQube analysis inside the same Jenkins pipelines, next to the build, tag and Kubernetes deployment stages.</li>
  </ul>
  <div><strong>Multi-Cloud Networking (MCN)</strong> — <em>Terraform / AWS / Docker / Prometheus / ELK</em></div>
  <ul>
    <li>Standardized 3 environments (dev, staging, production) by provisioning AWS infrastructure (S3, IAM, VPC) as code with Terraform.</li>
    <li>Cut manual deployment steps and made releases consistent by building CI/CD pipelines with AWS CodePipeline and CodeBuild, triggered by Git tags.</li>
    <li>Made application behavior easier to see by adding Prometheus and ELK Stack (Filebeat) monitoring and log collection, with components containerized in Docker and AWS ECR.</li>
  </ul>

  <h3><span>Software Engineering Intern (Back End), Calsoft</span><span>April 2024 – April 2025</span></h3>
  <div class="sub">Pune, India</div>
  <div><strong>Multi-Cloud Pricing Ingestion Pipeline</strong> — <em>Go / GORM / PostgreSQL / Gin</em></div>
  <ul>
    <li>Enabled zero-downtime catalog updates for multi-GB AWS pricing files by building a Go ingestion pipeline with stream-based JSON parsing, idempotent SKU ingestion through GORM and a Blue/Green update strategy.</li>
    <li>Cut query timeout errors by about 35% by contributing Gin REST APIs and PostgreSQL indexing improvements.</li>
  </ul>

  <h2>Projects</h2>
  <h3><span>AWS Cloud Simulator Platform (CalCS)</span><span>Go, Gin, Docker, Claude Code</span></h3>
  <ul>
    <li>Cut onboarding time for new simulations by 40% by designing a plugin-based architecture for SQS and Lambda in a Go (Gin) simulator of 20+ cloud services, which also removed vendor cloud costs.</li>
    <li>Cut team setup time by 60% by containerizing the platform with Docker.</li>
    <li>Sped up simulator feature work by using agent loop engineering with Claude Code: plan, implement, test and review cycles guided by project rules and skills, with every generated change reviewed and tested by me.</li>
  </ul>

  <h2>Certifications</h2>
  <ul>
    <li>AWS Certified Solutions Architect – Associate</li>
    <li>AWS Certified Cloud Practitioner</li>
  </ul>

  <h2>Education</h2>
  <h3><span>B.Tech, Computer Science and Engineering — Acropolis Group of Institutions, Indore (RGPV University)</span><span>2020 – 2024 · CGPA: 7.88 / 10.0</span></h3>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Ansh_Joshi_Resume.html';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
