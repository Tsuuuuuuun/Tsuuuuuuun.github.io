import Timeline from "./components/timeline";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-[calc(100vh-4rem)] ">
        <div className="hero-content text-center px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Hayato Tsumura
            </h1>
            <p className="py-6 text-base sm:text-lg max-w-xl mx-auto">
              Engineer.
            </p>
          </div>
        </div>
      </section>
      <Timeline/>
    </div>
  );
}
