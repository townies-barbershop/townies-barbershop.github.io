import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'css': 'css',
    'img': 'img',
    'js': 'js',
  });
  eleventyConfig.addGlobalData('site_title', 'Townies Barbershop');
  eleventyConfig.addGlobalData('site_url', 'https://towniesbarbershop.com');
  eleventyConfig.setIncludesDirectory('_includes');
  eleventyConfig.setLayoutsDirectory('_layouts');
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
};
