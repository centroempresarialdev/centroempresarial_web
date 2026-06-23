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
      <h1 className="text-4xl font-extrabold leading-tight text-corporate md:text-6xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
    </ScrollReveal>
  );
};

export default PageIntro;
