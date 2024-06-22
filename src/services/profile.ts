import { Profile } from "@/types/profile";

const save = async (profiles: Profile[]) => {
  try {
    const res = await fetch('https://dummyjson.com/posts/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profiles)
    });
    if (!res.ok) {
      throw new Error(`Failed to save profiles ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const ProfileService = {
  save,
};

export default ProfileService;