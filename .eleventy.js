const CleanCSS = require("clean-css");
const { minify } = require("terser");
const markdownIt = require("markdown-it");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes, loading, aspectClass) {
    let metadata = await Image(src, {
        outputDir: "./dist/img/",
        urlPath: "/img/",
        widths: [1600],
        formats: ["jpeg"],
        sharpOptions: {
            animated: true
        },
        cacheOptions: {
            duration: "3d",
            directory: ".cache",
            removeUrlQueryParams: true,
        },
    });
    
    let imageAttributes = {
      alt,
      sizes,
      loading,
      class: aspectClass,
      decoding: "async",
    };
    
    return Image.generateHTML(metadata, imageAttributes);
}


module.exports = function (eleventyConfig) {

    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    // Passthrough copy
    eleventyConfig.addPassthroughCopy('concreteplatform');
    eleventyConfig.addPassthroughCopy('src/assets');
    //eleventyConfig.addPassthroughCopy('src/404.html');

    // Layout alias
    eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('subpage', 'layouts/subpage.njk');
    eleventyConfig.addLayoutAlias('index', 'layouts/index.njk');

    // extract year from date
    eleventyConfig.addFilter("yearFromDate", function (date) {
        // convert airtable datestring to date object
        dateObj = new Date(date);
        const year = dateObj.getFullYear();
        return year;
    });
    // extract timestamp from date 
    eleventyConfig.addFilter("timestamp", function(date){
        // convert airtable datestring to date object
        dateObj = new Date(date);
        const timestamp = dateObj.getTime();
        return timestamp;
    });


    // CSS minify inline filter
    eleventyConfig.addFilter("cssmin", function (code) {
        return new CleanCSS({}).minify(code).styles;
    });

    // JS
    // const { minify } = require("terser");
    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
    ) {
    try {
        const minified = await minify(code);
        callback(null, minified.code);
    } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
    }
    });

    // markdown filter
    // options: https://github.com/markdown-it/markdown-it#init-with-presets-and-options
    const md = new markdownIt({
        html: true,
        breaks: false,
    });
    eleventyConfig.addFilter("markdown", (content) => {
        return md.render(content);
    });

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addLiquidShortcode("image", imageShortcode);
    eleventyConfig.addJavaScriptFunction("image", imageShortcode);

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "dist",
        },
        templateFormats: [
            "njk",
            "liquid",
            "md",
            "html"
        ],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        passthroughFileCopy: true
    };
};