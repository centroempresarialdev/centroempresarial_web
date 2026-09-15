import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/ScrollReveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

const PageIntro = ({ eyebrow, title, description, align = "left" }: PageIntroProps) => {
  return (
    <ScrollReveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Badge variant="outline" className="mb-4 text-primary">
        {eyebrow}
      </Badge>
      <h1 className="text-3xl font-extrabold leading-tight text-corporate sm:text-4xl md:text-6xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8">{description}</p>
    </ScrollReveal>
  );
};

export default PageIntro;
