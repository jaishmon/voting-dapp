export default function Dashboard() {
  const projects = [
    {
      title: "Decentralized Voting",
      desc: "Blockchain-based voting system",
      link: "/voting",
    },
    {
      title: "Certificate Verifier",
      desc: "Verify certificates on blockchain",
      link: "/certificate",
    },
    {
      title: "Rental Agreement",
      desc: "Smart contract rental system",
      link: "/rental",
    },
    {
      title: "Token System",
      desc: "ERC20 Token Platform",
      link: "/token",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="text-center mb-20">

          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Blockchain Universe
          </h1>

          <p className="text-gray-400 text-lg">
            My Projects
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-[#181824] rounded-2xl p-7
              border border-gray-800
              hover:border-purple-500/50
              hover:shadow-[0_0_35px_rgba(124,58,237,0.35)]
              transition-all duration-300
              hover:-translate-y-1"
            >

              <h3 className="text-xl font-semibold mb-2">
                {p.title}
              </h3>

              <p className="text-gray-400 text-sm mb-6">
                {p.desc}
              </p>

              <a
                href={p.link}
                className="text-purple-500 hover:text-purple-400
                text-sm font-medium no-underline"
              >
                Launch →
              </a>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
