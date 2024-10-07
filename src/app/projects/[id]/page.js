"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/app/context/Themescontext";
import HeadingBiggest from "@/app/components/headings/headingbiggest";
import LoadingBar from "@/app/components/loader";
import Image from "next/image";
import Button1 from "@/app/components/buttons/button1";
import CircularProgressBar  from "@/app/components/percentageprogressbar";

export default function ProjectsPage({ params }) {
  const [project, setProject] = useState(null);
  const { isThemeOn } = useTheme();
  const [showSecondDiv, setShowSecondDiv] = useState(false);
  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch("/projects.json");
      const projects = await response.json();
      const foundProject = projects.find(
        (b) => b.id === parseInt(params.id, 10)
      );
      setProject(foundProject);
      const timer = setTimeout(() => {
        setShowSecondDiv(true);
      }, 100);
      return () => clearTimeout(timer);
    };
    fetchProject();
  }, [params.id]);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        {showSecondDiv && (
          <div className="text-4xl font-extrabold md:text-5xl lg:text-6xl">
            Project not found
            <div className="my-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="120px"
                viewBox="0 -960 960 960"
                width="120px"
                className={`justify-center m-auto ${
                  isThemeOn ? "fill-black" : "fill-white"
                }`}
              >
                <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 100q-68 0-123.5 38.5T276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
              </svg>
              <div className="flex m-auto justify-center">
                <Button1
                  text="Something wrong? Go to Projects page"
                  href="/projects"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48"
                      viewBox="0 -960 960 960"
                      width="48"
                      className={` ${
                        isThemeOn
                          ? "fill-black group-hover:fill-white"
                          : "fill-white group-hover:fill-black"
                      }`}
                    >
                      <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        )}
        <div className="absolute bottom-0">
          <LoadingBar />
          {showSecondDiv && <div>Still trying to fetch...</div>}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center animate-fadeInDown p-4 lg:p-8">
      <div className=" max-w-7xl mx-auto animate-fadeInLeft">
        <div className="flex mt-2 md:mt-4 lg:mt-6 justify-center">
          <HeadingBiggest text={project.title} />
        </div>
        <div className="flex mb-5 md:mb-6 lg:mb-8 opacity-90 justify-center font animate-fadeInDown font-bold">
          {project.description}
        </div>
        <div className="flex flex-col sm:flex-row justify-evenly items-center mb-7 space-y-4 sm:space-y-0">
          <div className="inline mt-2 md:mt-4">
            <Button1
              text="Live Link"
              href={`${project.livelink}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className={`transform transition-transform duration-300 group-hover:scale-110 -rotate-45 group-hover:rotate-0 ${
                    isThemeOn
                      ? "fill-black group-hover:fill-white"
                      : "fill-white group-hover:fill-black"
                  }`}
                >
                  <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                </svg>
              }
            />
          </div>

          <div className="inline mt-2 md:mt-4">
            <Button1
              text="Github Repo"
              href={`${project.github}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  className={` ${
                    isThemeOn
                      ? "fill-black group-hover:fill-white"
                      : "fill-white group-hover:fill-black"
                  }`}
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              }
            />
          </div>
          {project.download && (
            <div className="inline mt-2 md:mt-4">
              <Button1
                text={`Direct Download this ${project.filetype}`}
                href={`${project.github}`}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className={` ${
                      isThemeOn
                        ? "fill-black group-hover:fill-white"
                        : "fill-white group-hover:fill-black"
                    }`}
                  >
                    <path d="M280-280h400v-80H280v80Zm200-120 160-160-56-56-64 62v-166h-80v166l-64-62-56 56 160 160Zm0 320q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                }
              />
            </div>
          )}
        </div>
        <div className="object-cover flex my-2 md:my-4 lg:my-6 justify-center">
          <Image src={project.image} height={600} width={900} alt={project.title} className="rounded-2xl" />
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 animate-fadeInLeft mt-8 md:mt-10 lg:mt-12">{`What is  ${project.title}?`}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 lg:mt-8 px-4 lg:px-12">
          {project.whatis1 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whatis1}`}</div>
          ) : null}
          {project.whatis2 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whatis2}`}</div>
          ) : null}
          {project.whatis3 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whatis3}`}</div>
          ) : null}
          {project.whatis3 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whatis4}`}</div>
          ) : null}
          {project.whatis5 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whatis5}`}</div>
          ) : null}
          {project.whatis6 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whatis6}`}</div>
          ) : null}
        </div>


        <div className="text-3xl md:text-4xl lg:text-5xl font-bold my-4 animate-fadeInLeft mt-8 md:mt-10 lg:mt-12">{`Why use ${project.title}?`}</div>
        <div className="display grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 md:mt-4 lg:mt-8 px-6 md:px-8 lg:px-12">
          {project.whyuse1 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whyuse1}`}</div>
          ) : null}
          {project.whyuse2 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whyuse2}`}</div>
          ) : null}
          {project.whyuse3 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whyuse3}`}</div>
          ) : null}
          {project.whyuse4 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whyuse4}`}</div>
          ) : null}
          {project.whyuse5 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whyuse5}`}</div>
          ) : null}
          {project.whyuse6 ? (
            <div className="border border-foreground justify-center font-bold flex rounded-xl p-4 text-center">{` ${project.whyuse6}`}</div>
          ) : null}
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fadeInLeft mt-8 md:mt-10 lg:mt-12">
          Technologies Used
        </div>
        <div></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto my-4 lg:my-12 items-center">
            {project.techStack.map((category, index) => (
              <div key={index} className="flex flex-col items-center space-y-6  p-4 backdrop-blur-sm rounded-[32px] shadow-[35px_0_0_rgba(145,192,255,0),inset_-7px_-7px_16px_0px_rgba(145,192,255,0.6),inset_0px_11px_28px_0px_rgb(255,255,255)]">
                {category == "Javascript" && (
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="120"
                      viewBox="0 -960 960 960"
                      width="120"
                      className={`${isThemeOn ? "fill-black" : "fill-white"}`}
                    >
                      <path d="M300-360q-25 0-42.5-17.5T240-420v-40h60v40h60v-180h60v180q0 25-17.5 42.5T360-360h-60Zm220 0q-17 0-28.5-11.5T480-400v-40h60v20h80v-40H520q-17 0-28.5-11.5T480-500v-60q0-17 11.5-28.5T520-600h120q17 0 28.5 11.5T680-560v40h-60v-20h-80v40h100q17 0 28.5 11.5T680-460v60q0 17-11.5 28.5T640-360H520Z" />
                    </svg></div>

                      <div className=""><CircularProgressBar percentage={project.jspercentage} />
                    
                  </div></div>
                )}

                {category == "React" && (
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <Image
                      src="/icons/icons8-react-a-javascript-library-for-building-user-interfaces-96.png"
                      width={100}
                      height={100}
                      alt="React logo"
                    /></div>
                    <CircularProgressBar  percentage={project.reactpercentage} />
                  </div>
                )}

                {category == "Tailwind" && (
                   <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <Image
                      src="/icons/icons8-tailwind-css-48.png"
                      width={50}
                      height={50}
                      alt="tailwind logo"
                    /></div>
                    <div className="">
                    <CircularProgressBar  percentage={project.tailwindpercentage} />
                  </div></div>
                )}

                {category == "Vite" && (
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <Image src="/icons/vitelogo.svg" width={50} height={50} alt="Vite logo" /></div>
                    <div className=""><CircularProgressBar  percentage={project.vitepercentage} />
                  </div></div>
                )}

                {category == "Vue" && (
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <svg
                      class="logo"
                      viewBox="0 0 128 128"
                      width="50"
                      height="50"
                      data-v-df6d64fc=""
                    >
                      <path
                        fill="#42b883"
                        d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
                        data-v-df6d64fc=""
                      ></path>
                      <path
                        fill="#35495e"
                        d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"
                        data-v-df6d64fc=""
                      ></path>
                    </svg>{" "}</div>
                    <div className=""><CircularProgressBar  percentage={project.vuepercentage} />
                  </div></div>
                )}

                {category == "Typescript" && (
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <Image
                      src="/icons/icons8-typescript-48.png"
                      width={50}
                      height={50}
                      alt="Typescript logo"
                    /></div>
                    <div className=""><CircularProgressBar  percentage={project.tspercentage} />
                  </div></div>
                )}

                {category == "Angular" && (
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <Image
                      src="/icons/shield-large.svg"
                      width={50}
                      height={50}
                      alt="Angular Logo"
                    /></div>
                    <div className=""><CircularProgressBar  percentage={project.angularpercentage} />
                  </div></div>
                )}

                {category == "Next js" && (
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="120"
                      viewBox="0 0 394 79"
                      width="120"
                      className={` ${
                        isThemeOn ? "fill-black " : "fill-white "
                      }`}
                    >
                      <path
                        d="M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z"
                        fill="var(--geist-foreground)"
                      ></path>
                      <path
                        d="M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z"
                        fill="var(--geist-foreground)"
                      ></path>
                      <path
                        d="M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z"
                        fill="var(--geist-foreground)"
                      ></path>
                      <path
                        d="M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z"
                        fill="var(--geist-foreground)"
                      ></path>
                      <path
                        clip-rule="evenodd"
                        d="M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z"
                        fill="var(--geist-foreground)"
                        fill-rule="evenodd"
                      ></path>
                      <path
                        d="M333.607 78.8546C332.61 78.8546 331.762 78.5093 331.052 77.8186C330.342 77.1279 329.991 76.2917 330 75.3011C329.991 74.3377 330.342 73.5106 331.052 72.8199C331.762 72.1292 332.61 71.7838 333.607 71.7838C334.566 71.7838 335.405 72.1292 336.115 72.8199C336.835 73.5106 337.194 74.3377 337.204 75.3011C337.194 75.9554 337.028 76.5552 336.696 77.0914C336.355 77.6368 335.922 78.064 335.377 78.373C334.842 78.6911 334.252 78.8546 333.607 78.8546Z"
                        fill="var(--geist-foreground)"
                      ></path>
                      <path
                        d="M356.84 45.4453H362.872V68.6846C362.863 70.8204 362.401 72.6472 361.498 74.1832C360.585 75.7191 359.321 76.8914 357.698 77.7185C356.084 78.5364 354.193 78.9546 352.044 78.9546C350.079 78.9546 348.318 78.6001 346.75 77.9094C345.182 77.2187 343.937 76.1826 343.024 74.8193C342.101 73.456 341.649 71.7565 341.649 69.7207H347.691C347.7 70.6114 347.903 71.3838 348.29 72.0291C348.677 72.6744 349.212 73.1651 349.895 73.5105C350.586 73.8559 351.38 74.0286 352.274 74.0286C353.243 74.0286 354.073 73.8286 354.746 73.4196C355.419 73.0197 355.936 72.4199 356.296 71.6201C356.646 70.8295 356.831 69.8479 356.84 68.6846V45.4453Z"
                        fill="var(--geist-foreground)"
                      ></path>
                      <path
                        d="M387.691 54.5338C387.544 53.1251 386.898 52.0254 385.773 51.2438C384.638 50.4531 383.172 50.0623 381.373 50.0623C380.11 50.0623 379.022 50.2532 378.118 50.6258C377.214 51.0075 376.513 51.5164 376.033 52.1617C375.554 52.807 375.314 53.5432 375.295 54.3703C375.295 55.061 375.461 55.6608 375.784 56.1607C376.107 56.6696 376.54 57.0968 377.103 57.4422C377.656 57.7966 378.274 58.0874 378.948 58.3237C379.63 58.56 380.313 58.76 380.995 58.9236L384.14 59.6961C385.404 59.9869 386.631 60.3778 387.802 60.8776C388.973 61.3684 390.034 61.9955 390.965 62.7498C391.897 63.5042 392.635 64.413 393.179 65.4764C393.723 66.5397 394 67.7848 394 69.2208C394 71.1566 393.502 72.8562 392.496 74.3285C391.491 75.7917 390.043 76.9369 388.143 77.764C386.252 78.582 383.965 79 381.272 79C378.671 79 376.402 78.6002 374.493 77.8004C372.575 77.0097 371.08 75.8463 370.001 74.3194C368.922 72.7926 368.341 70.9294 368.258 68.7391H374.235C374.318 69.8842 374.687 70.8386 375.314 71.6111C375.95 72.3745 376.78 72.938 377.795 73.3197C378.819 73.6923 379.962 73.8832 381.226 73.8832C382.545 73.8832 383.707 73.6832 384.712 73.2924C385.708 72.9016 386.492 72.3564 387.055 71.6475C387.627 70.9476 387.913 70.1206 387.922 69.1754C387.913 68.312 387.654 67.5939 387.156 67.0304C386.649 66.467 385.948 65.9944 385.053 65.6127C384.15 65.231 383.098 64.8856 381.899 64.5857L378.081 63.6223C375.323 62.9225 373.137 61.8592 371.541 60.4323C369.937 59.0054 369.143 57.115 369.143 54.7429C369.143 52.798 369.678 51.0894 370.758 49.6261C371.827 48.1629 373.294 47.0268 375.148 46.2179C377.011 45.4 379.114 45 381.456 45C383.836 45 385.92 45.4 387.719 46.2179C389.517 47.0268 390.929 48.1538 391.952 49.5897C392.976 51.0257 393.511 52.6707 393.539 54.5338H387.691Z"
                        fill="var(--geist-foreground)"
                      ></path>
                    </svg>{" "}</div>
                    <div className=""><CircularProgressBar  percentage={project.nextpercentage} />
                  </div></div>
                )}

                {category == "Remix js" && (
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <svg
                      x-comp="Wordmark"
                      height="24"
                      viewBox="0 0 659 165"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z"
                        fill="url(#paint0_linear)"
                      ></path>
                      <path
                        d="M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z"
                        fill="url(#paint1_linear)"
                      ></path>
                      <path
                        d="M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z"
                        fill="url(#paint2_linear)"
                      ></path>
                      <path
                        d="M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z"
                        fill="url(#paint3_linear)"
                      ></path>
                      <path
                        d="M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z"
                        fill="currentColor"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="591.052"
                          y1="47.1035"
                          x2="591.052"
                          y2="161.28"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="currentColor"></stop>
                          <stop
                            offset="1"
                            stop-color="currentColor"
                            stop-opacity="0"
                          ></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear"
                          x1="203.19"
                          y1="44.0317"
                          x2="203.19"
                          y2="164.352"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="currentColor"></stop>
                          <stop
                            offset="1"
                            stop-color="currentColor"
                            stop-opacity="0"
                          ></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear"
                          x1="368.744"
                          y1="44.0317"
                          x2="368.744"
                          y2="161.28"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="currentColor"></stop>
                          <stop
                            offset="1"
                            stop-color="currentColor"
                            stop-opacity="0"
                          ></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear"
                          x1="499.172"
                          y1="0"
                          x2="499.172"
                          y2="161.28"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="currentColor"></stop>
                          <stop
                            offset="1"
                            stop-color="currentColor"
                            stop-opacity="0"
                          ></stop>
                        </linearGradient>
                      </defs>
                    </svg></div>
                    <div className=""><CircularProgressBar  percentage={project.remixpercentage} />
                  </div></div>
                )}

                {category == "React Native" && (
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <Image
                      src="/icons/header_logo.svg"
                      width={100}
                      height={100}
                      alt="React Native logo"
                    /></div>
                    <div className=""><CircularProgressBar  percentage={project.reactnativenpercentage} />
                  </div></div>
                )}

                {category == "Flutter" && (
                  
                  <div className="flex flex-col items-center">
                    <div className="min-h-[150px] flex items-center justify-center">
                    <Image src="/icons/favicon.ico" width={50} height={50} alt="Flutter logo" /></div>
                    <div className=""><CircularProgressBar  percentage={project.flutterpercentage} />
                  </div></div>
                )}

                {category == "Electron js" && (
                  <div className="flex flex-col items-center">
                    
                  <div className="min-h-[150px] flex items-center justify-center"><Image
                      src="/icons/electronlogo.svg"
                      width={100}
                      height={100}
                      alt="Electron js logo"
                    /></div>
                    <div className=""><CircularProgressBar  percentage={project.electronpercentage} />
                  </div></div>
                )}

                {category == "Python" && (
                  <div className="flex flex-col items-center">
                    
                  <div className="min-h-[150px] flex items-center justify-center">
                    <Image
                      src="/icons/python-logo@2x.png"
                      width={200}
                      height={200}
                      alt="Python logo"
                    /></div>
                    <div className=""><CircularProgressBar  percentage={project.pythonpercentage} />
                  </div></div>
                )}

                {category == "Java" && (

                  <div className="flex flex-col items-center">
                    
                  <div className="min-h-[150px] flex items-center justify-center">
                    <Image
                      src="/icons/Java_programming_language_logo.svg.png"
                      width={50}
                      height={50}
                      alt="Java logo"
                    /></div>
                    <div className="">
                    <CircularProgressBar  percentage={project.javapercentage} />
                  </div></div>
                )}

                {category == "Mysql" && (
                  <div className="flex flex-col items-center">
                    
                    
                  <div className="min-h-[150px] flex items-center justify-center"><Image src="/icons/r.png" width={80} height={80} alt="Mysql logo" />
                    </div><div className=""><CircularProgressBar  percentage={project.mysqlpercentage} />
                  </div></div>
                )}

                {category == "PostgreSQL" && (
                  <div className="flex flex-col items-center">
                    
                  <div className="min-h-[150px] flex items-center justify-center">
                    <Image src="/icons/elephant.png" width={80} height={80} alt="PostgreSQL Logo" />
                    </div><div className=""><CircularProgressBar  percentage={project.postgrepercentage} />
                  </div></div>
                )}

                {category == "Docker" && (
                  <div className="flex flex-col items-center">
                    
                  <div className="min-h-[150px] flex items-center justify-center">
                    <Image src="/icons/OIP.png" width={100} height={100} alt="Docker logo" />
                    </div><div className=""><CircularProgressBar  percentage={project.dockerpercentage} />
                  </div></div>
                )}

                {category == "Firebase" && (
                  
                  <div className="min-h-[150px] flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Image src="/icons/lockup.svg" width={100} height={100} alt="Firebase logo" />
                    </div><div className=""><CircularProgressBar  percentage={project.firebasepercentage} />
                  </div></div>
                )}

                {category == "MongoDB" && (
                  <div className="flex flex-col items-center">
                    
                  <div className="min-h-[150px] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="150"
                      viewBox="0 0 1102 278"
                      width="150"
                      className={` ${
                        isThemeOn ? "fill-black " : "fill-white "
                      }`}
                    >
                      <path
                        d="M82.3229 28.6444C71.5367 15.8469 62.2485 2.84945 60.351 0.149971C60.1512 -0.0499903 59.8515 -0.0499903 59.6518 0.149971C57.7542 2.84945 48.4661 15.8469 37.6798 28.6444C-54.9019 146.721 52.2613 226.406 52.2613 226.406L53.1601 227.006C53.959 239.303 55.9565 257 55.9565 257H59.9514H63.9463C63.9463 257 65.9438 239.403 66.7428 227.006L67.6416 226.306C67.7414 226.306 174.905 146.721 82.3229 28.6444ZM59.9514 224.606C59.9514 224.606 55.1576 220.507 53.8592 218.407V218.208L59.6518 89.6325C59.6518 89.2326 60.2511 89.2326 60.2511 89.6325L66.0436 218.208V218.407C64.7453 220.507 59.9514 224.606 59.9514 224.606Z"
                        fill="currentColor"
                      />
                      <path
                        d="M260.501 197.588L215.845 89.2991L215.745 89H181.001V96.2791H186.608C188.31 96.2791 189.912 96.977 191.114 98.1736C192.315 99.3702 192.916 100.966 192.916 102.661L191.915 211.647C191.915 215.037 189.112 217.829 185.707 217.929L180 218.029V225.208H213.843V218.029L210.338 217.929C206.934 217.829 204.13 215.037 204.13 211.647V108.943L252.792 225.208C253.492 226.903 255.094 228 256.897 228C258.699 228 260.301 226.903 261.002 225.208L308.562 111.535L309.263 211.647C309.263 215.137 306.459 217.929 302.955 218.029H299.35V225.208H339V218.029H333.593C330.189 218.029 327.385 215.137 327.285 211.747L326.985 102.76C326.985 99.2704 329.788 96.4785 333.193 96.3788L339 96.2791V89H305.157L260.501 197.588Z"
                        fill="currentColor"
                      />
                      <path
                        d="M571.869 216.955C570.764 215.849 570.162 214.342 570.162 212.533V158.663C570.162 148.412 567.151 140.372 561.127 134.643C555.205 128.915 546.973 126 536.734 126C522.378 126 511.035 131.829 503.104 143.286C503.004 143.487 502.703 143.588 502.402 143.588C502.1 143.588 501.9 143.387 501.9 143.085L498.185 128.714H491.961L476 137.859V142.884H480.116C482.023 142.884 483.629 143.387 484.734 144.392C485.838 145.397 486.44 146.905 486.44 149.015V212.432C486.44 214.241 485.838 215.749 484.734 216.854C483.629 217.96 482.124 218.563 480.317 218.563H476.301V225.899H513.042V218.563H509.027C507.22 218.563 505.714 217.96 504.61 216.854C503.506 215.749 502.903 214.241 502.903 212.432V170.623C502.903 165.296 504.108 159.97 506.317 154.744C508.625 149.618 512.038 145.296 516.556 141.98C521.073 138.663 526.494 137.055 532.718 137.055C539.745 137.055 545.066 139.266 548.378 143.688C551.691 148.111 553.398 153.839 553.398 160.673V212.533C553.398 214.342 552.795 215.849 551.691 216.955C550.587 218.06 549.081 218.663 547.274 218.663H543.259V226H580V218.663H575.985C574.479 218.663 573.073 218.161 571.869 216.955Z"
                        fill="currentColor"
                      />
                      <path
                        d="M907.546 97.212C897.39 91.8041 886.039 89 873.792 89H826V96.3107H830.68C832.472 96.3107 834.065 97.0117 835.658 98.614C837.152 100.116 837.948 101.819 837.948 103.621V211.379C837.948 213.181 837.152 214.884 835.658 216.386C834.165 217.888 832.472 218.689 830.68 218.689H826V226H873.792C886.039 226 897.39 223.196 907.546 217.788C917.701 212.38 925.966 204.368 931.94 194.154C937.914 183.939 941 171.621 941 157.6C941 143.58 937.914 131.362 931.94 121.047C925.866 110.632 917.701 102.62 907.546 97.212ZM921.784 157.4C921.784 170.219 919.494 181.034 915.013 189.747C910.533 198.46 904.558 204.969 897.19 209.175C889.823 213.382 881.658 215.485 872.896 215.485H863.238C861.446 215.485 859.853 214.784 858.26 213.181C856.766 211.679 855.97 209.977 855.97 208.174V106.626C855.97 104.823 856.667 103.221 858.26 101.618C859.753 100.116 861.446 99.3151 863.238 99.3151H872.896C881.658 99.3151 889.823 101.418 897.19 105.624C904.558 109.83 910.533 116.34 915.013 125.053C919.494 133.765 921.784 144.581 921.784 157.4Z"
                        fill="currentColor"
                      />
                      <path
                        d="M1053.97 164.711C1049.55 159.603 1041.02 155.297 1030.99 152.993C1044.84 146.083 1051.96 136.369 1051.96 123.851C1051.96 117.041 1050.16 110.932 1046.54 105.724C1042.93 100.517 1037.81 96.3107 1031.29 93.4064C1024.76 90.5022 1017.13 89 1008.5 89H954.402V96.3107H958.718C960.524 96.3107 962.13 97.0117 963.736 98.614C965.242 100.116 966.045 101.819 966.045 103.621V211.379C966.045 213.181 965.242 214.884 963.736 216.386C962.231 217.888 960.524 218.689 958.718 218.689H954V226H1012.72C1021.65 226 1029.98 224.498 1037.51 221.493C1045.04 218.489 1051.06 214.083 1055.38 208.274C1059.79 202.466 1062 195.355 1062 187.143C1061.9 178.33 1059.29 170.92 1053.97 164.711ZM986.621 213.281C985.115 211.779 984.312 210.077 984.312 208.274V159.904H1012.22C1022.05 159.904 1029.58 162.407 1034.8 167.414C1040.02 172.422 1042.63 178.931 1042.63 186.943C1042.63 191.75 1041.42 196.457 1039.22 200.763C1036.91 205.17 1033.49 208.675 1028.88 211.379C1024.36 214.083 1018.74 215.485 1012.22 215.485H991.639C989.833 215.585 988.227 214.884 986.621 213.281ZM984.413 149.588V106.626C984.413 104.823 985.115 103.221 986.721 101.618C988.227 100.116 989.933 99.3151 991.74 99.3151H1004.99C1014.52 99.3151 1021.55 101.719 1025.97 106.325C1030.38 111.032 1032.59 117.041 1032.59 124.452C1032.59 132.063 1030.48 138.172 1026.37 142.779C1022.25 147.285 1016.03 149.588 1007.8 149.588H984.413Z"
                        fill="currentColor"
                      />
                      <path
                        d="M431.999 132.387C424.329 128.196 415.763 126 406.5 126C397.237 126 388.571 128.096 381.001 132.387C373.331 136.579 367.255 142.667 362.773 150.352C358.291 158.037 356 167.02 356 177C356 186.98 358.291 195.963 362.773 203.648C367.255 211.333 373.331 217.421 381.001 221.613C388.671 225.804 397.237 228 406.5 228C415.763 228 424.429 225.904 431.999 221.613C439.669 217.421 445.745 211.333 450.227 203.648C454.709 195.963 457 186.98 457 177C457 167.02 454.709 158.037 450.227 150.352C445.745 142.568 439.669 136.579 431.999 132.387ZM439.37 177C439.37 189.276 436.382 199.256 430.405 206.442C424.529 213.628 416.461 217.321 406.5 217.321C396.54 217.321 388.471 213.628 382.595 206.442C376.618 199.256 373.63 189.276 373.63 177C373.63 164.724 376.618 154.744 382.595 147.558C388.471 140.372 396.54 136.679 406.5 136.679C416.461 136.679 424.529 140.372 430.405 147.558C436.382 154.744 439.37 164.624 439.37 177Z"
                        fill="currentColor"
                      />
                      <path
                        d="M784.999 132.387C777.329 128.196 768.763 126 759.5 126C750.237 126 741.571 128.096 734.001 132.387C726.331 136.579 720.255 142.667 715.773 150.352C711.291 158.037 709 167.02 709 177C709 186.98 711.291 195.963 715.773 203.648C720.255 211.333 726.331 217.421 734.001 221.613C741.671 225.804 750.237 228 759.5 228C768.763 228 777.429 225.904 784.999 221.613C792.669 217.421 798.745 211.333 803.227 203.648C807.709 195.963 810 186.98 810 177C810 167.02 807.709 158.037 803.227 150.352C798.745 142.568 792.569 136.579 784.999 132.387ZM792.37 177C792.37 189.276 789.381 199.256 783.405 206.442C777.528 213.628 769.46 217.321 759.5 217.321C749.539 217.321 741.471 213.628 735.595 206.442C729.618 199.256 726.63 189.276 726.63 177C726.63 164.624 729.618 154.744 735.595 147.558C741.471 140.372 749.539 136.679 759.5 136.679C769.46 136.679 777.528 140.372 783.405 147.558C789.282 154.744 792.37 164.624 792.37 177Z"
                        fill="currentColor"
                      />
                      <path
                        d="M642.64 126C634.614 126 627.292 127.704 620.671 131.113C614.05 134.522 608.834 139.135 605.122 145.05C601.411 150.865 599.505 157.383 599.505 164.301C599.505 170.517 600.909 176.232 603.818 181.346C606.627 186.259 610.439 190.369 615.254 193.778L600.909 213.23C599.103 215.636 598.903 218.844 600.207 221.451C601.611 224.158 604.219 225.763 607.229 225.763H611.342C607.329 228.47 604.119 231.678 601.912 235.488C599.304 239.799 598 244.311 598 248.923C598 257.546 601.812 264.665 609.335 269.979C616.759 275.293 627.191 278 640.332 278C649.461 278 658.188 276.496 666.113 273.588C674.138 270.681 680.658 266.369 685.473 260.755C690.389 255.14 692.897 248.322 692.897 240.501C692.897 232.28 689.887 226.464 682.865 220.85C676.847 216.137 667.417 213.631 655.68 213.631H615.555C615.455 213.631 615.354 213.53 615.354 213.53C615.354 213.53 615.254 213.33 615.354 213.23L625.787 199.193C628.596 200.496 631.204 201.298 633.511 201.799C635.918 202.301 638.627 202.501 641.636 202.501C650.063 202.501 657.687 200.797 664.307 197.388C670.928 193.979 676.245 189.367 680.057 183.451C683.868 177.636 685.774 171.119 685.774 164.201C685.774 156.781 682.163 143.245 672.332 136.327C672.332 136.227 672.433 136.227 672.433 136.227L694 138.633V128.707H659.492C654.075 126.902 648.458 126 642.64 126ZM654.677 188.765C650.865 190.77 646.752 191.873 642.64 191.873C635.919 191.873 630 189.467 624.984 184.755C619.969 180.042 617.461 173.124 617.461 164.301C617.461 155.478 619.969 148.559 624.984 143.847C630 139.135 635.919 136.728 642.64 136.728C646.853 136.728 650.865 137.731 654.677 139.836C658.489 141.842 661.599 144.95 664.107 149.061C666.514 153.172 667.818 158.285 667.818 164.301C667.818 170.417 666.614 175.53 664.107 179.541C661.699 183.652 658.489 186.66 654.677 188.765ZM627.492 225.662H654.677C662.201 225.662 667.016 227.166 670.226 230.375C673.436 233.583 675.041 237.894 675.041 242.908C675.041 250.227 672.132 256.243 666.314 260.755C660.495 265.267 652.671 267.573 643.041 267.573C634.614 267.573 627.592 265.668 622.476 262.058C617.36 258.449 614.752 252.934 614.752 245.916C614.752 241.504 615.956 237.393 618.364 233.784C620.771 230.174 623.68 227.567 627.492 225.662Z"
                        fill="currentColor"
                      />
                      <path
                        d="M1082.35 224.327C1080.37 223.244 1078.88 221.669 1077.69 219.799C1076.6 217.831 1076 215.764 1076 213.5C1076 211.236 1076.6 209.071 1077.69 207.201C1078.78 205.232 1080.37 203.756 1082.35 202.673C1084.34 201.591 1086.52 201 1089 201C1091.48 201 1093.66 201.591 1095.65 202.673C1097.63 203.756 1099.12 205.331 1100.31 207.201C1101.4 209.169 1102 211.236 1102 213.5C1102 215.764 1101.4 217.929 1100.31 219.799C1099.22 221.768 1097.63 223.244 1095.65 224.327C1093.66 225.409 1091.48 226 1089 226C1086.62 226 1084.34 225.409 1082.35 224.327ZM1094.56 222.85C1096.24 221.965 1097.44 220.587 1098.43 219.012C1099.32 217.339 1099.82 215.469 1099.82 213.402C1099.82 211.335 1099.32 209.465 1098.43 207.791C1097.53 206.118 1096.24 204.839 1094.56 203.953C1092.87 203.067 1091.08 202.575 1089 202.575C1086.92 202.575 1085.13 203.067 1083.44 203.953C1081.76 204.839 1080.56 206.217 1079.57 207.791C1078.68 209.465 1078.18 211.335 1078.18 213.402C1078.18 215.469 1078.68 217.339 1079.57 219.012C1080.47 220.685 1081.76 221.965 1083.44 222.85C1085.13 223.736 1086.92 224.228 1089 224.228C1091.08 224.228 1092.97 223.835 1094.56 222.85ZM1083.64 219.406V218.52L1083.84 218.421H1084.44C1084.63 218.421 1084.83 218.323 1084.93 218.224C1085.13 218.028 1085.13 217.929 1085.13 217.732V208.579C1085.13 208.382 1085.03 208.185 1084.93 208.087C1084.73 207.89 1084.63 207.89 1084.44 207.89H1083.84L1083.64 207.791V206.906L1083.84 206.807H1089C1090.49 206.807 1091.58 207.102 1092.47 207.791C1093.37 208.48 1093.76 209.366 1093.76 210.547C1093.76 211.433 1093.47 212.319 1092.77 212.909C1092.08 213.598 1091.28 213.992 1090.29 214.091L1091.48 214.484L1093.76 218.126C1093.96 218.421 1094.16 218.52 1094.46 218.52H1095.05L1095.15 218.618V219.504L1095.05 219.602H1091.98L1091.78 219.504L1088.6 214.189H1087.81V217.732C1087.81 217.929 1087.91 218.126 1088.01 218.224C1088.21 218.421 1088.31 218.421 1088.5 218.421H1089.1L1089.3 218.52V219.406L1089.1 219.504H1083.84L1083.64 219.406ZM1088.7 213.008C1089.5 213.008 1090.19 212.811 1090.59 212.319C1090.98 211.925 1091.28 211.236 1091.28 210.449C1091.28 209.661 1091.08 209.071 1090.69 208.579C1090.29 208.087 1089.69 207.89 1089 207.89H1088.6C1088.4 207.89 1088.21 207.988 1088.11 208.087C1087.91 208.283 1087.91 208.382 1087.91 208.579V213.008H1088.7Z"
                        fill="currentColor"
                      />
                    </svg></div>
                    <div className=""><CircularProgressBar  percentage={project.mongopercentage} />
                  </div></div>
                )}

                {category == "Kotlin" && (

                  <div className="flex flex-col items-center">
                    
                  <div className="min-h-[150px] flex items-center justify-center">
                    <svg
                      width="98"
                      height="22"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M43.314 1.067h-4.031L30.5 10.422V1.098H27.27v20.273H30.5v-9.82l8.814 9.82h4.177l-9.397-10.484 9.22-9.82Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M54.303 7.186c-1.153-.66-2.45-.994-3.901-.994-1.478 0-2.803.33-3.973.994a7.042 7.042 0 0 0-2.735 2.758c-.65 1.179-.976 2.515-.976 4.01 0 1.494.325 2.835.972 4.01a6.967 6.967 0 0 0 2.716 2.758c1.166.659 2.486.993 3.964.993 1.46 0 2.766-.33 3.923-.993a6.941 6.941 0 0 0 2.694-2.759c.642-1.178.963-2.515.963-4.01 0-1.494-.32-2.83-.963-4.009a6.949 6.949 0 0 0-2.684-2.758Zm-.204 9.328c-.357.74-.859 1.314-1.505 1.73-.646.415-1.392.622-2.233.622-.85 0-1.604-.207-2.26-.623a4.184 4.184 0 0 1-1.528-1.73c-.361-.74-.542-1.589-.542-2.555 0-.966.185-1.815.551-2.555a4.177 4.177 0 0 1 1.537-1.73c.656-.415 1.415-.623 2.278-.623.832 0 1.573.208 2.22.623a4.125 4.125 0 0 1 1.5 1.73c.353.74.529 1.59.529 2.555-.009.962-.19 1.815-.547 2.556ZM64.555 2.836h-3.132v2.52c0 .397-.095.695-.29.889-.194.198-.492.298-.899.298h-1.537v2.664h2.667v7.978c0 .83.167 1.562.506 2.194a3.591 3.591 0 0 0 1.442 1.472c.624.348 1.36.52 2.21.52h2.391v-2.782h-1.798c-.466 0-.841-.163-1.13-.483-.29-.325-.434-.75-.434-1.282V9.207h3.448V6.543h-3.448V2.836h.004ZM73.68.286h-3.186V21.37h3.187V.286ZM80.498.312H77.28v3.273h3.218V.312ZM80.466 6.544H77.28V21.37h3.186V6.544ZM96.67 8.99a4.969 4.969 0 0 0-1.899-2.054c-.818-.492-1.772-.74-2.866-.74-1.161 0-2.178.284-3.05.848-.697.447-1.257 1.052-1.7 1.797l-.018-2.298H84.09V21.37h3.191v-8.298c0-.8.154-1.513.457-2.136a3.39 3.39 0 0 1 1.293-1.45c.556-.342 1.202-.514 1.948-.514.669 0 1.238.14 1.717.42.48.28.841.682 1.085 1.201.249.52.37 1.142.37 1.87v8.907h3.192v-9.355c0-1.138-.226-2.149-.674-3.025Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M20 21H0V1h20L9.793 10.855 20 21Z"
                        fill="url(#kotlin-logo-large_svg__a)"
                      ></path>
                      <defs>
                        <radialGradient
                          id="kotlin-logo-large_svg__a"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(19.335 1.822) scale(22.9097)"
                        >
                          <stop offset="0.003" stop-color="#EF4857"></stop>
                          <stop offset="0.469" stop-color="#D211EC"></stop>
                          <stop offset="1" stop-color="#7F52FF"></stop>
                        </radialGradient>
                      </defs>
                    </svg></div>
                    <div className=""><CircularProgressBar  percentage={project.kotlinpercentage} />
                  </div></div>
                )}
              </div>
            ))}
          </div>
        
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fadeInLeft mt-8 md:mt-10 lg:mt-12">
          Any Suggestions on this project?
        </div>
        <div></div>
      </div>
    </main>
  );
}
