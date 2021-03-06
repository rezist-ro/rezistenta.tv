const paths = {};

paths.source = {};
paths.source.root = 'src';
paths.source.stylesheets = `${paths.source.root}/stylesheets`;
paths.source.javascripts = `${paths.source.root}/javascripts`;

paths.dest = {};
paths.dest.root = 'assets';
paths.dest.stylesheets = `${paths.dest.root}/css`;
paths.dest.javascripts = `${paths.dest.root}/js`;

paths.nodeModules = {};
paths.nodeModules.root = 'node_modules';

module.exports = paths;
