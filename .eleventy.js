import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'css': 'css',
    'img': 'img',
    'js': 'js',
  });
  eleventyConfig.addGlobalData('site_title', 'Townies Barbershop');
  eleventyConfig.addGlobalData('site_url', 'https://towniesbarbershop.com');
  eleventyConfig.addGlobalData('description', 'Townies Barbershop is a classic barbershop in Orlando, FL. Book an appointment with one of our barbers, or walk in. Open Monday through Saturday.');
  eleventyConfig.setIncludesDirectory('_includes');
  eleventyConfig.setLayoutsDirectory('_layouts');
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
};
