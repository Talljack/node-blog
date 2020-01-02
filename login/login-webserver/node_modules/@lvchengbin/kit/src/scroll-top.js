export default () => window.scrollY || window.pageYOffset || document.body.scrollTop + ( document.documentElement && document.documentElement.scrollTop || 0 );
