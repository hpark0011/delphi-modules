import Image from "next/image";

interface ProfileImageProps {
  imageUrl: string | null;
  alt: string;
}

export function ProfileImage({ imageUrl, alt }: ProfileImageProps) {
  if (!imageUrl) return null;

  return (
    <div
      className="profile-image-squircle relative size-36 overflow-hidden"
      style={{
        boxShadow: "var(--profile-shadow-image)",
      }}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover"
        sizes="144px"
        priority
      />
      {/* Inset shadow overlay - always on top */}
      <div
        className="profile-image-squircle absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "var(--profile-shadow-image-inset)",
        }}
      />
    </div>
  );
}
