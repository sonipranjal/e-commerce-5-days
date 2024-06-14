import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mockData = [
  {
    id: 1,
    name: "Pasta - Linguini, Dry",
    description: "Etiam vel augue.",
    imageUrl: "http://dummyimage.com/180x100.png/cc0000/ffffff",
    quantityAvailable: 64,
    slug: "something-xzyx",
  },
  {
    id: 2,
    name: "Potatoes - Mini Red",
    description:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    imageUrl: "http://dummyimage.com/109x100.png/dddddd/000000",
    quantityAvailable: 32,
    slug: "something-2",
  },
  {
    id: 3,
    name: "Cups 10oz Trans",
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.",
    imageUrl: "http://dummyimage.com/194x100.png/dddddd/000000",
    quantityAvailable: 40,
    slug: "something-3",
  },
  {
    id: 4,
    name: "Wine - White Cab Sauv.on",
    description:
      "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.",
    imageUrl: "http://dummyimage.com/125x100.png/dddddd/000000",
    quantityAvailable: 33,
    slug: "something-4",
  },
  {
    id: 5,
    name: "Flower - Commercial Bronze",
    description:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi.",
    imageUrl: "http://dummyimage.com/103x100.png/dddddd/000000",
    quantityAvailable: 82,
    slug: "something-123",
  },
];
