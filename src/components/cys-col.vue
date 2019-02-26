<script>
export default {
    name: 'CysCol',
    componentName: 'CysCol',
    props: {
        span: {
            type: Number,
            default: 24
        },
        tag: {
            type: String,
            default: 'div'
        },
        offset: Number,
        pull: Number,
        push: Number,
        xs: [Number, Object],
        sm: [Number, Object],
        md: [Number, Object],
        lg: [Number, Object],
        xl: [Number, Object]
    },
    computed: {
        gutter() {
            let parent = this.$parent;
            while (parent && parent.$options.componentName !== 'CysRow') {
                parent = parent.$parent;
            }
            return parent ? parent.gutter : 0;
        }
    },
    render(createElement) {
        let classList = [];
        let style = {};
        if (this.gutter) {
            style.paddingLeft = this.gutter / 2 + 'px';
            style.paddingRight = style.paddingLeft;
        }
        ['span', 'offset', 'pull', 'push'].forEach(prop => {
            if (this[prop] || this[prop] === 0) {
                let clazz = prop !== 'span' ? `cys-col-${prop}-${this[prop]}` : `cys-col-${this[prop]}`
                classList.push(clazz);
            }
        });

        ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
            if (typeof this[size] === 'number') {
                classList.push(`cys-col-${size}-${this[size]}`);
                return;
            }
            if (typeof this[size] === 'object') {
                let props = this[size];
                Object.keys(props).forEach(prop => {
                    let clazz = prop !== 'span' ? `cys-col-${size}-${prop}-${props[prop]}` : `cys-col-${size}-${props[prop]}`;
                    classList.push(clazz);
                });
            }
        });

        return createElement(this.tag, {
            class: ['cys-col', classList],
            style
        }, this.$slots.default);
    }
};
</script>
<style lang="stylus">
$--col-columns = 24;

[class*='cys-col-'] {
    float: left;
    box-sizing: border-box;
}

.cys-col-0 {
    display: none;
}

for column in 1 .. $--col-columns {
    .cys-col-{column} {
        width: (1 / 24 * column * 100) * 1%;
    }

    .cys-col-offset-{column} {
        margin-left: (1 / 24 * column * 100) * 1%;
    }

    .cys-col-pull-{column} {
        position: relative;
        right: (1 / 24 * column * 100) * 1%;
    }

    .cys-col-pucys-{column} {
        position: relative;
        left: (1 / 24 * column * 100) * 1%;
    }
}

@media only screen and (max-width: 768px) {
    for column in 1 .. $--col-columns {
        .el-col-xs-0 {
            display: none;
        }

        .cys-col-xs-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-offset-xs-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pull-xs-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pucys-xs-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}

@media only screen and (min-width: 768px) {
    for column in 1 .. $--col-columns {
        .el-col-sm-0 {
            display: none;
        }

        .cys-col-sm-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-offset-sm-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pull-sm-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pucys-sm-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}

@media only screen and (min-width: 992px) {
    for column in 1 .. $--col-columns {
        .el-col-md-0 {
            display: none;
        }

        .cys-col-md-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-offset-md-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pull-md-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pucys-md-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}

@media only screen and (min-width: 1200px) {
    for column in 1 .. $--col-columns {
        .el-col-lg-0 {
            display: none;
        }

        .cys-col-lg-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-offset-lg-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pull-lg-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pucys-lg-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}

@media only screen and (min-width: 1920px) {
    for column in 1 .. $--col-columns {
        .el-col-xl-0 {
            display: none;
        }

        .cys-col-xl-{column} {
            width: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-offset-xl-{column} {
            margin-left: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pull-xl-{column} {
            position: relative;
            right: (1 / 24 * column * 100) * 1%;
        }

        .cys-col-pucys-xl-{column} {
            position: relative;
            left: (1 / 24 * column * 100) * 1%;
        }
    }
}
</style>
