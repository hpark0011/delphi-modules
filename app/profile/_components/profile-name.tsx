interface ProfileNameProps {
  name: string;
}

export function ProfileName({ name }: ProfileNameProps) {
  return (
    <h1 className="text-[52px] mt-6 mb-3 font-semibold text-sand-12 leading-[1.1] -ml-0.5">
      {name}
    </h1>
  );
}
