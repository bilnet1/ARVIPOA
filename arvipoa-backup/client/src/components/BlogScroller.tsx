const blogs = [
  {
    title: "How to Register Property Online",
    thumbnail: "https://via.placeholder.com/200x120?text=Tutorial+1",
  },
  {
    title: "Benefits of River Barricade Monitoring",
    thumbnail: "https://via.placeholder.com/200x120?text=River+Safety",
  },
  {
    title: "Virtual Tours: A Game Changer",
    thumbnail: "https://via.placeholder.com/200x120?text=Virtual+Tour",
  },
  {
    title: "Understanding Property Ownership in Ghana",
    thumbnail: "https://via.placeholder.com/200x120?text=Ownership+Guide",
  },
];

export default function BlogScroller() {
  return (
    <section className="bg-[#0c1c1a] py-10 px-4 text-white">
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-4 text-center">Insights & Tutorials</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1">
        {blogs.map((blog, index) => (
          <div key={index} className="min-w-[200px] bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-all duration-300 border border-gray-700">
            <img src={blog.thumbnail} alt={blog.title} className="w-full h-32 object-cover" />
            <div className="p-3">
              <p className="text-sm font-semibold">{blog.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
