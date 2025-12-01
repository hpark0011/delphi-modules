interface ProfileBioProps {
  bio: string | null;
}

export function ProfileBio({ bio }: ProfileBioProps) {
  if (!bio) return null;

  const paragraphs = bio.split("\n\n");

  return (
    <section className='pb-5'>
      <div className='text-text-primary text-[19px] relative z-10 font-[440]'>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className='pb-4 last:pb-0'>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
