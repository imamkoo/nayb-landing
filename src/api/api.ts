import { createClient } from "@supabase/supabase-js";
import { BlogPost, Lead, Location } from "../utils/contentTypes";
import { Database } from "./Database";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);
const getBlogPosts = async () => {
  const { data, error } = await supabase.from("BlogPosts").select();

  //   throw new Error("some error occurred...");

  if (error) {
    throw new Error(
      `ERROR: Database returned error when fetching blog posts: ${error.message}`
    );
  }

  const blogPosts: BlogPost[] = data.map((post) => {
    return {
      id: post.id,
      img: post.img_url,
      alt: post.img_alt,
      date: post.date_created,
      title: post.article_title,
      summary: post.article_summary,
    };
  });

  return blogPosts;
};

const getLocations = async () => {
  const { data, error } = await supabase.from("Locations").select();

  //   throw new Error("some error occurred...");

  if (error) {
    throw new Error(
      `ERROR: Database returned error when fetching locations: ${error.message}`
    );
  }

  const locations: Location[] = data.map((location) => {
    return {
      id: location.id,
      img: location.img_url,
      alt: location.img_alt,
      rating: location.rating,
      title: location.title,
      location: location.location,
      pricePerPerson: location.price_per_person,
    };
  });

  return locations;
};

const insertLead = async (lead: Lead) => {
  const { error } = await supabase.from("Leads").insert([
    {
      created_at: lead.createdAt,
      full_name: lead.fullName,
      email_address: lead.emailAddress,
    },
  ]);

  if (error) {
    throw new Error(
      `ERROR: Database returned an error when inserting lead data: ${error.message}`
    );
  }
};

export default { getBlogPosts, getLocations, insertLead };
