import SurveyCard, { SurveyTypeCard } from "@/components/SurveyCard";
import { SanityLive } from "@/sanity/lib/live";

export default function Home(){

  const posts: SurveyTypeCard[] = [
    {
      _id: "1",
      _type: "survey",
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      _rev: "1",
      title: "Customer Feedback Survey",
      category: "Business",
      description: "Help us improve our product by filling out this survey!",
    },
  ];
    return (
        <>
        <section className="pink_container">
        <h1 className="heading">
           <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Complete Surveys, Help Companies make better Product.
        </p>
        </section>
        <section className="section_container">
        <p className="text-30-semibold">
           All Surveys
        </p>
        </section>
        <section className="section_container">

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: SurveyTypeCard) => (
              <SurveyCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
        )
}