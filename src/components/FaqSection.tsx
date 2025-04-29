import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold">What are the benefits of taking supplements?</AccordionTrigger>
          <AccordionContent>Supplements can help fill nutritional gaps in your diet, support overall health, and enhance
            specific bodily functions depending on your needs.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold">How should I store my supplements?</AccordionTrigger>
          <AccordionContent>Store supplements in a cool, dry place away from direct sunlight. Most supplements should be
            kept at room temperature unless specified otherwise.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold">Are your supplements third-party tested?</AccordionTrigger>
          <AccordionContent>Yes, all our supplements undergo rigorous third-party testing to ensure quality, purity, and
            potency.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-semibold">When is the best time to take supplements?</AccordionTrigger>
          <AccordionContent>The optimal time varies by supplement. Some are better taken with meals, while others work
            best on an empty stomach. Specific timing recommendations are listed on each product.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="font-semibold">Can I take multiple supplements together?</AccordionTrigger>
          <AccordionContent>While many supplements can be taken together, some may interact with each other. We
            recommend consulting with a healthcare provider for personalized advice.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="font-semibold">What is your return policy?</AccordionTrigger>
          <AccordionContent>We offer a 30-day money-back guarantee on unopened products. Opened products may be eligible
            for partial refunds on a case-by-case basis.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger className="font-semibold">Are your supplements suitable for
            vegetarians/vegans?</AccordionTrigger>
          <AccordionContent>We clearly label all products suitable for vegetarians and vegans. Please check individual
            product descriptions for specific dietary information.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger className="font-semibold">How long do supplements typically last?</AccordionTrigger>
          <AccordionContent>Most supplements have a shelf life of 2-3 years when stored properly. Check the expiration
            date on the package for specific information.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger className="font-semibold">Do you ship internationally?</AccordionTrigger>
          <AccordionContent>Yes, we ship to most countries worldwide. Shipping times and costs vary by
            location.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger className="font-semibold">Are there any side effects to taking
            supplements?</AccordionTrigger>
          <AccordionContent>While supplements are generally safe, some people may experience side effects. Always read
            labels carefully and consult with a healthcare provider before starting any supplement
            regimen.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-11">
          <AccordionTrigger className="font-semibold">How do you ensure product quality?</AccordionTrigger>
          <AccordionContent>We maintain strict quality control measures, including GMP certification, third-party
            testing, and regular quality audits.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-12">
          <AccordionTrigger className="font-semibold">What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>We accept all major credit cards, PayPal, and various other digital payment
            methods.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-13">
          <AccordionTrigger className="font-semibold">How long does shipping typically take?</AccordionTrigger>
          <AccordionContent>Domestic orders usually arrive within 3-5 business days. International shipping can take
            7-14 business days.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-14">
          <AccordionTrigger className="font-semibold">Do you offer bulk discounts?</AccordionTrigger>
          <AccordionContent>Yes, we offer discounts on bulk orders. Contact our customer service team for specific
            pricing.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-15">
          <AccordionTrigger className="font-semibold">Are your supplements FDA approved?</AccordionTrigger>
          <AccordionContent>The FDA doesn't approve dietary supplements, but our products are manufactured in
            FDA-registered facilities following strict quality guidelines.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-16">
          <AccordionTrigger className="font-semibold">Can I track my order?</AccordionTrigger>
          <AccordionContent>Yes, you'll receive a tracking number via email once your order ships.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-17">
          <AccordionTrigger className="font-semibold">Do you offer subscription services?</AccordionTrigger>
          <AccordionContent>Yes, we offer subscription options with regular delivery intervals and special
            discounts.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-18">
          <AccordionTrigger className="font-semibold">What if I receive damaged products?</AccordionTrigger>
          <AccordionContent>Contact our customer service immediately with photos of the damaged items, and we'll arrange
            a replacement or refund.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-19">
          <AccordionTrigger className="font-semibold">Are your supplements tested for allergens?</AccordionTrigger>
          <AccordionContent>Yes, our products are tested for common allergens, and all ingredients are clearly listed on
            the label.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-20">
          <AccordionTrigger className="font-semibold">How can I contact customer support?</AccordionTrigger>
          <AccordionContent>Our customer support team is available via email, phone, or live chat during business
            hours.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}