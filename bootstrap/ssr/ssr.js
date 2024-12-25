import { ref, shallowRef, defineComponent, markRaw, h as h$1, createSSRApp, reactive, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, withModifiers, openBlock, createBlock, createTextVNode, useSSRContext, useAttrs, getCurrentInstance, computed, onMounted, onBeforeUnmount, nextTick, toRef, Teleport, withDirectives, createElementBlock, withKeys, createCommentVNode, Transition, toHandlers, normalizeClass, normalizeStyle, vShow, renderSlot, normalizeProps, guardReactiveProps, createElementVNode, inject, shallowReactive, Fragment, renderList, resolveDynamicComponent, createSlots, vModelText, TransitionGroup, toRefs, resolveDirective, readonly } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderSlotInner, ssrRenderStyle, ssrRenderClass, ssrGetDirectiveProps, ssrIncludeBooleanAttr, ssrGetDynamicModelProps } from "vue/server-renderer";
import { createHeadManager, router, mergeDataIntoQueryString, shouldIntercept, setupProgress } from "@inertiajs/core";
import g$1 from "lodash.clonedeep";
import R$1 from "lodash.isequal";
import { defineStore, createPinia } from "pinia";
import axios$1 from "axios";
import { useEventListener } from "@vueuse/core";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { Swiper, SwiperSlide } from "swiper/vue";
import VueSelect from "vue3-select-component";
import createServer from "@inertiajs/core/server";
import { renderToString } from "@vue/server-renderer";
var M = { created() {
  if (!this.$options.remember) return;
  Array.isArray(this.$options.remember) && (this.$options.remember = { data: this.$options.remember }), typeof this.$options.remember == "string" && (this.$options.remember = { data: [this.$options.remember] }), typeof this.$options.remember.data == "string" && (this.$options.remember = { data: [this.$options.remember.data] });
  let e2 = this.$options.remember.key instanceof Function ? this.$options.remember.key.call(this) : this.$options.remember.key, o2 = router.restore(e2), n2 = this.$options.remember.data.filter((t4) => !(this[t4] !== null && typeof this[t4] == "object" && this[t4].__rememberable === false)), p2 = (t4) => this[t4] !== null && typeof this[t4] == "object" && typeof this[t4].__remember == "function" && typeof this[t4].__restore == "function";
  n2.forEach((t4) => {
    this[t4] !== void 0 && o2 !== void 0 && o2[t4] !== void 0 && (p2(t4) ? this[t4].__restore(o2[t4]) : this[t4] = o2[t4]), this.$watch(t4, () => {
      router.remember(n2.reduce((a2, l2) => ({ ...a2, [l2]: g$1(p2(l2) ? this[l2].__remember() : this[l2]) }), {}), e2);
    }, { immediate: true, deep: true });
  });
} }, D = M;
function T$1(e2, o2) {
  let n2 = typeof e2 == "string" ? e2 : null, p2 = typeof e2 == "string" ? o2 : e2, t4 = n2 ? router.restore(n2) : null, a2 = typeof p2 == "object" ? g$1(p2) : g$1(p2()), l2 = null, f2 = null, h2 = (r2) => r2, y2 = reactive({ ...t4 ? t4.data : g$1(a2), isDirty: false, errors: t4 ? t4.errors : {}, hasErrors: false, processing: false, progress: null, wasSuccessful: false, recentlySuccessful: false, data() {
    return Object.keys(a2).reduce((r2, s2) => (r2[s2] = this[s2], r2), {});
  }, transform(r2) {
    return h2 = r2, this;
  }, defaults(r2, s2) {
    if (typeof p2 == "function") throw new Error("You cannot call `defaults()` when using a function to define your form data.");
    return typeof r2 > "u" ? a2 = this.data() : a2 = Object.assign({}, g$1(a2), typeof r2 == "string" ? { [r2]: s2 } : r2), this;
  }, reset(...r2) {
    let s2 = typeof p2 == "object" ? g$1(a2) : g$1(p2()), i2 = g$1(s2);
    return r2.length === 0 ? (a2 = i2, Object.assign(this, s2)) : Object.keys(s2).filter((m2) => r2.includes(m2)).forEach((m2) => {
      a2[m2] = i2[m2], this[m2] = s2[m2];
    }), this;
  }, setError(r2, s2) {
    return Object.assign(this.errors, typeof r2 == "string" ? { [r2]: s2 } : r2), this.hasErrors = Object.keys(this.errors).length > 0, this;
  }, clearErrors(...r2) {
    return this.errors = Object.keys(this.errors).reduce((s2, i2) => ({ ...s2, ...r2.length > 0 && !r2.includes(i2) ? { [i2]: this.errors[i2] } : {} }), {}), this.hasErrors = Object.keys(this.errors).length > 0, this;
  }, submit(r2, s2, i2 = {}) {
    let m2 = h2(this.data()), b2 = { ...i2, onCancelToken: (u2) => {
      if (l2 = u2, i2.onCancelToken) return i2.onCancelToken(u2);
    }, onBefore: (u2) => {
      if (this.wasSuccessful = false, this.recentlySuccessful = false, clearTimeout(f2), i2.onBefore) return i2.onBefore(u2);
    }, onStart: (u2) => {
      if (this.processing = true, i2.onStart) return i2.onStart(u2);
    }, onProgress: (u2) => {
      if (this.progress = u2, i2.onProgress) return i2.onProgress(u2);
    }, onSuccess: async (u2) => {
      this.processing = false, this.progress = null, this.clearErrors(), this.wasSuccessful = true, this.recentlySuccessful = true, f2 = setTimeout(() => this.recentlySuccessful = false, 2e3);
      let N2 = i2.onSuccess ? await i2.onSuccess(u2) : null;
      return a2 = g$1(this.data()), this.isDirty = false, N2;
    }, onError: (u2) => {
      if (this.processing = false, this.progress = null, this.clearErrors().setError(u2), i2.onError) return i2.onError(u2);
    }, onCancel: () => {
      if (this.processing = false, this.progress = null, i2.onCancel) return i2.onCancel();
    }, onFinish: (u2) => {
      if (this.processing = false, this.progress = null, l2 = null, i2.onFinish) return i2.onFinish(u2);
    } };
    r2 === "delete" ? router.delete(s2, { ...b2, data: m2 }) : router[r2](s2, m2, b2);
  }, get(r2, s2) {
    this.submit("get", r2, s2);
  }, post(r2, s2) {
    this.submit("post", r2, s2);
  }, put(r2, s2) {
    this.submit("put", r2, s2);
  }, patch(r2, s2) {
    this.submit("patch", r2, s2);
  }, delete(r2, s2) {
    this.submit("delete", r2, s2);
  }, cancel() {
    l2 && l2.cancel();
  }, __rememberable: n2 === null, __remember() {
    return { data: this.data(), errors: this.errors };
  }, __restore(r2) {
    Object.assign(this, r2.data), this.setError(r2.errors);
  } });
  return watch(y2, (r2) => {
    y2.isDirty = !R$1(y2.data(), a2), n2 && router.remember(g$1(r2.__remember()), n2);
  }, { immediate: true, deep: true }), y2;
}
var c$1 = ref(null), d$1 = ref(null), x$1 = shallowRef(null), F = ref(null), k$1 = null, W$1 = defineComponent({ name: "Inertia", props: { initialPage: { type: Object, required: true }, initialComponent: { type: Object, required: false }, resolveComponent: { type: Function, required: false }, titleCallback: { type: Function, required: false, default: (e2) => e2 }, onHeadUpdate: { type: Function, required: false, default: () => () => {
} } }, setup({ initialPage: e2, initialComponent: o2, resolveComponent: n2, titleCallback: p2, onHeadUpdate: t4 }) {
  c$1.value = o2 ? markRaw(o2) : null, d$1.value = e2, F.value = null;
  let a2 = typeof window > "u";
  return k$1 = createHeadManager(a2, p2, t4), a2 || (router.init({ initialPage: e2, resolveComponent: n2, swapComponent: async (l2) => {
    c$1.value = markRaw(l2.component), d$1.value = l2.page, F.value = l2.preserveState ? F.value : Date.now();
  } }), router.on("navigate", () => k$1.forceUpdate())), () => {
    if (c$1.value) {
      c$1.value.inheritAttrs = !!c$1.value.inheritAttrs;
      let l2 = h$1(c$1.value, { ...d$1.value.props, key: F.value });
      return x$1.value && (c$1.value.layout = x$1.value, x$1.value = null), c$1.value.layout ? typeof c$1.value.layout == "function" ? c$1.value.layout(h$1, l2) : (Array.isArray(c$1.value.layout) ? c$1.value.layout : [c$1.value.layout]).concat(l2).reverse().reduce((f2, h2) => (h2.inheritAttrs = !!h2.inheritAttrs, h$1(h2, { ...d$1.value.props }, () => f2))) : l2;
    }
  };
} }), E$1 = W$1, $$2 = { install(e2) {
  router.form = T$1, Object.defineProperty(e2.config.globalProperties, "$inertia", { get: () => router }), Object.defineProperty(e2.config.globalProperties, "$page", { get: () => d$1.value }), Object.defineProperty(e2.config.globalProperties, "$headManager", { get: () => k$1 }), e2.mixin(D);
} };
async function j$2({ id: e2 = "app", resolve: o2, setup: n2, title: p2, progress: t4 = {}, page: a2, render: l2 }) {
  let f2 = typeof window > "u", h2 = f2 ? null : document.getElementById(e2), y2 = a2 || JSON.parse(h2.dataset.page), r2 = (m2) => Promise.resolve(o2(m2)).then((b2) => b2.default || b2), s2 = [], i2 = await r2(y2.component).then((m2) => n2({ el: h2, App: E$1, props: { initialPage: y2, initialComponent: m2, resolveComponent: r2, titleCallback: p2, onHeadUpdate: f2 ? (b2) => s2 = b2 : null }, plugin: $$2 }));
  if (!f2 && t4 && setupProgress(t4), f2) {
    let m2 = await l2(createSSRApp({ render: () => h$1("div", { id: e2, "data-page": JSON.stringify(y2), innerHTML: i2 ? l2(i2) : "" }) }));
    return { head: s2, body: m2 };
  }
}
var X$1 = defineComponent({ props: { title: { type: String, required: false } }, data() {
  return { provider: this.$headManager.createProvider() };
}, beforeUnmount() {
  this.provider.disconnect();
}, methods: { isUnaryTag(e2) {
  return ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"].indexOf(e2.type) > -1;
}, renderTagStart(e2) {
  e2.props = e2.props || {}, e2.props.inertia = e2.props["head-key"] !== void 0 ? e2.props["head-key"] : "";
  let o2 = Object.keys(e2.props).reduce((n2, p2) => {
    let t4 = e2.props[p2];
    return ["key", "head-key"].includes(p2) ? n2 : t4 === "" ? n2 + ` ${p2}` : n2 + ` ${p2}="${t4}"`;
  }, "");
  return `<${e2.type}${o2}>`;
}, renderTagChildren(e2) {
  return typeof e2.children == "string" ? e2.children : e2.children.reduce((o2, n2) => o2 + this.renderTag(n2), "");
}, isFunctionNode(e2) {
  return typeof e2.type == "function";
}, isComponentNode(e2) {
  return typeof e2.type == "object";
}, isCommentNode(e2) {
  return /(comment|cmt)/i.test(e2.type.toString());
}, isFragmentNode(e2) {
  return /(fragment|fgt|symbol\(\))/i.test(e2.type.toString());
}, isTextNode(e2) {
  return /(text|txt)/i.test(e2.type.toString());
}, renderTag(e2) {
  if (this.isTextNode(e2)) return e2.children;
  if (this.isFragmentNode(e2)) return "";
  if (this.isCommentNode(e2)) return "";
  let o2 = this.renderTagStart(e2);
  return e2.children && (o2 += this.renderTagChildren(e2)), this.isUnaryTag(e2) || (o2 += `</${e2.type}>`), o2;
}, addTitleElement(e2) {
  return this.title && !e2.find((o2) => o2.startsWith("<title")) && e2.push(`<title inertia>${this.title}</title>`), e2;
}, renderNodes(e2) {
  return this.addTitleElement(e2.flatMap((o2) => this.resolveNode(o2)).map((o2) => this.renderTag(o2)).filter((o2) => o2));
}, resolveNode(e2) {
  return this.isFunctionNode(e2) ? this.resolveNode(e2.type()) : this.isComponentNode(e2) ? (console.warn("Using components in the <Head> component is not supported."), []) : this.isTextNode(e2) && e2.children ? e2 : this.isFragmentNode(e2) && e2.children ? e2.children.flatMap((o2) => this.resolveNode(o2)) : this.isCommentNode(e2) ? [] : e2;
} }, render() {
  this.provider.update(this.renderNodes(this.$slots.default ? this.$slots.default() : []));
} }), Z$1 = X$1;
var se$1 = defineComponent({ name: "Link", props: { as: { type: String, default: "a" }, data: { type: Object, default: () => ({}) }, href: { type: String, required: true }, method: { type: String, default: "get" }, replace: { type: Boolean, default: false }, preserveScroll: { type: Boolean, default: false }, preserveState: { type: Boolean, default: null }, only: { type: Array, default: () => [] }, except: { type: Array, default: () => [] }, headers: { type: Object, default: () => ({}) }, queryStringArrayFormat: { type: String, default: "brackets" } }, setup(e2, { slots: o2, attrs: n2 }) {
  return () => {
    let p2 = e2.as.toLowerCase(), t4 = e2.method.toLowerCase(), [a2, l2] = mergeDataIntoQueryString(t4, e2.href || "", e2.data, e2.queryStringArrayFormat);
    return p2 === "a" && t4 !== "get" && console.warn(`Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.

Please specify a more appropriate element using the "as" attribute. For example:

<Link href="${a2}" method="${t4}" as="button">...</Link>`), h$1(e2.as, { ...n2, ...p2 === "a" ? { href: a2 } : {}, onClick: (f2) => {
      shouldIntercept(f2) && (f2.preventDefault(), router.visit(a2, { data: l2, method: t4, replace: e2.replace, preserveScroll: e2.preserveScroll, preserveState: e2.preserveState ?? t4 !== "get", only: e2.only, except: e2.except, headers: e2.headers, onCancelToken: n2.onCancelToken || (() => ({})), onBefore: n2.onBefore || (() => ({})), onStart: n2.onStart || (() => ({})), onProgress: n2.onProgress || (() => ({})), onFinish: n2.onFinish || (() => ({})), onCancel: n2.onCancel || (() => ({})), onSuccess: n2.onSuccess || (() => ({})), onError: n2.onError || (() => ({})) }));
    } }, o2);
  };
} }), ie = se$1;
const useContactModalStore = defineStore("contactModal", () => {
  const options = ref({
    teleportTo: "body",
    modelValue: false,
    displayDirective: "if",
    hideOverlay: false,
    overlayTransition: "vfm-fade",
    contentTransition: "vfm-fade",
    clickToClose: true,
    escToClose: true,
    background: "non-interactive",
    lockScroll: true,
    reserveScrollBarGap: true,
    swipeToClose: "none",
    errors: [],
    data: {
      name: null,
      email: null,
      phone: null,
      message: null,
      time: null
    }
  });
  const openModal = () => {
    options.value.modelValue = true;
  };
  const closeModal = () => {
    options.value.modelValue = false;
  };
  const setErrors = (errors) => {
    options.value.errors = errors;
  };
  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };
  const validatePhone = (phone) => {
    return /^\d+$/.test(phone);
  };
  const validate = async () => {
    options.value.errors = [];
    if (!options.value.data.name) {
      options.value.errors.push("Введите имя и фамилию");
      return false;
    }
    if (!options.value.data.phone || !validatePhone(options.value.data.phone)) {
      options.value.errors.push("Введите корректный номер телефона");
      return false;
    }
    if (options.value.data.email && !validateEmail(options.value.data.email)) {
      options.value.errors.push("Введите корректный email");
      return false;
    }
    try {
      const response = await axios$1.post("/api/send-telegram-message", options.value.data);
      if (response.data.message === "Message sent") {
        options.value.data = {
          name: null,
          email: null,
          phone: null,
          message: null,
          time: null
        };
        closeModal();
        alert("Ваша заявка отправлена");
      }
    } catch (error) {
      options.value.errors.push("Произошла ошибка при отправке формы");
    }
  };
  return { options, openModal, closeModal, setErrors, validate };
});
const useSearchStore = defineStore("search", () => {
  const options = ref({
    show: false,
    input: null,
    items: [],
    loading: false,
    lastSearch: [],
    timeout: null
  });
  async function search() {
    const { data } = await axios.get("/search/" + options.value.input);
    options.value.items = data;
  }
  async function init() {
    watch(
      () => options.value.input,
      async (newQuery) => {
        if (newQuery) {
          clearTimeout(options.value.timeout);
          options.value.timeout = setTimeout(async () => {
            options.value.loading = true;
            await search();
            options.value.loading = false;
          }, 1e3);
        }
      }
    );
  }
  return { options, init };
});
const useProductStore = defineStore("product", () => {
  const options = ref({
    show: false,
    input: null,
    popularProducts: [],
    loading: false,
    lastSearch: [],
    timeout: null,
    history_views: []
  });
  function initClientSide() {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("history_views");
      if (savedHistory) {
        options.value.history_views = JSON.parse(savedHistory);
      }
    }
  }
  async function init() {
    initClientSide();
    await getPopularProducts();
  }
  async function getPopularProducts() {
    try {
      const { data } = await axios.get("/popular-products");
      options.value.popularProducts = data;
    } catch (error) {
      console.error("Error fetching popular products:", error);
    }
  }
  function addToHistoryViews(product) {
    if (options.value.history_views.find((item) => item.id === product.id)) {
      return;
    }
    if (options.value.history_views.length >= 4) {
      options.value.history_views.shift();
    }
    options.value.history_views.push(product);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("history_views", JSON.stringify(options.value.history_views));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }
  function getSpecification(key, specifications) {
    let result = specifications.find((spec) => spec.key === key);
    return result == null ? void 0 : result.name;
  }
  return {
    options,
    init,
    getSpecification,
    addToHistoryViews
  };
});
const useSettingStore = defineStore("setting", () => {
  const options = ref({
    show: false,
    input: null,
    settings: [],
    loading: false,
    timeout: null
  });
  async function init() {
    await getSettings();
  }
  async function getSettings() {
    const { data } = await axios.get("/settings");
    options.value.settings = data;
  }
  return { options, init };
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const searchStore = useSearchStore();
    const productStore = useProductStore();
    const settingStore = useSettingStore();
    settingStore.init();
    searchStore.init();
    productStore.init();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "w-full bg-white" }, _attrs))} data-v-5e0a0cd5><div class="bg-white flex container mx-auto flex-col" data-v-5e0a0cd5><div class="flex py-4 items-center justify-between" data-v-5e0a0cd5><div class="flex flex-1 items-center gap-10" data-v-5e0a0cd5><div class="flex flex-col gap-0.5 flex-shrink-0" data-v-5e0a0cd5>`);
      _push(ssrRenderComponent(unref(ie), {
        href: "/",
        class: "flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<img src="/assets/img/logo.svg" alt="logo" width="24" height="24" srcset="" data-v-5e0a0cd5${_scopeId}><span class="text-purple text-2xl leading-none font-semibold" data-v-5e0a0cd5${_scopeId}>${ssrInterpolate((_a2 = unref(settingStore).options.settings) == null ? void 0 : _a2.name_company)}</span>`);
          } else {
            return [
              createVNode("img", {
                src: "/assets/img/logo.svg",
                alt: "logo",
                width: "24",
                height: "24",
                srcset: ""
              }),
              createVNode("span", { class: "text-purple text-2xl leading-none font-semibold" }, toDisplayString((_b2 = unref(settingStore).options.settings) == null ? void 0 : _b2.name_company), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="text-gray_icon leading-none text-sm" data-v-5e0a0cd5>г. Краснодар</span></div><div class="flex max-sm:hidden flex-col gap-2 flex-1 relative" data-v-5e0a0cd5><div class="input-wrapper w-full flex-1" data-v-5e0a0cd5>`);
      if (!unref(searchStore).options.loading) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" data-v-5e0a0cd5><path d="M13 13L10.6667 10.6667M12.3333 6.66667C12.3333 9.79628 9.79628 12.3333 6.66667 12.3333C3.53705 12.3333 1 9.79628 1 6.66667C1 3.53705 3.53705 1 6.66667 1C9.79628 1 12.3333 3.53705 12.3333 6.66667Z" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-5e0a0cd5></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(searchStore).options.loading) {
        _push(`<div class="loader" data-v-5e0a0cd5></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", unref(searchStore).options.input)} type="text" class="w-full flex-1" placeholder="Поиск запчастей" data-v-5e0a0cd5></div>`);
      if (unref(searchStore).options.show) {
        _push(`<div class="absolute top-20 left-0 p-4 z-50 min-w-[750px] w-full bg-white rounded-2xl shadow-lg flex flex-col gap-5" data-v-5e0a0cd5><div class="hidden flex-col gap-3" data-v-5e0a0cd5><p class="text-black font-bold leading-none" data-v-5e0a0cd5>Недавно вы искали</p><div class="flex flex-col gap-2" data-v-5e0a0cd5><p class="text-gray_icon text-sm" data-v-5e0a0cd5> Шестигранник стальной рессорно-пружинный г/к </p><p class="text-gray_icon text-sm" data-v-5e0a0cd5> Лента стальная рессорно-пружинная </p></div></div><div class="flex flex-col gap-3" data-v-5e0a0cd5><p class="text-black font-bold leading-none" data-v-5e0a0cd5>${ssrInterpolate(((_b = (_a = unref(searchStore).options) == null ? void 0 : _a.input) == null ? void 0 : _b.length) > 0 ? unref(searchStore).options.items.length > 0 ? "Товары по вашему запросу" : "Товары не найдены" : "Популярные товары")}</p><div class="flex items-center gap-3 overflow-x-auto" data-v-5e0a0cd5>`);
        if (((_d = (_c = unref(searchStore).options) == null ? void 0 : _c.input) == null ? void 0 : _d.length) > 0) {
          _push(`<!--[-->`);
          ssrRenderList(unref(searchStore).options.items, (item) => {
            _push(ssrRenderComponent(unref(ie), {
              href: `/product/${item.id}`,
              class: "product-card flex-shrink-0 gap-3"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<img class="w-[175px] h-[175px]"${ssrRenderAttr("src", "/storage/" + (item == null ? void 0 : item.images))} alt="" data-v-5e0a0cd5${_scopeId}><div class="flex flex-col gap-4" data-v-5e0a0cd5${_scopeId}><div class="product-text" data-v-5e0a0cd5${_scopeId}><p class="font-medium" data-v-5e0a0cd5${_scopeId}>${ssrInterpolate(item == null ? void 0 : item.name)}</p></div><button class="btn btn-primary w-fit" data-v-5e0a0cd5${_scopeId}> Заказать звонок </button></div>`);
                } else {
                  return [
                    createVNode("img", {
                      class: "w-[175px] h-[175px]",
                      src: "/storage/" + (item == null ? void 0 : item.images),
                      alt: ""
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "flex flex-col gap-4" }, [
                      createVNode("div", { class: "product-text" }, [
                        createVNode("p", { class: "font-medium" }, toDisplayString(item == null ? void 0 : item.name), 1)
                      ]),
                      createVNode("button", {
                        onClick: withModifiers(($event) => unref(useContactModalStore)().openModal(), ["prevent"]),
                        class: "btn btn-primary w-fit"
                      }, " Заказать звонок ", 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(unref(productStore).options.popularProducts, (popularProduct) => {
            _push(ssrRenderComponent(unref(ie), {
              href: `/product/${popularProduct.id}`,
              class: "product-card flex-shrink-0 gap-3"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<img class="h-[175px] w-[175px]"${ssrRenderAttr("src", "/storage/" + (popularProduct == null ? void 0 : popularProduct.images))} alt="" data-v-5e0a0cd5${_scopeId}><div class="flex flex-col gap-4" data-v-5e0a0cd5${_scopeId}><div class="product-text" data-v-5e0a0cd5${_scopeId}><p class="font-medium" data-v-5e0a0cd5${_scopeId}>${ssrInterpolate(popularProduct == null ? void 0 : popularProduct.name)}</p></div><button class="btn btn-primary w-fit" data-v-5e0a0cd5${_scopeId}> Заказать звонок </button></div>`);
                } else {
                  return [
                    createVNode("img", {
                      class: "h-[175px] w-[175px]",
                      src: "/storage/" + (popularProduct == null ? void 0 : popularProduct.images),
                      alt: ""
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "flex flex-col gap-4" }, [
                      createVNode("div", { class: "product-text" }, [
                        createVNode("p", { class: "font-medium" }, toDisplayString(popularProduct == null ? void 0 : popularProduct.name), 1)
                      ]),
                      createVNode("button", {
                        onClick: withModifiers(($event) => unref(useContactModalStore)().openModal(), ["prevent"]),
                        class: "btn btn-primary w-fit"
                      }, " Заказать звонок ", 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]-->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex-1 max-md:hidden contact-container" data-v-5e0a0cd5><div class="contact-element" data-v-5e0a0cd5><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" data-v-5e0a0cd5><path d="M7.99998 4.50016V8.50016L10.6666 9.8335M14.6666 8.50016C14.6666 12.1821 11.6819 15.1668 7.99998 15.1668C4.31808 15.1668 1.33331 12.1821 1.33331 8.50016C1.33331 4.81826 4.31808 1.8335 7.99998 1.8335C11.6819 1.8335 14.6666 4.81826 14.6666 8.50016Z" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-5e0a0cd5></path></svg> ${ssrInterpolate((_e = unref(settingStore).options.settings) == null ? void 0 : _e.work_time)}</div><div class="contact-element" data-v-5e0a0cd5><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" data-v-5e0a0cd5><path d="M5.58685 6.40224C6.05085 7.36865 6.68338 8.27441 7.48443 9.07546C8.28548 9.87651 9.19124 10.509 10.1577 10.973C10.2408 11.0129 10.2823 11.0329 10.3349 11.0482C10.5218 11.1027 10.7513 11.0636 10.9096 10.9502C10.9542 10.9183 10.9923 10.8802 11.0685 10.804C11.3016 10.571 11.4181 10.4544 11.5353 10.3782C11.9772 10.0909 12.5469 10.0909 12.9889 10.3782C13.106 10.4544 13.2226 10.571 13.4556 10.804L13.5856 10.934C13.9399 11.2882 14.117 11.4654 14.2132 11.6556C14.4046 12.034 14.4046 12.4809 14.2132 12.8592C14.117 13.0495 13.9399 13.2266 13.5856 13.5809L13.4805 13.686C13.1274 14.0391 12.9508 14.2156 12.7108 14.3505C12.4445 14.5001 12.0308 14.6077 11.7253 14.6068C11.45 14.6059 11.2619 14.5525 10.8856 14.4457C8.86334 13.8718 6.95509 12.7888 5.36311 11.1968C3.77112 9.6048 2.68814 7.69655 2.11416 5.67429C2.00735 5.29799 1.95395 5.10984 1.95313 4.83455C1.95222 4.52906 2.0598 4.1154 2.20941 3.84907C2.34424 3.60905 2.52078 3.4325 2.87386 3.07942L2.97895 2.97433C3.33325 2.62004 3.5104 2.44289 3.70065 2.34666C4.07903 2.15528 4.52587 2.15528 4.90424 2.34666C5.0945 2.44289 5.27164 2.62004 5.62594 2.97433L5.75585 3.10425C5.98892 3.33732 6.10546 3.45385 6.18165 3.57104C6.46898 4.01296 6.46898 4.58268 6.18165 5.02461C6.10546 5.1418 5.98892 5.25833 5.75585 5.4914C5.67964 5.56761 5.64154 5.60572 5.60965 5.65026C5.49631 5.80854 5.45717 6.03805 5.51165 6.22495C5.52698 6.27755 5.54694 6.31911 5.58685 6.40224Z" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-5e0a0cd5></path></svg> ${ssrInterpolate((_f = unref(settingStore).options.settings) == null ? void 0 : _f.phone)}</div><div class="contact-element max-lg:hidden" data-v-5e0a0cd5><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" data-v-5e0a0cd5><path d="M1.33333 5.1665L6.77661 8.9768C7.21739 9.28535 7.43778 9.43962 7.6775 9.49938C7.88926 9.55216 8.11073 9.55216 8.32249 9.49938C8.56221 9.43962 8.7826 9.28535 9.22338 8.9768L14.6667 5.1665M4.53333 13.8332H11.4667C12.5868 13.8332 13.1468 13.8332 13.5746 13.6152C13.951 13.4234 14.2569 13.1175 14.4487 12.7412C14.6667 12.3133 14.6667 11.7533 14.6667 10.6332V6.3665C14.6667 5.2464 14.6667 4.68635 14.4487 4.25852C14.2569 3.8822 13.951 3.57624 13.5746 3.38449C13.1468 3.1665 12.5868 3.1665 11.4667 3.1665H4.53333C3.41322 3.1665 2.85317 3.1665 2.42535 3.38449C2.04902 3.57624 1.74306 3.8822 1.55132 4.25852C1.33333 4.68635 1.33333 5.2464 1.33333 6.3665V10.6332C1.33333 11.7533 1.33333 12.3133 1.55132 12.7412C1.74306 13.1175 2.04902 13.4234 2.42535 13.6152C2.85317 13.8332 3.41322 13.8332 4.53333 13.8332Z" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-5e0a0cd5></path></svg> ${ssrInterpolate((_g = unref(settingStore).options.settings) == null ? void 0 : _g.email)}</div></div><div class="btn mx-3 p-4 max-md:flex hidden btn-white h-full" data-v-5e0a0cd5><svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5e0a0cd5><path d="M1 5H13M1 1H13M1 9H9" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-5e0a0cd5></path></svg></div></div><div class="subheader-container" data-v-5e0a0cd5><div class="subheader-first-container" data-v-5e0a0cd5>`);
      _push(ssrRenderComponent(unref(ie), {
        href: "/catalog",
        class: "btn btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" data-v-5e0a0cd5${_scopeId}><path d="M2 8H14M2 4H14M2 12H10" stroke="#949494" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-5e0a0cd5${_scopeId}></path></svg><span data-v-5e0a0cd5${_scopeId}>Каталог</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none"
              }, [
                createVNode("path", {
                  d: "M2 8H14M2 4H14M2 12H10",
                  stroke: "#949494",
                  "stroke-width": "1.6",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ])),
              createVNode("span", null, "Каталог")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="max-md:hidden nav-menu" data-v-5e0a0cd5><a href="#" data-v-5e0a0cd5>О компании</a><a href="#" data-v-5e0a0cd5>Услуги</a><a href="#" data-v-5e0a0cd5>Доставка</a><a href="#" data-v-5e0a0cd5>Оплата</a><a href="#" data-v-5e0a0cd5>Калькулятор</a>`);
      _push(ssrRenderComponent(unref(ie), { href: "/contacts" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Контакты`);
          } else {
            return [
              createTextVNode("Контакты")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><button class="btn btn-primary max-sm:ml-3 flex justify-center max-sm:w-full" data-v-5e0a0cd5> Заказать звонок </button></div></div></header>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Header.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-5e0a0cd5"]]);
const _sfc_main$b = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const settingStore = useSettingStore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "container mt-auto mx-auto max-md:flex-col max-md:gap-5 max-md:items-start flex justify-between items-center py-6" }, _attrs))}><div class="flex flex-col gap-6"><div class="flex flex-col gap-0.5 flex-shrink-0"><div class="flex items-center gap-1"><img src="/assets/img/logo.svg" alt="logo" width="24" height="24" srcset=""><span class="text-purple text-2xl leading-none font-semibold">${ssrInterpolate((_a = unref(settingStore).options.settings) == null ? void 0 : _a.name_company)}</span></div><span class="text-gray_icon leading-none text-sm">г. Краснодар</span></div><div class="flex-1 max-md:hidden contact-container"><div class="contact-element"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><path d="M7.99998 4.50016V8.50016L10.6666 9.8335M14.6666 8.50016C14.6666 12.1821 11.6819 15.1668 7.99998 15.1668C4.31808 15.1668 1.33331 12.1821 1.33331 8.50016C1.33331 4.81826 4.31808 1.8335 7.99998 1.8335C11.6819 1.8335 14.6666 4.81826 14.6666 8.50016Z" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg> ${ssrInterpolate((_b = unref(settingStore).options.settings) == null ? void 0 : _b.work_time)}</div><div class="contact-element"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><path d="M5.58685 6.40224C6.05085 7.36865 6.68338 8.27441 7.48443 9.07546C8.28548 9.87651 9.19124 10.509 10.1577 10.973C10.2408 11.0129 10.2823 11.0329 10.3349 11.0482C10.5218 11.1027 10.7513 11.0636 10.9096 10.9502C10.9542 10.9183 10.9923 10.8802 11.0685 10.804C11.3016 10.571 11.4181 10.4544 11.5353 10.3782C11.9772 10.0909 12.5469 10.0909 12.9889 10.3782C13.106 10.4544 13.2226 10.571 13.4556 10.804L13.5856 10.934C13.9399 11.2882 14.117 11.4654 14.2132 11.6556C14.4046 12.034 14.4046 12.4809 14.2132 12.8592C14.117 13.0495 13.9399 13.2266 13.5856 13.5809L13.4805 13.686C13.1274 14.0391 12.9508 14.2156 12.7108 14.3505C12.4445 14.5001 12.0308 14.6077 11.7253 14.6068C11.45 14.6059 11.2619 14.5525 10.8856 14.4457C8.86334 13.8718 6.95509 12.7888 5.36311 11.1968C3.77112 9.6048 2.68814 7.69655 2.11416 5.67429C2.00735 5.29799 1.95395 5.10984 1.95313 4.83455C1.95222 4.52906 2.0598 4.1154 2.20941 3.84907C2.34424 3.60905 2.52078 3.4325 2.87386 3.07942L2.97895 2.97433C3.33325 2.62004 3.5104 2.44289 3.70065 2.34666C4.07903 2.15528 4.52587 2.15528 4.90424 2.34666C5.0945 2.44289 5.27164 2.62004 5.62594 2.97433L5.75585 3.10425C5.98892 3.33732 6.10546 3.45385 6.18165 3.57104C6.46898 4.01296 6.46898 4.58268 6.18165 5.02461C6.10546 5.1418 5.98892 5.25833 5.75585 5.4914C5.67964 5.56761 5.64154 5.60572 5.60965 5.65026C5.49631 5.80854 5.45717 6.03805 5.51165 6.22495C5.52698 6.27755 5.54694 6.31911 5.58685 6.40224Z" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg> ${ssrInterpolate((_c = unref(settingStore).options.settings) == null ? void 0 : _c.phone)}</div><div class="contact-element"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"><path d="M1.33333 5.1665L6.77661 8.9768C7.21739 9.28535 7.43778 9.43962 7.6775 9.49938C7.88926 9.55216 8.11073 9.55216 8.32249 9.49938C8.56221 9.43962 8.7826 9.28535 9.22338 8.9768L14.6667 5.1665M4.53333 13.8332H11.4667C12.5868 13.8332 13.1468 13.8332 13.5746 13.6152C13.951 13.4234 14.2569 13.1175 14.4487 12.7412C14.6667 12.3133 14.6667 11.7533 14.6667 10.6332V6.3665C14.6667 5.2464 14.6667 4.68635 14.4487 4.25852C14.2569 3.8822 13.951 3.57624 13.5746 3.38449C13.1468 3.1665 12.5868 3.1665 11.4667 3.1665H4.53333C3.41322 3.1665 2.85317 3.1665 2.42535 3.38449C2.04902 3.57624 1.74306 3.8822 1.55132 4.25852C1.33333 4.68635 1.33333 5.2464 1.33333 6.3665V10.6332C1.33333 11.7533 1.33333 12.3133 1.55132 12.7412C1.74306 13.1175 2.04902 13.4234 2.42535 13.6152C2.85317 13.8332 3.41322 13.8332 4.53333 13.8332Z" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg> ${ssrInterpolate((_d = unref(settingStore).options.settings) == null ? void 0 : _d.email)}</div></div></div><div class="flex flex-col gap-6"><div class="nav-menu max-md:hidden"><a href="#">О компании</a><a href="#">Услуги</a><a href="#">Доставка</a><a href="#">Оплата</a><a href="#">Калькулятор</a><a href="#">Контакты</a></div><p>© ${ssrInterpolate((_e = unref(settingStore).options.settings) == null ? void 0 : _e.name_company)}, ИНН ${ssrInterpolate((_f = unref(settingStore).options.settings) == null ? void 0 : _f.inn)}. Все права защищены, 2024.</p></div></footer>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Footer.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const uo = (e2) => (...o2) => {
  e2 && (e2 == null || e2(...o2), e2 = null);
}, q = () => {
};
function oe(e2, o2, l2) {
  return e2 > l2 ? l2 : e2 < o2 ? o2 : e2;
}
const we = (e2) => typeof e2 == "string";
function fe(e2, o2) {
  var s2;
  const l2 = ((s2 = $$1(e2, o2)) == null ? void 0 : s2[0]) || o2;
  e2.push(l2);
}
function $$1(e2, o2) {
  const l2 = e2.indexOf(o2);
  if (l2 !== -1)
    return e2.splice(l2, 1);
}
const co = {
  /**
   * @description Set `null | false` to disable teleport.
   * @default `'body'`
   * @example
   * ```js
   * teleportTo: '#modals'
   * ```
   */
  teleportTo: {
    type: [String, null, Boolean, Object],
    default: "body"
  },
  /**
   * @description An uniq name for the open/close a modal via vfm.open/vfm.close APIs.
   * @default `undefined`
   * @example Symbol: `Symbol('MyModal')`
   * @example String: `'AUniqString'`
   * @example Number: `300`
   */
  modalId: {
    type: [String, Number, Symbol],
    default: void 0
  },
  /**
   * @description Display the modal or not.
   * @default `undefined`
   * @example
   * ```js
   * const showModal = ref(false)
   * v-model="showModal"
   * ```
   */
  modelValue: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description Render the modal via `if` or `show`.
   * @default `'if'`
   * @example
   * ```js
   * displayDirective: 'if'
   * ```
   * @example
   * ```js
   * displayDirective: 'show'
   * ```
   */
  displayDirective: {
    type: String,
    default: "if",
    validator: (e2) => ["if", "show", "visible"].includes(e2)
  },
  /**
   * @description Hide the overlay or not.
   * @default `undefined`
   * @example
   * ```js
   * hideOverlay="true"
   * ```
   */
  hideOverlay: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description Customize the overlay behavior.
   */
  overlayBehavior: {
    type: String,
    default: "auto",
    validator: (e2) => ["auto", "persist"].includes(e2)
  },
  /**
   * @description Customize the overlay transition.
   * @default `undefined`
   */
  overlayTransition: {
    type: [String, Object],
    default: void 0
  },
  /**
   * @description Customize the content transition.
   * @default `undefined`
   */
  contentTransition: {
    type: [String, Object],
    default: void 0
  },
  /**
   * @description Bind class to vfm__overlay.
   * @default `undefined`
   */
  overlayClass: {
    type: void 0,
    default: void 0
  },
  /**
   * @description Bind class to vfm__content.
   * @default `undefined`
   */
  contentClass: {
    type: void 0,
    default: void 0
  },
  /**
   * @description Bind style to vfm__overlay.
   * @default `undefined`
   */
  overlayStyle: {
    type: [String, Object, Array],
    default: void 0
  },
  /**
   * @description Bind style to vfm__content.
   * @default `undefined`
   */
  contentStyle: {
    type: [String, Object, Array],
    default: void 0
  },
  /**
   * @description Is it allow to close the modal by clicking the overlay.
   * @default `true`
   */
  clickToClose: {
    type: Boolean,
    default: true
  },
  /**
   * @description Is it allow to close the modal by keypress `esc`.
   * @default `true`
   */
  escToClose: {
    type: Boolean,
    default: true
  },
  /**
   * @description Is it allow to click outside of the vfm__content when the modal is opened
   * @default `'non-interactive'`
   */
  background: {
    type: String,
    default: "non-interactive",
    validator: (e2) => ["interactive", "non-interactive"].includes(e2)
  },
  /**
   * @description
   * * Use `{ disabled: true }` to disable the focusTrap.
   * * Checkout the createOptions type here https://github.com/focus-trap/focus-trap for more.
   * @default `{ allowOutsideClick: true }`
   */
  focusTrap: {
    type: [Boolean, Object],
    default: () => ({
      allowOutsideClick: true
    })
  },
  /**
   * @description Lock body scroll or not when the modal is opened.
   * @default `true`
   */
  lockScroll: {
    type: Boolean,
    default: true
  },
  /**
   * @description Creates a padding-right when scroll is locked to prevent the page from jumping
   * @default `true`
   */
  reserveScrollBarGap: {
    type: Boolean,
    default: true
  },
  /**
   * @description Define how to increase the zIndex when there are nested modals
   * @default `({ index }) => 1000 + 2 * index`
   */
  zIndexFn: {
    type: Function,
    default: ({ index: e2 }) => 1e3 + 2 * e2
  },
  /**
   * @description The direction of swiping to close the modal
   * @default `none`
   * @example
   * Set swipeToClose="none" to disable swiping to close
   * ```js
   * swipeToClose="none"
   * ```
   */
  swipeToClose: {
    type: String,
    default: "none",
    validator: (e2) => ["none", "up", "right", "down", "left"].includes(e2)
  },
  /**
   * @description Threshold for swipe to close
   * @default `0`
   */
  threshold: {
    type: Number,
    default: 0
  },
  /**
   * @description If set `:showSwipeBanner="true"`, only allow clicking `swipe-banner` slot to swipe to close
   * @default `undefined`
   * @example
   * ```js
   * swipeToClose="right"
   * :showSwipeBanner="true"
   * ```
   * ```html
   * <VueFinalModal
   *   ...
   *   swipeToClose="right"
   *   :showSwipeBanner="true"
   * >
   *   <template #swipe-banner>
   *     <div style="position: absolute; height: 100%; top: 0; left: 0; width: 10px;" />
   *   </template>
   *   ...modal content
   * </VueFinalModal>
   * ```
   */
  showSwipeBanner: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description When set `:preventNavigationGestures="true"`, there will be two invisible bars for prevent navigation gestures including swiping back/forward on mobile webkit. For example: Safari mobile.
   * @default `undefined`
   * @example
   * Set preventNavigationGestures="true" to prevent Safari navigation gestures including swiping back/forward.
   * ```js
   * :preventNavigationGestures="true"
   * ```
   */
  preventNavigationGestures: {
    type: Boolean,
    default: void 0
  }
};
function Oe(e2 = false) {
  const o2 = ref(e2), l2 = ref(o2.value ? 0 : void 0);
  return [o2, l2, {
    beforeEnter() {
      l2.value = 1;
    },
    afterEnter() {
      l2.value = 0;
    },
    beforeLeave() {
      l2.value = 3;
    },
    afterLeave() {
      l2.value = 2;
    }
  }];
}
function fo(e2, o2) {
  const { modelValueLocal: l2, onEntering: s2, onEnter: u2, onLeaving: c2, onLeave: a2 } = o2, n2 = ref(l2.value), [t4, r2, m2] = Oe(n2.value), [f2, M2, S2] = Oe(n2.value), V = computed(() => typeof e2.contentTransition == "string" ? { name: e2.contentTransition, appear: true } : { appear: true, ...e2.contentTransition }), O2 = computed(() => typeof e2.overlayTransition == "string" ? { name: e2.overlayTransition, appear: true } : { appear: true, ...e2.overlayTransition }), E2 = computed(
    () => (e2.hideOverlay || M2.value === 2) && r2.value === 2
    /* Leave */
  );
  watch(
    E2,
    (k2) => {
      k2 && (n2.value = false);
    }
  ), watch(r2, (k2) => {
    if (k2 === 1) {
      if (!n2.value)
        return;
      s2 == null || s2();
    } else if (k2 === 0) {
      if (!n2.value)
        return;
      u2 == null || u2();
    } else
      k2 === 3 ? c2 == null || c2() : k2 === 2 && (a2 == null || a2());
  });
  async function w2() {
    n2.value = true, await nextTick(), t4.value = true, f2.value = true;
  }
  function D2() {
    t4.value = false, f2.value = false;
  }
  return {
    visible: n2,
    contentVisible: t4,
    contentListeners: m2,
    contentTransition: V,
    overlayVisible: f2,
    overlayListeners: S2,
    overlayTransition: O2,
    enterTransition: w2,
    leaveTransition: D2
  };
}
function vo(e2, o2, l2) {
  const { vfmRootEl: s2, vfmContentEl: u2, visible: c2, modelValueLocal: a2 } = l2, n2 = ref();
  function t4() {
    c2.value && e2.escToClose && (a2.value = false);
  }
  function r2(f2) {
    n2.value = f2 == null ? void 0 : f2.target;
  }
  function m2() {
    var f2;
    n2.value === s2.value && (e2.clickToClose ? a2.value = false : ((f2 = u2.value) == null || f2.focus(), o2("clickOutside")));
  }
  return {
    onEsc: t4,
    onMouseupRoot: m2,
    onMousedown: r2
  };
}
function po(e2, o2, l2) {
  let s2 = false;
  const { open: u2, close: c2 } = l2, a2 = ref(false), n2 = {
    get value() {
      return a2.value;
    },
    set value(r2) {
      t4(r2);
    }
  };
  function t4(r2) {
    (r2 ? u2() : c2()) ? (a2.value = r2, r2 !== e2.modelValue && o2("update:modelValue", r2)) : (s2 = true, o2("update:modelValue", !r2), nextTick(() => {
      s2 = false;
    }));
  }
  return watch(() => e2.modelValue, (r2) => {
    s2 || (n2.value = !!r2);
  }), {
    modelValueLocal: n2
  };
}
function yo(e2, o2) {
  if (e2.focusTrap === false)
    return {
      focus() {
      },
      blur() {
      }
    };
  const { focusEl: l2 } = o2, { hasFocus: s2, activate: u2, deactivate: c2 } = useFocusTrap(l2, e2.focusTrap);
  function a2() {
    requestAnimationFrame(() => {
      u2();
    });
  }
  function n2() {
    s2.value && c2();
  }
  return { focus: a2, blur: n2 };
}
let be = false;
if (typeof window < "u") {
  const e2 = {
    get passive() {
      be = true;
    }
  };
  window.addEventListener("testPassive", null, e2), window.removeEventListener("testPassive", null, e2);
}
const He = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
let j$1 = [], le = false, ne = 0, je = -1, W, X;
const ho = (e2) => {
  if (!e2 || e2.nodeType !== Node.ELEMENT_NODE)
    return false;
  const o2 = window.getComputedStyle(e2);
  return ["auto", "scroll"].includes(o2.overflowY) && e2.scrollHeight > e2.clientHeight;
}, mo = (e2, o2) => !(e2.scrollTop === 0 && o2 < 0 || e2.scrollTop + e2.clientHeight + o2 >= e2.scrollHeight && o2 > 0), wo = (e2) => {
  const o2 = [];
  for (; e2; ) {
    if (o2.push(e2), e2.classList.contains("vfm"))
      return o2;
    e2 = e2.parentElement;
  }
  return o2;
}, bo = (e2, o2) => {
  let l2 = false;
  return wo(e2).forEach((u2) => {
    ho(u2) && mo(u2, o2) && (l2 = true);
  }), l2;
}, Ne = (e2) => j$1.some(() => bo(e2, -ne)), se = (e2) => {
  const o2 = e2 || window.event;
  return Ne(o2.target) || o2.touches.length > 1 ? true : (o2.preventDefault && o2.preventDefault(), false);
}, To = (e2) => {
  if (X === void 0) {
    const o2 = !!e2 && e2.reserveScrollBarGap === true, l2 = window.innerWidth - document.documentElement.clientWidth;
    if (o2 && l2 > 0) {
      const s2 = parseInt(getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
      X = document.body.style.paddingRight, document.body.style.paddingRight = `${s2 + l2}px`;
    }
  }
  W === void 0 && (W = document.body.style.overflow, document.body.style.overflow = "hidden");
}, So = () => {
  X !== void 0 && (document.body.style.paddingRight = X, X = void 0), W !== void 0 && (document.body.style.overflow = W, W = void 0);
}, Mo = (e2) => e2 ? e2.scrollHeight - e2.scrollTop <= e2.clientHeight : false, go = (e2, o2) => (ne = e2.targetTouches[0].clientY - je, Ne(e2.target) ? false : o2 && o2.scrollTop === 0 && ne > 0 || Mo(o2) && ne < 0 ? se(e2) : (e2.stopPropagation(), true)), Co = (e2, o2) => {
  if (!e2) {
    console.error(
      "disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices."
    );
    return;
  }
  if (j$1.some((s2) => s2.targetElement === e2))
    return;
  const l2 = {
    targetElement: e2,
    options: o2 || {}
  };
  j$1 = [...j$1, l2], He ? (e2.ontouchstart = (s2) => {
    s2.targetTouches.length === 1 && (je = s2.targetTouches[0].clientY);
  }, e2.ontouchmove = (s2) => {
    s2.targetTouches.length === 1 && go(s2, e2);
  }, le || (document.addEventListener("touchmove", se, be ? { passive: false } : void 0), le = true)) : To(o2);
}, ko = (e2) => {
  if (!e2) {
    console.error(
      "enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices."
    );
    return;
  }
  j$1 = j$1.filter((o2) => o2.targetElement !== e2), He ? (e2.ontouchstart = null, e2.ontouchmove = null, le && j$1.length === 0 && (document.removeEventListener("touchmove", se, be ? { passive: false } : void 0), le = false)) : j$1.length || So();
};
function Vo(e2, o2) {
  const { lockScrollEl: l2, modelValueLocal: s2 } = o2;
  let u2;
  watch(l2, (n2) => {
    n2 && (u2 = n2);
  }, { immediate: true }), watch(() => e2.lockScroll, (n2) => {
    n2 ? a2() : c2();
  }), onBeforeUnmount(() => {
    c2();
  });
  function c2() {
    u2 && ko(u2);
  }
  function a2() {
    s2.value && e2.lockScroll && u2 && Co(u2, {
      reserveScrollBarGap: e2.reserveScrollBarGap,
      allowTouchMove: (n2) => {
        for (; n2 && n2 !== document.body; ) {
          if (n2.getAttribute("vfm-scroll-lock-ignore") !== null)
            return true;
          n2 = n2.parentElement;
        }
        return false;
      }
    });
  }
  return {
    enableBodyScroll: c2,
    disableBodyScroll: a2
  };
}
function Eo(e2) {
  const o2 = ref();
  function l2(u2) {
    var c2;
    o2.value = (c2 = e2.zIndexFn) == null ? void 0 : c2.call(e2, { index: u2 <= -1 ? 0 : u2 });
  }
  function s2() {
    o2.value = void 0;
  }
  return {
    zIndex: o2,
    refreshZIndex: l2,
    resetZIndex: s2
  };
}
const ve = {
  beforeMount(e2, { value: o2 }, { transition: l2 }) {
    e2._vov = e2.style.visibility === "hidden" ? "" : e2.style.visibility, l2 && o2 ? l2.beforeEnter(e2) : G(e2, o2);
  },
  mounted(e2, { value: o2 }, { transition: l2 }) {
    l2 && o2 && l2.enter(e2);
  },
  updated(e2, { value: o2, oldValue: l2 }, { transition: s2 }) {
    !o2 != !l2 && (s2 ? o2 ? (s2.beforeEnter(e2), G(e2, true), s2.enter(e2)) : s2.leave(e2, () => {
      G(e2, false);
    }) : G(e2, o2));
  },
  beforeUnmount(e2, { value: o2 }) {
    G(e2, o2);
  }
};
function G(e2, o2) {
  e2.style.visibility = o2 ? e2._vov : "hidden";
}
const De = (e2) => {
  if (e2 instanceof MouseEvent) {
    const { clientX: o2, clientY: l2 } = e2;
    return { x: o2, y: l2 };
  } else {
    const { clientX: o2, clientY: l2 } = e2.targetTouches[0];
    return { x: o2, y: l2 };
  }
};
function Bo(e2) {
  if (!e2)
    return false;
  let o2 = false;
  const l2 = {
    get passive() {
      return o2 = true, false;
    }
  };
  return e2.addEventListener("x", q, l2), e2.removeEventListener("x", q), o2;
}
function Oo(e2, {
  threshold: o2 = 0,
  onSwipeStart: l2,
  onSwipe: s2,
  onSwipeEnd: u2,
  passive: c2 = true
}) {
  const a2 = reactive({ x: 0, y: 0 }), n2 = reactive({ x: 0, y: 0 }), t4 = computed(() => a2.x - n2.x), r2 = computed(() => a2.y - n2.y), { max: m2, abs: f2 } = Math, M2 = computed(
    () => m2(f2(t4.value), f2(r2.value)) >= o2
  ), S2 = ref(false), V = computed(() => M2.value ? f2(t4.value) > f2(r2.value) ? t4.value > 0 ? "left" : "right" : r2.value > 0 ? "up" : "down" : "none"), O2 = (p2, h2) => {
    a2.x = p2, a2.y = h2;
  }, E2 = (p2, h2) => {
    n2.x = p2, n2.y = h2;
  };
  let w2, D2;
  function k2(p2) {
    w2.capture && !w2.passive && p2.preventDefault();
    const { x: h2, y: R2 } = De(p2);
    O2(h2, R2), E2(h2, R2), l2 == null || l2(p2), D2 = [
      useEventListener(e2, "mousemove", P, w2),
      useEventListener(e2, "touchmove", P, w2),
      useEventListener(e2, "mouseup", i2, w2),
      useEventListener(e2, "touchend", i2, w2),
      useEventListener(e2, "touchcancel", i2, w2)
    ];
  }
  function P(p2) {
    const { x: h2, y: R2 } = De(p2);
    E2(h2, R2), !S2.value && M2.value && (S2.value = true), S2.value && (s2 == null || s2(p2));
  }
  function i2(p2) {
    S2.value && (u2 == null || u2(p2, V.value)), S2.value = false, D2.forEach((h2) => h2());
  }
  let b2 = [];
  return onMounted(() => {
    const p2 = Bo(window == null ? void 0 : window.document);
    c2 ? w2 = p2 ? { passive: true } : { capture: false } : w2 = p2 ? { passive: false, capture: true } : { capture: true }, b2 = [
      useEventListener(e2, "mousedown", k2, w2),
      useEventListener(e2, "touchstart", k2, w2)
    ];
  }), {
    isSwiping: S2,
    direction: V,
    coordsStart: a2,
    coordsEnd: n2,
    lengthX: t4,
    lengthY: r2,
    stop: () => {
      b2.forEach((p2) => p2()), D2.forEach((p2) => p2());
    }
  };
}
function Do(e2, o2) {
  const { vfmContentEl: l2, modelValueLocal: s2 } = o2, u2 = 0.1, c2 = 300, a2 = ref(), n2 = computed(() => {
    if (!(e2.swipeToClose === void 0 || e2.swipeToClose === "none"))
      return e2.showSwipeBanner ? a2.value : l2.value;
  }), t4 = ref(0), r2 = ref(true);
  let m2 = q, f2 = true, M2, S2 = false;
  const { lengthX: V, lengthY: O2, direction: E2, isSwiping: w2 } = Oo(n2, {
    threshold: e2.threshold,
    onSwipeStart(i2) {
      m2 = useEventListener(document, "selectionchange", () => {
        var b2;
        r2.value = (b2 = window.getSelection()) == null ? void 0 : b2.isCollapsed;
      }), M2 = (/* @__PURE__ */ new Date()).getTime(), S2 = P(i2 == null ? void 0 : i2.target);
    },
    onSwipe() {
      var i2, b2, L, p2;
      if (S2 && r2.value && E2.value === e2.swipeToClose) {
        if (E2.value === "up") {
          const h2 = oe(Math.abs(O2.value || 0), 0, ((i2 = n2.value) == null ? void 0 : i2.offsetHeight) || 0) - (e2.threshold || 0);
          t4.value = h2;
        } else if (E2.value === "down") {
          const h2 = oe(Math.abs(O2.value || 0), 0, ((b2 = n2.value) == null ? void 0 : b2.offsetHeight) || 0) - (e2.threshold || 0);
          t4.value = -h2;
        } else if (E2.value === "right") {
          const h2 = oe(Math.abs(V.value || 0), 0, ((L = n2.value) == null ? void 0 : L.offsetWidth) || 0) - (e2.threshold || 0);
          t4.value = -h2;
        } else if (E2.value === "left") {
          const h2 = oe(Math.abs(V.value || 0), 0, ((p2 = n2.value) == null ? void 0 : p2.offsetWidth) || 0) - (e2.threshold || 0);
          t4.value = h2;
        }
      }
    },
    onSwipeEnd(i2, b2) {
      if (m2(), !r2.value) {
        r2.value = true;
        return;
      }
      const L = (/* @__PURE__ */ new Date()).getTime(), p2 = b2 === e2.swipeToClose, h2 = (() => {
        var J, Q;
        if (b2 === "up" || b2 === "down")
          return Math.abs((O2 == null ? void 0 : O2.value) || 0) > u2 * (((J = n2.value) == null ? void 0 : J.offsetHeight) || 0);
        if (b2 === "left" || b2 === "right")
          return Math.abs((V == null ? void 0 : V.value) || 0) > u2 * (((Q = n2.value) == null ? void 0 : Q.offsetWidth) || 0);
      })(), R2 = L - M2 <= c2;
      if (f2 && S2 && p2 && (h2 || R2)) {
        s2.value = false;
        return;
      }
      t4.value = 0;
    }
  }), D2 = computed(() => {
    if (e2.swipeToClose === "none")
      return;
    const i2 = (() => {
      switch (e2.swipeToClose) {
        case "up":
        case "down":
          return "translateY";
        case "left":
        case "right":
          return "translateX";
      }
    })();
    return {
      class: { "vfm-bounce-back": !w2.value },
      style: { transform: `${i2}(${-t4.value}px)` }
    };
  });
  watch(
    () => r2.value,
    (i2) => {
      i2 || (t4.value = 0);
    }
  ), watch(
    () => s2.value,
    (i2) => {
      i2 && (t4.value = 0);
    }
  ), watch(
    () => t4.value,
    (i2, b2) => {
      switch (e2.swipeToClose) {
        case "down":
        case "right":
          f2 = i2 < b2;
          break;
        case "up":
        case "left":
          f2 = i2 > b2;
          break;
      }
    }
  );
  function k2(i2) {
    e2.preventNavigationGestures && i2.preventDefault();
  }
  function P(i2) {
    const b2 = i2 == null ? void 0 : i2.tagName;
    if (!b2 || ["INPUT", "TEXTAREA"].includes(b2))
      return false;
    const L = (() => {
      switch (e2.swipeToClose) {
        case "up":
          return (i2 == null ? void 0 : i2.scrollTop) + (i2 == null ? void 0 : i2.clientHeight) === (i2 == null ? void 0 : i2.scrollHeight);
        case "left":
          return (i2 == null ? void 0 : i2.scrollLeft) + (i2 == null ? void 0 : i2.clientWidth) === (i2 == null ? void 0 : i2.scrollWidth);
        case "down":
          return (i2 == null ? void 0 : i2.scrollTop) === 0;
        case "right":
          return (i2 == null ? void 0 : i2.scrollLeft) === 0;
        default:
          return false;
      }
    })();
    return i2 === n2.value ? L : L && P(i2 == null ? void 0 : i2.parentElement);
  }
  return {
    vfmContentEl: l2,
    swipeBannerEl: a2,
    bindSwipe: D2,
    onTouchStartSwipeBanner: k2
  };
}
const Ye = Symbol("vfm");
let H;
const Lo = (e2) => H = e2, Po = {
  install: q,
  modals: [],
  openedModals: [],
  openedModalOverlays: [],
  dynamicModals: [],
  modalsContainers: ref([]),
  get: () => {
  },
  toggle: () => {
  },
  open: () => {
  },
  close: () => {
  },
  closeAll: () => Promise.allSettled([])
}, Ao = () => getCurrentInstance() && inject(Ye, Po) || H;
function zo() {
  const e2 = shallowReactive([]), o2 = shallowReactive([]), l2 = shallowReactive([]), s2 = shallowReactive([]), u2 = ref([]), c2 = markRaw({
    install(a2) {
      a2.provide(Ye, c2), a2.config.globalProperties.$vfm = c2;
    },
    modals: e2,
    openedModals: o2,
    openedModalOverlays: l2,
    dynamicModals: s2,
    modalsContainers: u2,
    get(a2) {
      return e2.find((n2) => {
        var t4, r2;
        return ((r2 = (t4 = Z(n2)) == null ? void 0 : t4.value.modalId) == null ? void 0 : r2.value) === a2;
      });
    },
    toggle(a2, n2) {
      var r2;
      const t4 = c2.get(a2);
      return (r2 = Z(t4)) == null ? void 0 : r2.value.toggle(n2);
    },
    open(a2) {
      return c2.toggle(a2, true);
    },
    close(a2) {
      return c2.toggle(a2, false);
    },
    closeAll() {
      return Promise.allSettled(
        o2.reduce((a2, n2) => {
          const t4 = Z(n2), r2 = t4 == null ? void 0 : t4.value.toggle(false);
          return r2 && a2.push(r2), a2;
        }, [])
      );
    }
  });
  return Lo(c2), c2;
}
function Z(e2) {
  var o2;
  return (o2 = e2 == null ? void 0 : e2.exposed) == null ? void 0 : o2.modalExposed;
}
const Io = defineComponent({ inheritAttrs: false }), Ro = /* @__PURE__ */ defineComponent({
  ...Io,
  __name: "VueFinalModal",
  props: co,
  emits: ["update:modelValue", "beforeOpen", "opened", "beforeClose", "closed", "clickOutside"],
  setup(e2, { expose: o2, emit: l2 }) {
    const s2 = e2, u2 = l2, c2 = useAttrs(), a2 = getCurrentInstance(), { modals: n2, openedModals: t4, openedModalOverlays: r2 } = K(), m2 = ref(), f2 = ref(), { focus: M2, blur: S2 } = yo(s2, { focusEl: m2 }), { zIndex: V, refreshZIndex: O2, resetZIndex: E2 } = Eo(s2), { modelValueLocal: w2 } = po(s2, u2, { open: We, close: Xe }), { enableBodyScroll: D2, disableBodyScroll: k2 } = Vo(s2, {
      lockScrollEl: m2,
      modelValueLocal: w2
    });
    let P = q;
    const {
      visible: i2,
      contentVisible: b2,
      contentListeners: L,
      contentTransition: p2,
      overlayVisible: h2,
      overlayListeners: R2,
      overlayTransition: J,
      enterTransition: Q,
      leaveTransition: xe
    } = fo(s2, {
      modelValueLocal: w2,
      onEntering() {
        nextTick(() => {
          k2(), M2();
        });
      },
      onEnter() {
        u2("opened"), P("opened");
      },
      onLeave() {
        $$1(t4, a2), E2(), D2(), u2("closed"), P("closed");
      }
    }), { onEsc: ze, onMouseupRoot: Ge, onMousedown: Te } = vo(s2, u2, { vfmRootEl: m2, vfmContentEl: f2, visible: i2, modelValueLocal: w2 }), {
      swipeBannerEl: $e,
      bindSwipe: Ue,
      onTouchStartSwipeBanner: Se
    } = Do(s2, { vfmContentEl: f2, modelValueLocal: w2 }), Me = computed(() => a2 ? t4.indexOf(a2) : -1);
    watch([() => s2.zIndexFn, Me], () => {
      i2.value && O2(Me.value);
    }), onMounted(() => {
      fe(n2, a2);
    }), s2.modelValue && (w2.value = true);
    function We() {
      let d2 = false;
      return u2("beforeOpen", { stop: () => d2 = true }), d2 ? false : (fe(t4, a2), fe(r2, a2), ie2(), Q(), true);
    }
    function Xe() {
      let d2 = false;
      return u2("beforeClose", { stop: () => d2 = true }), d2 ? false : ($$1(r2, a2), ie2(), S2(), xe(), true);
    }
    function Ze() {
      w2.value = false;
    }
    onBeforeUnmount(() => {
      D2(), $$1(n2, a2), $$1(t4, a2), S2(), ie2();
    });
    async function ie2() {
      await nextTick();
      const d2 = r2.filter((y2) => {
        var A;
        const T2 = Z(y2);
        return (T2 == null ? void 0 : T2.value.overlayBehavior.value) === "auto" && !((A = T2 == null ? void 0 : T2.value.hideOverlay) != null && A.value);
      });
      d2.forEach((y2, T2) => {
        const A = Z(y2);
        A != null && A.value && (A.value.overlayVisible.value = T2 === d2.length - 1);
      });
    }
    const Ke = toRef(() => s2.modalId), ge = toRef(() => s2.hideOverlay), qe = toRef(() => s2.overlayBehavior), Je = computed(() => ({
      modalId: Ke,
      hideOverlay: ge,
      overlayBehavior: qe,
      overlayVisible: h2,
      toggle(d2) {
        return new Promise((y2) => {
          P = uo((A) => y2(A));
          const T2 = typeof d2 == "boolean" ? d2 : !w2.value;
          w2.value = T2;
        });
      }
    }));
    return o2({
      modalExposed: Je
    }), (d2, y2) => (openBlock(), createBlock(Teleport, {
      to: d2.teleportTo ? d2.teleportTo : void 0,
      disabled: !d2.teleportTo
    }, [
      d2.displayDirective !== "if" || unref(i2) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({ key: 0 }, unref(c2), {
        ref_key: "vfmRootEl",
        ref: m2,
        class: ["vfm vfm--fixed vfm--inset", { "vfm--prevent-none": d2.background === "interactive" }],
        style: { zIndex: unref(V) },
        role: "dialog",
        "aria-modal": "true",
        onKeydown: y2[7] || (y2[7] = withKeys(() => unref(ze)(), ["esc"])),
        onMouseup: y2[8] || (y2[8] = withModifiers(() => unref(Ge)(), ["self"])),
        onMousedown: y2[9] || (y2[9] = withModifiers((T2) => unref(Te)(T2), ["self"]))
      }), [
        ge.value ? createCommentVNode("", true) : (openBlock(), createBlock(Transition, mergeProps({ key: 0 }, unref(J), toHandlers(unref(R2))), {
          default: withCtx(() => [
            d2.displayDirective !== "if" || unref(h2) ? withDirectives((openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["vfm__overlay vfm--overlay vfm--absolute vfm--inset vfm--prevent-none", d2.overlayClass]),
              style: normalizeStyle(d2.overlayStyle),
              "aria-hidden": "true"
            }, null, 6)), [
              [vShow, d2.displayDirective !== "show" || unref(h2)],
              [unref(ve), d2.displayDirective !== "visible" || unref(h2)]
            ]) : createCommentVNode("", true)
          ]),
          _: 1
        }, 16)),
        createVNode(Transition, mergeProps(unref(p2), toHandlers(unref(L))), {
          default: withCtx(() => [
            d2.displayDirective !== "if" || unref(b2) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref_key: "vfmContentEl",
              ref: f2,
              class: ["vfm__content vfm--outline-none", [d2.contentClass, { "vfm--prevent-auto": d2.background === "interactive" }]],
              style: d2.contentStyle,
              tabindex: "0"
            }, unref(Ue), {
              onMousedown: y2[6] || (y2[6] = () => unref(Te)())
            }), [
              renderSlot(d2.$slots, "default", normalizeProps(guardReactiveProps({ close: Ze }))),
              d2.showSwipeBanner ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "swipeBannerEl",
                ref: $e,
                class: "vfm-swipe-banner-container",
                onTouchstart: y2[2] || (y2[2] = (T2) => unref(Se)(T2))
              }, [
                renderSlot(d2.$slots, "swipe-banner", {}, () => [
                  createElementVNode("div", {
                    class: "vfm-swipe-banner-back",
                    onTouchstart: y2[0] || (y2[0] = (T2) => d2.swipeToClose === "left" && T2.preventDefault())
                  }, null, 32),
                  createElementVNode("div", {
                    class: "vfm-swipe-banner-forward",
                    onTouchstart: y2[1] || (y2[1] = (T2) => d2.swipeToClose === "right" && T2.preventDefault())
                  }, null, 32)
                ])
              ], 544)) : !d2.showSwipeBanner && d2.preventNavigationGestures ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: "vfm-swipe-banner-container",
                onTouchstart: y2[5] || (y2[5] = (T2) => unref(Se)(T2))
              }, [
                createElementVNode("div", {
                  class: "vfm-swipe-banner-back",
                  onTouchstart: y2[3] || (y2[3] = (T2) => d2.swipeToClose === "left" && T2.preventDefault())
                }, null, 32),
                createElementVNode("div", {
                  class: "vfm-swipe-banner-forward",
                  onTouchstart: y2[4] || (y2[4] = (T2) => d2.swipeToClose === "right" && T2.preventDefault())
                }, null, 32)
              ], 32)) : createCommentVNode("", true)
            ], 16)), [
              [vShow, d2.displayDirective !== "show" || unref(b2)],
              [unref(ve), d2.displayDirective !== "visible" || unref(b2)]
            ]) : createCommentVNode("", true)
          ]),
          _: 3
        }, 16)
      ], 16)), [
        [vShow, d2.displayDirective !== "show" || unref(i2)],
        [unref(ve), d2.displayDirective !== "visible" || unref(i2)]
      ]) : createCommentVNode("", true)
    ], 8, ["to", "disabled"]));
  }
});
function K() {
  const e2 = Ao();
  if (!e2)
    throw new Error(
      `[Vue Final Modal]: getActiveVfm was called with no active Vfm. Did you forget to install vfm?
	const vfm = createVfm()
	app.use(vfm)
This will fail in production.`
    );
  return e2;
}
function re(e2) {
  return typeof e2 == "object" && e2 !== null ? "component" in e2 : false;
}
const jo = ["innerHTML"], Wo = /* @__PURE__ */ defineComponent({
  __name: "ModalsContainer",
  setup(e2) {
    const { modalsContainers: o2, dynamicModals: l2 } = K(), s2 = Symbol("ModalsContainer"), u2 = computed(() => {
      var n2;
      return s2 === ((n2 = o2.value) == null ? void 0 : n2[0]);
    });
    o2.value.push(s2), onBeforeUnmount(() => {
      o2.value = o2.value.filter((n2) => n2 !== s2);
    });
    function c2(n2) {
      var t4, r2, m2;
      (r2 = (t4 = l2[n2]) == null ? void 0 : t4.resolveClosed) == null || r2.call(t4), (m2 = l2[n2]) != null && m2.keepAlive || l2.splice(n2, 1);
    }
    function a2(n2) {
      var t4, r2;
      (r2 = (t4 = l2[n2]) == null ? void 0 : t4.resolveOpened) == null || r2.call(t4);
    }
    return (n2, t4) => u2.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(l2), (r2, m2) => (openBlock(), createBlock(resolveDynamicComponent(r2.component), mergeProps({
      key: r2.id
    }, {
      displayDirective: r2 != null && r2.keepAlive ? "show" : void 0,
      ...typeof r2.attrs == "object" ? r2.attrs : {}
    }, {
      modelValue: r2.modelValue,
      "onUpdate:modelValue": (f2) => r2.modelValue = f2,
      onClosed: () => c2(m2),
      onOpened: () => a2(m2)
    }), createSlots({ _: 2 }, [
      renderList(r2.slots, (f2, M2) => ({
        name: M2,
        fn: withCtx(() => [
          unref(we)(f2) ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: f2
          }, null, 8, jo)) : unref(re)(f2) ? (openBlock(), createBlock(resolveDynamicComponent(f2.component), normalizeProps(mergeProps({ key: 1 }, f2.attrs)), null, 16)) : (openBlock(), createBlock(resolveDynamicComponent(f2), { key: 2 }))
        ])
      }))
    ]), 1040, ["modelValue", "onUpdate:modelValue", "onClosed", "onOpened"]))), 128)) : createCommentVNode("", true);
  }
});
const _sfc_main$a = {
  __name: "ContactModal",
  __ssrInlineRender: true,
  setup(__props) {
    K();
    const options = useContactModalStore().options;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Ro), mergeProps({
        modelValue: unref(options).modelValue,
        "onUpdate:modelValue": ($event) => unref(options).modelValue = $event,
        "teleport-to": unref(options).teleportTo,
        "display-directive": unref(options).displayDirective,
        "hide-overlay": unref(options).hideOverlay,
        "overlay-transition": unref(options).overlayTransition,
        "content-transition": unref(options).contentTransition,
        "click-to-close": unref(options).clickToClose,
        "esc-to-close": unref(options).escToClose,
        background: unref(options).background,
        "lock-scroll": unref(options).lockScroll,
        "reserve-scroll-bar-gap": unref(options).reserveScrollBarGap,
        "swipe-to-close": unref(options).swipeToClose,
        class: "flex justify-center items-center",
        "content-class": "max-w-[450px] p-6 rounded-2xl bg-white flex-col gap-6 flex"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="flex items-start gap-6" data-v-46c26954${_scopeId}><div class="flex flex-col gap-2" data-v-46c26954${_scopeId}><p class="text-2xl font-bold RF-Dewi-Extended" data-v-46c26954${_scopeId}> Нужна консультация по выбору металлопроката? </p><p class="text-gray_icon" data-v-46c26954${_scopeId}> Оставьте заявку, и наш специалист свяжется с вами для подробной консультации. </p></div><div class="flex-shrink-0 pt-2" data-v-46c26954${_scopeId}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-46c26954${_scopeId}><path d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="#969696" data-v-46c26954${_scopeId}></path></svg></div></div><div class="flex flex-col gap-5" data-v-46c26954${_scopeId}><div class="input-label-block" data-v-46c26954${_scopeId}><label for="name" data-v-46c26954${_scopeId}>Имя и Фамилия <span data-v-46c26954${_scopeId}>*</span></label><label for="name" class="input-wrapper" data-v-46c26954${_scopeId}><input type="text" id="name"${ssrRenderAttr("value", unref(useContactModalStore)().options.data.name)} placeholder="Имя и фамилия" autocomplete="off" data-v-46c26954${_scopeId}></label></div><div class="input-label-block" data-v-46c26954${_scopeId}><label for="phone" data-v-46c26954${_scopeId}>Контактный телефон <span data-v-46c26954${_scopeId}>*</span></label><label for="phone" class="input-wrapper" data-v-46c26954${_scopeId}><input type="tel" id="phone"${ssrRenderAttr("value", unref(useContactModalStore)().options.data.phone)} placeholder="+7 (900) 000-00-00" autocomplete="off" data-v-46c26954${_scopeId}></label></div><div class="input-label-block" data-v-46c26954${_scopeId}><label for="time" data-v-46c26954${_scopeId}>Удобное для вас время</label><label for="time" class="input-wrapper" data-v-46c26954${_scopeId}><input type="text" id="time"${ssrRenderAttr("value", unref(useContactModalStore)().options.data.time)} placeholder="Пятница 12:00" autocomplete="off" data-v-46c26954${_scopeId}></label></div><div class="input-label-block" data-v-46c26954${_scopeId}><label for="email" data-v-46c26954${_scopeId}>E-mail</label><label for="email" class="input-wrapper" data-v-46c26954${_scopeId}><input type="email" id="email"${ssrRenderAttr("value", unref(useContactModalStore)().options.data.email)} placeholder="you@email.com" autocomplete="off" data-v-46c26954${_scopeId}></label>`);
            if (((_a = unref(useContactModalStore)().options.errors) == null ? void 0 : _a.length) > 0) {
              _push2(`<p class="text-red text-xs" data-v-46c26954${_scopeId}>${ssrInterpolate(unref(useContactModalStore)().options.errors[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><button class="btn text-center btn-primary justify-center" data-v-46c26954${_scopeId}> Заказать звонок </button>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start gap-6" }, [
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode("p", { class: "text-2xl font-bold RF-Dewi-Extended" }, " Нужна консультация по выбору металлопроката? "),
                  createVNode("p", { class: "text-gray_icon" }, " Оставьте заявку, и наш специалист свяжется с вами для подробной консультации. ")
                ]),
                createVNode("div", {
                  onClick: ($event) => unref(useContactModalStore)().closeModal(),
                  class: "flex-shrink-0 pt-2"
                }, [
                  (openBlock(), createBlock("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 14 14",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      d: "M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z",
                      fill: "#969696"
                    })
                  ]))
                ], 8, ["onClick"])
              ]),
              createVNode("div", { class: "flex flex-col gap-5" }, [
                createVNode("div", { class: "input-label-block" }, [
                  createVNode("label", { for: "name" }, [
                    createTextVNode("Имя и Фамилия "),
                    createVNode("span", null, "*")
                  ]),
                  createVNode("label", {
                    for: "name",
                    class: "input-wrapper"
                  }, [
                    withDirectives(createVNode("input", {
                      type: "text",
                      id: "name",
                      "onUpdate:modelValue": ($event) => unref(useContactModalStore)().options.data.name = $event,
                      placeholder: "Имя и фамилия",
                      autocomplete: "off"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(useContactModalStore)().options.data.name]
                    ])
                  ])
                ]),
                createVNode("div", { class: "input-label-block" }, [
                  createVNode("label", { for: "phone" }, [
                    createTextVNode("Контактный телефон "),
                    createVNode("span", null, "*")
                  ]),
                  createVNode("label", {
                    for: "phone",
                    class: "input-wrapper"
                  }, [
                    withDirectives(createVNode("input", {
                      type: "tel",
                      id: "phone",
                      "onUpdate:modelValue": ($event) => unref(useContactModalStore)().options.data.phone = $event,
                      placeholder: "+7 (900) 000-00-00",
                      autocomplete: "off"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(useContactModalStore)().options.data.phone]
                    ])
                  ])
                ]),
                createVNode("div", { class: "input-label-block" }, [
                  createVNode("label", { for: "time" }, "Удобное для вас время"),
                  createVNode("label", {
                    for: "time",
                    class: "input-wrapper"
                  }, [
                    withDirectives(createVNode("input", {
                      type: "text",
                      id: "time",
                      "onUpdate:modelValue": ($event) => unref(useContactModalStore)().options.data.time = $event,
                      placeholder: "Пятница 12:00",
                      autocomplete: "off"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(useContactModalStore)().options.data.time]
                    ])
                  ])
                ]),
                createVNode("div", { class: "input-label-block" }, [
                  createVNode("label", { for: "email" }, "E-mail"),
                  createVNode("label", {
                    for: "email",
                    class: "input-wrapper"
                  }, [
                    withDirectives(createVNode("input", {
                      type: "email",
                      id: "email",
                      "onUpdate:modelValue": ($event) => unref(useContactModalStore)().options.data.email = $event,
                      placeholder: "you@email.com",
                      autocomplete: "off"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(useContactModalStore)().options.data.email]
                    ])
                  ]),
                  ((_b = unref(useContactModalStore)().options.errors) == null ? void 0 : _b.length) > 0 ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-red text-xs"
                  }, toDisplayString(unref(useContactModalStore)().options.errors[0]), 1)) : createCommentVNode("", true)
                ])
              ]),
              createVNode("button", {
                class: "btn text-center btn-primary justify-center",
                onClick: ($event) => unref(useContactModalStore)().validate()
              }, " Заказать звонок ", 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modals/ContactModal.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const ContactModal = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-46c26954"]]);
const _sfc_main$9 = {
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const productStore = useProductStore();
    productStore.init();
    const settingStore = useSettingStore();
    settingStore.init();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, null, _parent));
      ssrRenderSlotInner(_ctx.$slots, "default", {
        key: _ctx.$page.url
      }, null, _push, _parent, null, true);
      _push(ssrRenderComponent(_sfc_main$b, null, null, _parent));
      _push(ssrRenderComponent(unref(Wo), null, null, _parent));
      _push(ssrRenderComponent(ContactModal, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Layout.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  __name: "catalog",
  __ssrInlineRender: true,
  props: {
    categories: Object
  },
  setup(__props) {
    const props = __props;
    const expandedCategories = ref(/* @__PURE__ */ new Set());
    const toggleCategory = (categoryId) => {
      if (expandedCategories.value.has(categoryId)) {
        expandedCategories.value.delete(categoryId);
      } else {
        expandedCategories.value.add(categoryId);
      }
    };
    const isExpanded = (categoryId) => expandedCategories.value.has(categoryId);
    const getTotalSubcategories = (category) => {
      var _a, _b;
      const nodesSubcategoriesCount = ((_a = category.nodes) == null ? void 0 : _a.reduce(
        (sum, nodeGroup) => sum + nodeGroup.subcategories.length,
        0
      )) || 0;
      const simpleSubcategoriesCount = ((_b = category.simple_subcategories) == null ? void 0 : _b.length) || 0;
      return nodesSubcategoriesCount + simpleSubcategoriesCount;
    };
    const getCurrentIndex = (category, nodeIndex, subcategoryIndex = 0) => {
      let index2 = 0;
      if (category.nodes) {
        for (let i2 = 0; i2 < nodeIndex; i2++) {
          index2 += category.nodes[i2].subcategories.length;
        }
        index2 += subcategoryIndex;
      }
      return index2;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Z$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-180894b7${_scopeId}>Каталог - КрафтСнаб</title><meta name="description" content="Каталог продуктов КрафтСнаб" data-v-180894b7${_scopeId}><meta property="og:description" content="Каталог продуктов КрафтСнаб" data-v-180894b7${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Каталог - КрафтСнаб"),
              createVNode("meta", {
                name: "description",
                content: "Каталог продуктов КрафтСнаб"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Каталог продуктов КрафтСнаб"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="flex flex-col py-14 gap-12" data-v-180894b7${_scopeId}><section class="flex flex-col items-center justify-center gap-6" data-v-180894b7${_scopeId}><div class="flex items-center gap-3" data-v-180894b7${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ie), {
              href: "/",
              class: "text-gray_icon/70"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Главная`);
                } else {
                  return [
                    createTextVNode("Главная")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-180894b7${_scopeId}><circle cx="3" cy="3" r="3" fill="#E3E3E3" data-v-180894b7${_scopeId}></circle></svg><span data-v-180894b7${_scopeId}>Каталог</span></div><h1 class="text-[56px] leading-none font-bold" data-v-180894b7${_scopeId}>Каталог</h1></section><section class="grid md:grid-cols-3 lg:grid-cols-4 gap-11 container mx-auto" data-v-180894b7${_scopeId}><!--[-->`);
            ssrRenderList(props.categories, (category) => {
              _push2(`<div class="catalog-item" data-v-180894b7${_scopeId}><img${ssrRenderAttr("src", `/storage/${category.image}`)}${ssrRenderAttr("alt", category.name)} data-v-180894b7${_scopeId}><div class="catalog-item-info" data-v-180894b7${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ie), {
                href: `/category/${category.id}`,
                class: "catalog-item-title transition-all hover:text-purple"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(category.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(category.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="catalog-items-container" data-v-180894b7${_scopeId}><!--[-->`);
              if (category.nodes) {
                _push2(`<!--[-->`);
                ssrRenderList(category.nodes, (nodeGroup, nodeIndex) => {
                  _push2(`<div style="${ssrRenderStyle(getCurrentIndex(
                    category,
                    nodeIndex
                  ) < 8 || isExpanded(category.id) ? null : { display: "none" })}" class="catalog-item-element-title" data-v-180894b7${_scopeId}><p class="py-1" data-v-180894b7${_scopeId}>${ssrInterpolate(nodeGroup.node.name)}</p><div class="flex flex-col gap-3 pl-2" data-v-180894b7${_scopeId}><!--[-->`);
                  ssrRenderList(nodeGroup.subcategories, (subcategory, subIndex) => {
                    _push2(ssrRenderComponent(unref(ie), {
                      style: getCurrentIndex(
                        category,
                        nodeIndex,
                        subIndex
                      ) < 8 || isExpanded(category.id) ? null : { display: "none" },
                      key: `node-sub-${subcategory.id}`,
                      href: `/category/${category.id}/${subcategory.id}`,
                      class: "catalog-item-element"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<span data-v-180894b7${_scopeId2}>${ssrInterpolate(subcategory.name)}</span><span data-v-180894b7${_scopeId2}>${ssrInterpolate(subcategory.products_count)} шт.</span>`);
                        } else {
                          return [
                            createVNode("span", null, toDisplayString(subcategory.name), 1),
                            createVNode("span", null, toDisplayString(subcategory.products_count) + " шт.", 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  });
                  _push2(`<!--]--></div></div>`);
                });
                _push2(`<!--]-->`);
              }
              ssrRenderList(category.simple_subcategories, (subcategory, index2) => {
                _push2(ssrRenderComponent(unref(ie), {
                  style: index2 < 8 || isExpanded(category.id) ? null : { display: "none" },
                  key: `simple-${subcategory.id}`,
                  href: `/category/${category.id}/${subcategory.id}`,
                  class: "catalog-item-element"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span data-v-180894b7${_scopeId2}>${ssrInterpolate(subcategory.name)}</span><span data-v-180894b7${_scopeId2}>${ssrInterpolate(subcategory.products_count)} шт.</span>`);
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(subcategory.name), 1),
                        createVNode("span", null, toDisplayString(subcategory.products_count) + " шт.", 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
              if (getTotalSubcategories(category) > 8) {
                _push2(`<div class="flex items-center gap-1 text-purple_2 cursor-pointer mt-2" data-v-180894b7${_scopeId}>${ssrInterpolate(isExpanded(category.id) ? "Скрыть" : "Показать еще")} <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none" class="${ssrRenderClass([{
                  "rotate-180": isExpanded(category.id)
                }, "transition-transform duration-300"])}" data-v-180894b7${_scopeId}><path d="M1 1L7 7L13 1" stroke="#7645EF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-180894b7${_scopeId}></path></svg></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--></section></main>`);
          } else {
            return [
              createVNode("main", { class: "flex flex-col py-14 gap-12" }, [
                createVNode("section", { class: "flex flex-col items-center justify-center gap-6" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(ie), {
                      href: "/",
                      class: "text-gray_icon/70"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Главная")
                      ]),
                      _: 1
                    }),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ])),
                    createVNode("span", null, "Каталог")
                  ]),
                  createVNode("h1", { class: "text-[56px] leading-none font-bold" }, "Каталог")
                ]),
                createVNode("section", { class: "grid md:grid-cols-3 lg:grid-cols-4 gap-11 container mx-auto" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.categories, (category) => {
                    return openBlock(), createBlock("div", { class: "catalog-item" }, [
                      createVNode("img", {
                        src: `/storage/${category.image}`,
                        alt: category.name
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "catalog-item-info" }, [
                        createVNode(unref(ie), {
                          href: `/category/${category.id}`,
                          class: "catalog-item-title transition-all hover:text-purple"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(category.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        createVNode("div", { class: "catalog-items-container" }, [
                          createVNode(TransitionGroup, { name: "list" }, {
                            default: withCtx(() => [
                              category.nodes ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(category.nodes, (nodeGroup, nodeIndex) => {
                                return withDirectives((openBlock(), createBlock("div", {
                                  key: `node-${nodeGroup.node.id}`,
                                  class: "catalog-item-element-title"
                                }, [
                                  createVNode("p", { class: "py-1" }, toDisplayString(nodeGroup.node.name), 1),
                                  createVNode("div", { class: "flex flex-col gap-3 pl-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(nodeGroup.subcategories, (subcategory, subIndex) => {
                                      return withDirectives((openBlock(), createBlock(unref(ie), {
                                        key: `node-sub-${subcategory.id}`,
                                        href: `/category/${category.id}/${subcategory.id}`,
                                        class: "catalog-item-element"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("span", null, toDisplayString(subcategory.name), 1),
                                          createVNode("span", null, toDisplayString(subcategory.products_count) + " шт.", 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["href"])), [
                                        [
                                          vShow,
                                          getCurrentIndex(
                                            category,
                                            nodeIndex,
                                            subIndex
                                          ) < 8 || isExpanded(category.id)
                                        ]
                                      ]);
                                    }), 128))
                                  ])
                                ], 512)), [
                                  [
                                    vShow,
                                    getCurrentIndex(
                                      category,
                                      nodeIndex
                                    ) < 8 || isExpanded(category.id)
                                  ]
                                ]);
                              }), 128)) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(category.simple_subcategories, (subcategory, index2) => {
                                return withDirectives((openBlock(), createBlock(unref(ie), {
                                  key: `simple-${subcategory.id}`,
                                  href: `/category/${category.id}/${subcategory.id}`,
                                  class: "catalog-item-element"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, toDisplayString(subcategory.name), 1),
                                    createVNode("span", null, toDisplayString(subcategory.products_count) + " шт.", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["href"])), [
                                  [
                                    vShow,
                                    index2 < 8 || isExpanded(category.id)
                                  ]
                                ]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024),
                          getTotalSubcategories(category) > 8 ? (openBlock(), createBlock("div", {
                            key: 0,
                            onClick: ($event) => toggleCategory(category.id),
                            class: "flex items-center gap-1 text-purple_2 cursor-pointer mt-2"
                          }, [
                            createTextVNode(toDisplayString(isExpanded(category.id) ? "Скрыть" : "Показать еще") + " ", 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "14",
                              height: "8",
                              viewBox: "0 0 14 8",
                              fill: "none",
                              class: [{
                                "rotate-180": isExpanded(category.id)
                              }, "transition-transform duration-300"]
                            }, [
                              createVNode("path", {
                                d: "M1 1L7 7L13 1",
                                stroke: "#7645EF",
                                "stroke-width": "1.6",
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round"
                              })
                            ], 2))
                          ], 8, ["onClick"])) : createCommentVNode("", true)
                        ])
                      ])
                    ]);
                  }), 256))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/catalog.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const catalog = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-180894b7"]]);
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: catalog
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  __name: "product",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object,
      required: true
    },
    specifications: {
      type: Array,
      required: true
    },
    specifications_all: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { specifications } = toRefs(props);
    const productStore = useProductStore();
    computed(() => [
      ...new Set(specifications.value.map((spec) => spec.key))
    ]);
    const specs = computed(() => {
      const result = {};
      specifications.value.forEach((spec) => {
        result[spec.key] = {
          value: spec.value,
          name: spec.name
        };
      });
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tooltip = resolveDirective("tooltip");
      _push(ssrRenderComponent(unref(ie), mergeProps({
        href: `/product/${__props.product.id}`,
        class: "product-item"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="flex items-center gap-6"${_scopeId}><img${ssrRenderAttr("src", `/storage/${__props.product.images[0]}`)} class="w-20 h-20 rounded-lg"${_scopeId}><div class="flex flex-col gap-4 max-w-[300px]"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><span class="text-gray_icon/70 text-sm"${_scopeId}> ГОСТ ${ssrInterpolate((_a = specs.value.gost) == null ? void 0 : _a.value)}</span><p${_scopeId}>${ssrInterpolate(__props.product.name)}</p></div><div class="flex flex-wrap items-center font-semibold gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(specs.value, (spec, key) => {
              _push2(`<!--[-->`);
              if (key !== "gost") {
                _push2(`<div class="flex items-center gap-1"${_scopeId}><span${ssrRenderAttrs(mergeProps({ class: "text-gray_icon/70 text-sm text-nowrap" }, ssrGetDirectiveProps(_ctx, _directive_tooltip, {
                  value: unref(productStore).getSpecification(
                    key,
                    props.specifications_all
                  ),
                  class: "custom-tooltip",
                  showDelay: 150,
                  hideDelay: 100
                }, void 0, { top: true })))}${_scopeId}>${ssrInterpolate(spec.value)}</span>`);
                if (key !== Object.keys(specs.value).filter(
                  (k2) => k2 !== "gost"
                )[Object.keys(specs.value).filter(
                  (k2) => k2 !== "gost"
                ).length - 1]) {
                  _push2(`<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><circle cx="3" cy="3" r="3" fill="#E3E3E3"${_scopeId}></circle></svg>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div></div></div><button class="btn btn-white"${_scopeId}>Связаться</button>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-6" }, [
                createVNode("img", {
                  src: `/storage/${__props.product.images[0]}`,
                  class: "w-20 h-20 rounded-lg"
                }, null, 8, ["src"]),
                createVNode("div", { class: "flex flex-col gap-4 max-w-[300px]" }, [
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("span", { class: "text-gray_icon/70 text-sm" }, " ГОСТ " + toDisplayString((_b = specs.value.gost) == null ? void 0 : _b.value), 1),
                    createVNode("p", null, toDisplayString(__props.product.name), 1)
                  ]),
                  createVNode("div", { class: "flex flex-wrap items-center font-semibold gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(specs.value, (spec, key) => {
                      return openBlock(), createBlock(Fragment, { key }, [
                        key !== "gost" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-1"
                        }, [
                          withDirectives((openBlock(), createBlock("span", { class: "text-gray_icon/70 text-sm text-nowrap" }, [
                            createTextVNode(toDisplayString(spec.value), 1)
                          ])), [
                            [
                              _directive_tooltip,
                              {
                                value: unref(productStore).getSpecification(
                                  key,
                                  props.specifications_all
                                ),
                                class: "custom-tooltip",
                                showDelay: 150,
                                hideDelay: 100
                              },
                              void 0,
                              { top: true }
                            ]
                          ]),
                          key !== Object.keys(specs.value).filter(
                            (k2) => k2 !== "gost"
                          )[Object.keys(specs.value).filter(
                            (k2) => k2 !== "gost"
                          ).length - 1] ? (openBlock(), createBlock("svg", {
                            key: 0,
                            width: "6",
                            height: "6",
                            viewBox: "0 0 6 6",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("circle", {
                              cx: "3",
                              cy: "3",
                              r: "3",
                              fill: "#E3E3E3"
                            })
                          ])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("button", { class: "btn btn-white" }, "Связаться")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/product.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "category",
  __ssrInlineRender: true,
  props: {
    category: Object,
    subcategories: Array,
    products: Object,
    is_nodes: Boolean,
    specifications_all: Array
  },
  setup(__props) {
    const props = __props;
    ref(1);
    const totalPages = ref(
      Math.ceil(props.products.total / props.products.per_page)
    );
    const goToPage = (page) => {
      const pageNumber = Number(page);
      if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        window.location.href = `?page=${pageNumber}`;
      }
    };
    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l2;
      for (let i2 = 1; i2 <= totalPages.value; i2++) {
        if (i2 === 1 || i2 === totalPages.value || i2 >= props.products.current_page - delta && i2 <= props.products.current_page + delta) {
          range.push(i2);
        }
      }
      for (let i2 of range) {
        if (l2) {
          if (i2 - l2 === 2) {
            rangeWithDots.push(l2 + 1);
          } else if (i2 - l2 !== 1) {
            rangeWithDots.push("...");
          }
        }
        rangeWithDots.push(i2);
        l2 = i2;
      }
      return rangeWithDots;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Z$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(props.category.name)} - КрафтСнаб</title><meta name="description" content="Каталог продуктов КрафтСнаб"${_scopeId}><meta property="og:description" content="Каталог продуктов КрафтСнаб"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(props.category.name) + " - КрафтСнаб", 1),
              createVNode("meta", {
                name: "description",
                content: "Каталог продуктов КрафтСнаб"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Каталог продуктов КрафтСнаб"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="flex flex-col py-14 gap-12"${_scopeId}><section class="flex flex-col items-center justify-center gap-6"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><a class="text-gray_icon/70" href="/"${_scopeId}>Главная</a><svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><circle cx="3" cy="3" r="3" fill="#E3E3E3"${_scopeId}></circle></svg><a class="text-gray_icon/70" href="/catalog"${_scopeId}>Каталог</a><svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><circle cx="3" cy="3" r="3" fill="#E3E3E3"${_scopeId}></circle></svg><span${_scopeId}>${ssrInterpolate(props.category.name)}</span></div><h1 class="text-[56px] leading-none font-bold"${_scopeId}>${ssrInterpolate(props.category.name)}</h1></section><section class="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(props.subcategories, (subcategory) => {
              _push2(ssrRenderComponent(unref(ie), {
                href: `${props.is_nodes ? "/node/" + subcategory.id : "/category/" + props.category.id + "/" + subcategory.id}`,
                class: "products-card"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", "/storage/" + subcategory.image)} class="w-10 h-10 rounded-lg" alt="" srcset=""${_scopeId2}><div class="flex flex-col gap-2"${_scopeId2}><p${_scopeId2}>${ssrInterpolate(subcategory.name)}</p><span class="text-sm"${_scopeId2}>${ssrInterpolate(subcategory.products_count)} товаров</span></div>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: "/storage/" + subcategory.image,
                        class: "w-10 h-10 rounded-lg",
                        alt: "",
                        srcset: ""
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("p", null, toDisplayString(subcategory.name), 1),
                        createVNode("span", { class: "text-sm" }, toDisplayString(subcategory.products_count) + " товаров", 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></section><section class="flex container mx-auto flex-col gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(props.products.data, (product) => {
              _push2(ssrRenderComponent(_sfc_main$7, {
                key: `${product.id}-${JSON.stringify(
                  product.specifications
                )}`,
                product,
                specifications: product.specifications,
                specifications_all: props.specifications_all
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
            if (props.products.total > 0) {
              _push2(`<div class="flex justify-center gap-5 mt-8"${_scopeId}><button${ssrIncludeBooleanAttr(props.products.current_page === 1) ? " disabled" : ""}${_scopeId}><svg width="7.500000" height="13.333313" viewBox="0 0 7.5 13.3333" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path id="Icon" d="M7.25 0.24C7.58 0.56 7.58 1.09 7.25 1.42L2.01 6.66L7.25 11.91C7.58 12.23 7.58 12.76 7.25 13.08C6.93 13.41 6.4 13.41 6.07 13.08L0.24 7.25C-0.09 6.93 -0.09 6.4 0.24 6.07L6.07 0.24C6.4 -0.09 6.93 -0.09 7.25 0.24Z"${ssrRenderAttr(
                "fill",
                props.products.current_page === 1 ? "#CCCCCC" : "#000000"
              )}${_scopeId}></path></svg></button><div class="flex gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(getVisiblePages(), (page) => {
                _push2(`<!--[-->`);
                if (page === "...") {
                  _push2(`<span class="w-12 h-12 items-center justify-center flex"${_scopeId}>${ssrInterpolate(page)}</span>`);
                } else {
                  _push2(`<span class="${ssrRenderClass([{
                    "bg-black text-white": page === props.products.current_page
                  }, "rounded-2xl w-12 h-12 items-center justify-center flex"])}" style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId}>${ssrInterpolate(page)}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div><button${ssrIncludeBooleanAttr(props.products.current_page === totalPages.value) ? " disabled" : ""}${_scopeId}><svg width="7.500000" height="13.333313" viewBox="0 0 7.5 13.3333" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path id="Icon" d="M0.24 0.24C-0.09 0.56 -0.09 1.09 0.24 1.42L5.48 6.66L0.24 11.91C-0.09 12.23 -0.09 12.76 0.24 13.08C0.56 13.41 1.09 13.41 1.42 13.08L7.25 7.25C7.58 6.93 7.58 6.4 7.25 6.07L1.42 0.24C1.09 -0.09 0.56 -0.09 0.24 0.24Z"${ssrRenderAttr(
                "fill",
                props.products.current_page === totalPages.value ? "#CCCCCC" : "#000000"
              )}${_scopeId}></path></svg></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section></main>`);
          } else {
            return [
              createVNode("main", { class: "flex flex-col py-14 gap-12" }, [
                createVNode("section", { class: "flex flex-col items-center justify-center gap-6" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("a", {
                      class: "text-gray_icon/70",
                      href: "/"
                    }, "Главная"),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ])),
                    createVNode("a", {
                      class: "text-gray_icon/70",
                      href: "/catalog"
                    }, "Каталог"),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ])),
                    createVNode("span", null, toDisplayString(props.category.name), 1)
                  ]),
                  createVNode("h1", { class: "text-[56px] leading-none font-bold" }, toDisplayString(props.category.name), 1)
                ]),
                createVNode("section", { class: "container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.subcategories, (subcategory) => {
                    return openBlock(), createBlock(unref(ie), {
                      href: `${props.is_nodes ? "/node/" + subcategory.id : "/category/" + props.category.id + "/" + subcategory.id}`,
                      class: "products-card"
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: "/storage/" + subcategory.image,
                          class: "w-10 h-10 rounded-lg",
                          alt: "",
                          srcset: ""
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "flex flex-col gap-2" }, [
                          createVNode("p", null, toDisplayString(subcategory.name), 1),
                          createVNode("span", { class: "text-sm" }, toDisplayString(subcategory.products_count) + " товаров", 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["href"]);
                  }), 256))
                ]),
                createVNode("section", { class: "flex container mx-auto flex-col gap-2" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.products.data, (product) => {
                    return openBlock(), createBlock(_sfc_main$7, {
                      key: `${product.id}-${JSON.stringify(
                        product.specifications
                      )}`,
                      product,
                      specifications: product.specifications,
                      specifications_all: props.specifications_all
                    }, null, 8, ["product", "specifications", "specifications_all"]);
                  }), 128)),
                  props.products.total > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center gap-5 mt-8"
                  }, [
                    createVNode("button", {
                      onClick: ($event) => goToPage(props.products.current_page - 1),
                      disabled: props.products.current_page === 1
                    }, [
                      (openBlock(), createBlock("svg", {
                        width: "7.500000",
                        height: "13.333313",
                        viewBox: "0 0 7.5 13.3333",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          id: "Icon",
                          d: "M7.25 0.24C7.58 0.56 7.58 1.09 7.25 1.42L2.01 6.66L7.25 11.91C7.58 12.23 7.58 12.76 7.25 13.08C6.93 13.41 6.4 13.41 6.07 13.08L0.24 7.25C-0.09 6.93 -0.09 6.4 0.24 6.07L6.07 0.24C6.4 -0.09 6.93 -0.09 7.25 0.24Z",
                          fill: props.products.current_page === 1 ? "#CCCCCC" : "#000000"
                        }, null, 8, ["fill"])
                      ]))
                    ], 8, ["onClick", "disabled"]),
                    createVNode("div", { class: "flex gap-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(getVisiblePages(), (page) => {
                        return openBlock(), createBlock(Fragment, { key: page }, [
                          page === "..." ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "w-12 h-12 items-center justify-center flex"
                          }, toDisplayString(page), 1)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: ["rounded-2xl w-12 h-12 items-center justify-center flex", {
                              "bg-black text-white": page === props.products.current_page
                            }],
                            onClick: ($event) => goToPage(page),
                            style: { "cursor": "pointer" }
                          }, toDisplayString(page), 11, ["onClick"]))
                        ], 64);
                      }), 128))
                    ]),
                    createVNode("button", {
                      onClick: ($event) => goToPage(props.products.current_page + 1),
                      disabled: props.products.current_page === totalPages.value
                    }, [
                      (openBlock(), createBlock("svg", {
                        width: "7.500000",
                        height: "13.333313",
                        viewBox: "0 0 7.5 13.3333",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          id: "Icon",
                          d: "M0.24 0.24C-0.09 0.56 -0.09 1.09 0.24 1.42L5.48 6.66L0.24 11.91C-0.09 12.23 -0.09 12.76 0.24 13.08C0.56 13.41 1.09 13.41 1.42 13.08L7.25 7.25C7.58 6.93 7.58 6.4 7.25 6.07L1.42 0.24C1.09 -0.09 0.56 -0.09 0.24 0.24Z",
                          fill: props.products.current_page === totalPages.value ? "#CCCCCC" : "#000000"
                        }, null, 8, ["fill"])
                      ]))
                    ], 8, ["onClick", "disabled"])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/category.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  __name: "contact",
  __ssrInlineRender: true,
  props: {
    categories: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Z$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Контакты - КрафтСнаб</title><meta name="description" content="Контакты КрафтСнаб"${_scopeId}><meta property="og:description" content="Контакты КрафтСнаб"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Контакты - КрафтСнаб"),
              createVNode("meta", {
                name: "description",
                content: "Контакты КрафтСнаб"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Контакты КрафтСнаб"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="flex flex-col py-14 gap-12"${_scopeId}><section class="flex flex-col items-center justify-center gap-6"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ie), {
              href: "/",
              class: "text-gray_icon/70"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Главная`);
                } else {
                  return [
                    createTextVNode("Главная")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><circle cx="3" cy="3" r="3" fill="#E3E3E3"${_scopeId}></circle></svg><span${_scopeId}>Каталог</span></div><h1 class="text-[56px] leading-none font-bold"${_scopeId}>Контакты</h1></section><section class="grid container mx-auto grid-cols-1 lg:grid-cols-2 gap-5"${_scopeId}><div class="flex flex-col gap-6 md:order-1 order-2"${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><p class="text-sm leading-none font-semibold text-gray_icon/70"${_scopeId}> Название организации </p><p class="text-semibold font-bold text-xl"${_scopeId}> Общество с ограниченной ответственностью «КрафтСнаб» </p></div><div class="flex flex-col gap-2"${_scopeId}><p class="text-sm leading-none font-semibold text-gray_icon/70"${_scopeId}> Режим работы </p><p class="text-semibold font-bold"${_scopeId}> с 9:00 до 17:00, сб - вс выходной. </p></div><div class="flex flex-col gap-2"${_scopeId}><p class="text-sm leading-none font-semibold text-gray_icon/70"${_scopeId}> Юридический/Фактический адрес </p><p class="text-semibold font-bold"${_scopeId}> 350075, Краснодарский край, г. Краснодар, ул. им. Стасова, д. 182/1, этаж 3, помещ. 3. </p></div><div class="flex items-center gap-6"${_scopeId}><div class="flex flex-col gap-3"${_scopeId}><p class="text-sm leading-none font-semibold text-gray_icon/70"${_scopeId}> ИНН </p><p class="text-xl leading-none font-semibold"${_scopeId}> 2312324484 </p></div><div class="flex flex-col gap-3"${_scopeId}><p class="text-sm leading-none font-semibold text-gray_icon/70"${_scopeId}> КПП </p><p class="text-xl leading-none font-semibold"${_scopeId}> 231201001 </p></div><div class="flex flex-col gap-3"${_scopeId}><p class="text-sm leading-none font-semibold text-gray_icon/70"${_scopeId}> ОГРН </p><p class="text-xl leading-none font-semibold"${_scopeId}> 1242300003967 </p></div></div><div class="flex flex-col gap-2"${_scopeId}><p class="text-sm leading-none font-semibold text-gray_icon/70"${_scopeId}> Почтовый адрес </p><p class="text-semibold font-bold"${_scopeId}> 350075, Краснодарский край, г. Краснодар, ул. им. Стасова, д. 182/1, этаж 3, офис 301. </p></div><div class="flex flex-col gap-2"${_scopeId}><p class="text-sm leading-none font-semibold text-gray_icon/70"${_scopeId}> Связаться с нами </p><div class="flex items-center gap-3 flex-wrap"${_scopeId}><a href="" class="btn btn-primary"${_scopeId}>Заказать звонок</a><a href="" class="btn btn-secondary tracking-normal"${_scopeId}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M8.71244 3.87223C8.78294 3.51086 9.13305 3.27506 9.49443 3.34557C10.2758 3.49802 10.9939 3.88017 11.5569 4.44312C12.1198 5.00606 12.502 5.72418 12.6544 6.50557C12.7249 6.86694 12.4891 7.21705 12.1278 7.28756C11.7664 7.35806 11.4163 7.12227 11.3458 6.76089C11.2441 6.23997 10.9894 5.76122 10.6141 5.38592C10.2388 5.01063 9.76003 4.75586 9.2391 4.65423C8.87773 4.58372 8.64193 4.23361 8.71244 3.87223Z" fill="#D6D6D6"${_scopeId}></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.70418 1.25962C8.74483 0.893682 9.07444 0.629986 9.44038 0.670639C10.9435 0.837629 12.3453 1.51077 13.4154 2.57953C14.4855 3.6483 15.1604 5.04916 15.3293 6.55212C15.3704 6.91801 15.1071 7.24795 14.7412 7.28906C14.3753 7.33017 14.0454 7.06689 14.0043 6.701C13.8692 5.49864 13.3292 4.37795 12.4732 3.52294C11.6171 2.66792 10.4957 2.12941 9.29316 1.99582C8.92722 1.95517 8.66352 1.62556 8.70418 1.25962Z" fill="#D6D6D6"${_scopeId}></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.22536 11.8347C2.60275 10.2121 1.42287 8.19142 0.795817 5.98526C0.697478 5.63925 0.621221 5.37094 0.620126 5.00301C0.618874 4.58249 0.755879 4.05567 0.961832 3.68904C1.31602 3.05853 2.07653 2.25049 2.73341 1.91824C3.30097 1.63117 3.97124 1.63117 4.5388 1.91824C5.0959 2.20002 5.73495 2.85229 6.07423 3.37412C6.50522 4.03701 6.50522 4.89159 6.07423 5.55449C5.95873 5.73212 5.79411 5.89646 5.60301 6.08724C5.5435 6.14665 5.478 6.18958 5.5215 6.28017C5.95338 7.17969 6.54237 8.02342 7.28949 8.77054C8.03661 9.51766 8.88034 10.1067 9.77986 10.5385C9.87299 10.5832 9.91116 10.5188 9.97279 10.457C10.1636 10.2659 10.3279 10.1013 10.5055 9.9858C11.1684 9.55481 12.023 9.55481 12.6859 9.9858C13.2077 10.3251 13.86 10.9641 14.1418 11.5212C14.4289 12.0888 14.4289 12.7591 14.1418 13.3266C13.812 13.9786 13.0106 14.7389 12.371 15.0982C12.0044 15.3041 11.4775 15.4412 11.057 15.4399C10.6891 15.4388 10.4208 15.3625 10.0748 15.2642C7.86862 14.6372 5.84795 13.4573 4.22536 11.8347Z" fill="#D6D6D6"${_scopeId}></path></svg> +7(861)200-00-00</a><a href="" class="btn btn-green"${_scopeId}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00036 16C6.49203 15.9957 5.0157 15.5629 3.74418 14.7497L0 16L1.24807 12.248C0.308295 10.7445 -0.106676 8.97051 0.0682648 7.2062C0.244273 5.44081 1.00164 3.78336 2.21983 2.49673C3.43802 1.20903 5.04876 0.363745 6.79923 0.0933803C8.54971 -0.176984 10.3397 0.143603 11.8885 1.00492C13.4363 1.86517 14.6556 3.21699 15.3532 4.84666C16.0519 6.4774 16.1885 8.29407 15.7437 10.0114C15.2988 11.7287 14.2961 13.2483 12.8945 14.3329C11.4928 15.4165 9.77111 16.0032 8.00036 16ZM9.73911 9.19919C10.2714 9.37338 10.8122 9.51764 11.3605 9.63198C11.4181 9.64053 11.4736 9.66086 11.5227 9.69078C11.5728 9.72177 11.6165 9.7613 11.6496 9.80939C11.6837 9.85641 11.7072 9.90986 11.72 9.96756C11.7328 10.0242 11.7339 10.083 11.7232 10.1407V10.4431C11.7285 10.5531 11.7083 10.6622 11.6635 10.7626C11.6197 10.8631 11.5515 10.9528 11.4672 11.0223C11.2048 11.2895 10.8933 11.5042 10.5498 11.6549C10.0431 11.7148 9.53002 11.671 9.04253 11.5235C8.55398 11.376 8.10171 11.1302 7.71236 10.8C7.21101 10.4634 6.74272 10.0787 6.31497 9.65122C5.88935 9.22056 5.50318 8.75143 5.1629 8.25024C4.83648 7.86019 4.59222 7.4071 4.44714 6.91874C4.30314 6.43144 4.25938 5.9185 4.32018 5.41304C4.47059 5.07107 4.68396 4.76117 4.94957 4.49828C5.01678 4.41172 5.1053 4.34332 5.20558 4.29951C5.30585 4.2557 5.41677 4.23647 5.52558 4.24609H5.83493C5.9512 4.23006 6.06963 4.26104 6.1635 4.33157C6.25843 4.40317 6.32029 4.50897 6.33629 4.62545C6.4963 5.25808 6.61364 5.71546 6.77365 6.2284C6.83765 6.44213 6.76297 6.49342 6.59229 6.62166C6.48562 6.70394 6.40031 6.76379 6.31497 6.82791C6.2659 6.84928 6.22109 6.88133 6.18482 6.92087C6.14855 6.96041 6.1208 7.00743 6.10373 7.05872C6.08666 7.11002 6.08026 7.16452 6.0856 7.21795C6.09093 7.27138 6.10694 7.32375 6.13361 7.37077C6.40562 7.89547 6.75444 8.37742 7.16833 8.8006C7.58968 9.21523 8.07183 9.56362 8.59772 9.83398C8.64466 9.85963 8.69693 9.8767 8.75027 9.88098C8.8036 9.88632 8.85799 9.87991 8.90919 9.86281C8.9604 9.84571 9.00734 9.81902 9.04787 9.78268C9.08734 9.74635 9.11936 9.70253 9.14176 9.65338C9.20576 9.56682 9.2591 9.48665 9.34443 9.37445C9.3583 9.33597 9.37855 9.30073 9.40629 9.2708C9.43295 9.24088 9.46603 9.21629 9.50336 9.19919C9.53963 9.18209 9.58018 9.17247 9.62072 9.1714C9.66125 9.17033 9.70178 9.17676 9.73911 9.19172V9.19919Z" fill="white"${_scopeId}></path></svg> WhatsApp</a><a href="" class="btn btn-blue"${_scopeId}><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M13.697 12.8824C13.6765 13.1132 13.5874 13.3324 13.4425 13.5121C13.2988 13.6907 13.1048 13.8218 12.8857 13.8879C12.6667 13.954 12.4339 13.9517 12.2171 13.8821C11.9992 13.8125 11.8075 13.678 11.666 13.4959C10.4223 12.4903 8.48257 11.0429 8.48257 11.0429C8.48257 11.0429 7.07911 13.5562 6.82809 13.8137C6.7448 13.8844 6.64897 13.9378 6.54513 13.9679C6.44016 13.9992 6.33176 14.0074 6.2245 13.9934C6.11611 13.9784 6.01343 13.9413 5.921 13.8833C5.82858 13.8264 5.74869 13.7499 5.68708 13.6594C5.67453 13.62 5.65858 13.5806 5.64146 13.5434L6.42873 9.53981L12.0425 3.93455L4.38634 8.37538C4.38634 8.37538 0.929062 7.32463 0.415607 7.11935C0.283249 7.04628 0.173711 6.93608 0.100686 6.80154C0.0276613 6.66701 -0.00771649 6.51508 0.00141161 6.36198C0.00939869 6.20889 0.0607685 6.06159 0.147485 5.93634C0.235343 5.81108 0.356282 5.71365 0.495486 5.65566C1.22573 5.27757 14.1078 0.276547 14.5413 0.14781C14.9749 0.0190732 16.1159 -0.316109 15.9904 0.81237C15.8649 1.94085 13.8225 12.263 13.697 12.8824Z" fill="white"${_scopeId}></path></svg> Telegram</a><a href="" class="btn btn-blue"${_scopeId}><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M13.697 12.8824C13.6765 13.1132 13.5874 13.3324 13.4425 13.5121C13.2988 13.6907 13.1048 13.8218 12.8857 13.8879C12.6667 13.954 12.4339 13.9517 12.2171 13.8821C11.9992 13.8125 11.8075 13.678 11.666 13.4959C10.4223 12.4903 8.48257 11.0429 8.48257 11.0429C8.48257 11.0429 7.07911 13.5562 6.82809 13.8137C6.7448 13.8844 6.64897 13.9378 6.54513 13.9679C6.44016 13.9992 6.33176 14.0074 6.2245 13.9934C6.11611 13.9784 6.01343 13.9413 5.921 13.8833C5.82858 13.8264 5.74869 13.7499 5.68708 13.6594C5.67453 13.62 5.65858 13.5806 5.64146 13.5434L6.42873 9.53981L12.0425 3.93455L4.38634 8.37538C4.38634 8.37538 0.929062 7.32463 0.415607 7.11935C0.283249 7.04628 0.173711 6.93608 0.100686 6.80154C0.0276613 6.66701 -0.00771649 6.51508 0.00141161 6.36198C0.00939869 6.20889 0.0607685 6.06159 0.147485 5.93634C0.235343 5.81108 0.356282 5.71365 0.495486 5.65566C1.22573 5.27757 14.1078 0.276547 14.5413 0.14781C14.9749 0.0190732 16.1159 -0.316109 15.9904 0.81237C15.8649 1.94085 13.8225 12.263 13.697 12.8824Z" fill="white"${_scopeId}></path></svg> ВКонтакте</a></div></div></div><iframe class="md:order-2 order-1" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab6968cc1cc65d7df7317f1394e27a03d3af9a3a375e5f83edd6f7e070ba356bf&amp;source=constructor" width="100%" style="${ssrRenderStyle({ "height": "100%", "min-height": "400px" })}" frameborder="0"${_scopeId}></iframe></section></main>`);
          } else {
            return [
              createVNode("main", { class: "flex flex-col py-14 gap-12" }, [
                createVNode("section", { class: "flex flex-col items-center justify-center gap-6" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(unref(ie), {
                      href: "/",
                      class: "text-gray_icon/70"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Главная")
                      ]),
                      _: 1
                    }),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ])),
                    createVNode("span", null, "Каталог")
                  ]),
                  createVNode("h1", { class: "text-[56px] leading-none font-bold" }, "Контакты")
                ]),
                createVNode("section", { class: "grid container mx-auto grid-cols-1 lg:grid-cols-2 gap-5" }, [
                  createVNode("div", { class: "flex flex-col gap-6 md:order-1 order-2" }, [
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("p", { class: "text-sm leading-none font-semibold text-gray_icon/70" }, " Название организации "),
                      createVNode("p", { class: "text-semibold font-bold text-xl" }, " Общество с ограниченной ответственностью «КрафтСнаб» ")
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("p", { class: "text-sm leading-none font-semibold text-gray_icon/70" }, " Режим работы "),
                      createVNode("p", { class: "text-semibold font-bold" }, " с 9:00 до 17:00, сб - вс выходной. ")
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("p", { class: "text-sm leading-none font-semibold text-gray_icon/70" }, " Юридический/Фактический адрес "),
                      createVNode("p", { class: "text-semibold font-bold" }, " 350075, Краснодарский край, г. Краснодар, ул. им. Стасова, д. 182/1, этаж 3, помещ. 3. ")
                    ]),
                    createVNode("div", { class: "flex items-center gap-6" }, [
                      createVNode("div", { class: "flex flex-col gap-3" }, [
                        createVNode("p", { class: "text-sm leading-none font-semibold text-gray_icon/70" }, " ИНН "),
                        createVNode("p", { class: "text-xl leading-none font-semibold" }, " 2312324484 ")
                      ]),
                      createVNode("div", { class: "flex flex-col gap-3" }, [
                        createVNode("p", { class: "text-sm leading-none font-semibold text-gray_icon/70" }, " КПП "),
                        createVNode("p", { class: "text-xl leading-none font-semibold" }, " 231201001 ")
                      ]),
                      createVNode("div", { class: "flex flex-col gap-3" }, [
                        createVNode("p", { class: "text-sm leading-none font-semibold text-gray_icon/70" }, " ОГРН "),
                        createVNode("p", { class: "text-xl leading-none font-semibold" }, " 1242300003967 ")
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("p", { class: "text-sm leading-none font-semibold text-gray_icon/70" }, " Почтовый адрес "),
                      createVNode("p", { class: "text-semibold font-bold" }, " 350075, Краснодарский край, г. Краснодар, ул. им. Стасова, д. 182/1, этаж 3, офис 301. ")
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("p", { class: "text-sm leading-none font-semibold text-gray_icon/70" }, " Связаться с нами "),
                      createVNode("div", { class: "flex items-center gap-3 flex-wrap" }, [
                        createVNode("a", {
                          href: "",
                          class: "btn btn-primary"
                        }, "Заказать звонок"),
                        createVNode("a", {
                          href: "",
                          class: "btn btn-secondary tracking-normal"
                        }, [
                          (openBlock(), createBlock("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d: "M8.71244 3.87223C8.78294 3.51086 9.13305 3.27506 9.49443 3.34557C10.2758 3.49802 10.9939 3.88017 11.5569 4.44312C12.1198 5.00606 12.502 5.72418 12.6544 6.50557C12.7249 6.86694 12.4891 7.21705 12.1278 7.28756C11.7664 7.35806 11.4163 7.12227 11.3458 6.76089C11.2441 6.23997 10.9894 5.76122 10.6141 5.38592C10.2388 5.01063 9.76003 4.75586 9.2391 4.65423C8.87773 4.58372 8.64193 4.23361 8.71244 3.87223Z",
                              fill: "#D6D6D6"
                            }),
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d: "M8.70418 1.25962C8.74483 0.893682 9.07444 0.629986 9.44038 0.670639C10.9435 0.837629 12.3453 1.51077 13.4154 2.57953C14.4855 3.6483 15.1604 5.04916 15.3293 6.55212C15.3704 6.91801 15.1071 7.24795 14.7412 7.28906C14.3753 7.33017 14.0454 7.06689 14.0043 6.701C13.8692 5.49864 13.3292 4.37795 12.4732 3.52294C11.6171 2.66792 10.4957 2.12941 9.29316 1.99582C8.92722 1.95517 8.66352 1.62556 8.70418 1.25962Z",
                              fill: "#D6D6D6"
                            }),
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d: "M4.22536 11.8347C2.60275 10.2121 1.42287 8.19142 0.795817 5.98526C0.697478 5.63925 0.621221 5.37094 0.620126 5.00301C0.618874 4.58249 0.755879 4.05567 0.961832 3.68904C1.31602 3.05853 2.07653 2.25049 2.73341 1.91824C3.30097 1.63117 3.97124 1.63117 4.5388 1.91824C5.0959 2.20002 5.73495 2.85229 6.07423 3.37412C6.50522 4.03701 6.50522 4.89159 6.07423 5.55449C5.95873 5.73212 5.79411 5.89646 5.60301 6.08724C5.5435 6.14665 5.478 6.18958 5.5215 6.28017C5.95338 7.17969 6.54237 8.02342 7.28949 8.77054C8.03661 9.51766 8.88034 10.1067 9.77986 10.5385C9.87299 10.5832 9.91116 10.5188 9.97279 10.457C10.1636 10.2659 10.3279 10.1013 10.5055 9.9858C11.1684 9.55481 12.023 9.55481 12.6859 9.9858C13.2077 10.3251 13.86 10.9641 14.1418 11.5212C14.4289 12.0888 14.4289 12.7591 14.1418 13.3266C13.812 13.9786 13.0106 14.7389 12.371 15.0982C12.0044 15.3041 11.4775 15.4412 11.057 15.4399C10.6891 15.4388 10.4208 15.3625 10.0748 15.2642C7.86862 14.6372 5.84795 13.4573 4.22536 11.8347Z",
                              fill: "#D6D6D6"
                            })
                          ])),
                          createTextVNode(" +7(861)200-00-00")
                        ]),
                        createVNode("a", {
                          href: "",
                          class: "btn btn-green"
                        }, [
                          (openBlock(), createBlock("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 16 16",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d: "M8.00036 16C6.49203 15.9957 5.0157 15.5629 3.74418 14.7497L0 16L1.24807 12.248C0.308295 10.7445 -0.106676 8.97051 0.0682648 7.2062C0.244273 5.44081 1.00164 3.78336 2.21983 2.49673C3.43802 1.20903 5.04876 0.363745 6.79923 0.0933803C8.54971 -0.176984 10.3397 0.143603 11.8885 1.00492C13.4363 1.86517 14.6556 3.21699 15.3532 4.84666C16.0519 6.4774 16.1885 8.29407 15.7437 10.0114C15.2988 11.7287 14.2961 13.2483 12.8945 14.3329C11.4928 15.4165 9.77111 16.0032 8.00036 16ZM9.73911 9.19919C10.2714 9.37338 10.8122 9.51764 11.3605 9.63198C11.4181 9.64053 11.4736 9.66086 11.5227 9.69078C11.5728 9.72177 11.6165 9.7613 11.6496 9.80939C11.6837 9.85641 11.7072 9.90986 11.72 9.96756C11.7328 10.0242 11.7339 10.083 11.7232 10.1407V10.4431C11.7285 10.5531 11.7083 10.6622 11.6635 10.7626C11.6197 10.8631 11.5515 10.9528 11.4672 11.0223C11.2048 11.2895 10.8933 11.5042 10.5498 11.6549C10.0431 11.7148 9.53002 11.671 9.04253 11.5235C8.55398 11.376 8.10171 11.1302 7.71236 10.8C7.21101 10.4634 6.74272 10.0787 6.31497 9.65122C5.88935 9.22056 5.50318 8.75143 5.1629 8.25024C4.83648 7.86019 4.59222 7.4071 4.44714 6.91874C4.30314 6.43144 4.25938 5.9185 4.32018 5.41304C4.47059 5.07107 4.68396 4.76117 4.94957 4.49828C5.01678 4.41172 5.1053 4.34332 5.20558 4.29951C5.30585 4.2557 5.41677 4.23647 5.52558 4.24609H5.83493C5.9512 4.23006 6.06963 4.26104 6.1635 4.33157C6.25843 4.40317 6.32029 4.50897 6.33629 4.62545C6.4963 5.25808 6.61364 5.71546 6.77365 6.2284C6.83765 6.44213 6.76297 6.49342 6.59229 6.62166C6.48562 6.70394 6.40031 6.76379 6.31497 6.82791C6.2659 6.84928 6.22109 6.88133 6.18482 6.92087C6.14855 6.96041 6.1208 7.00743 6.10373 7.05872C6.08666 7.11002 6.08026 7.16452 6.0856 7.21795C6.09093 7.27138 6.10694 7.32375 6.13361 7.37077C6.40562 7.89547 6.75444 8.37742 7.16833 8.8006C7.58968 9.21523 8.07183 9.56362 8.59772 9.83398C8.64466 9.85963 8.69693 9.8767 8.75027 9.88098C8.8036 9.88632 8.85799 9.87991 8.90919 9.86281C8.9604 9.84571 9.00734 9.81902 9.04787 9.78268C9.08734 9.74635 9.11936 9.70253 9.14176 9.65338C9.20576 9.56682 9.2591 9.48665 9.34443 9.37445C9.3583 9.33597 9.37855 9.30073 9.40629 9.2708C9.43295 9.24088 9.46603 9.21629 9.50336 9.19919C9.53963 9.18209 9.58018 9.17247 9.62072 9.1714C9.66125 9.17033 9.70178 9.17676 9.73911 9.19172V9.19919Z",
                              fill: "white"
                            })
                          ])),
                          createTextVNode(" WhatsApp")
                        ]),
                        createVNode("a", {
                          href: "",
                          class: "btn btn-blue"
                        }, [
                          (openBlock(), createBlock("svg", {
                            width: "16",
                            height: "14",
                            viewBox: "0 0 16 14",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d: "M13.697 12.8824C13.6765 13.1132 13.5874 13.3324 13.4425 13.5121C13.2988 13.6907 13.1048 13.8218 12.8857 13.8879C12.6667 13.954 12.4339 13.9517 12.2171 13.8821C11.9992 13.8125 11.8075 13.678 11.666 13.4959C10.4223 12.4903 8.48257 11.0429 8.48257 11.0429C8.48257 11.0429 7.07911 13.5562 6.82809 13.8137C6.7448 13.8844 6.64897 13.9378 6.54513 13.9679C6.44016 13.9992 6.33176 14.0074 6.2245 13.9934C6.11611 13.9784 6.01343 13.9413 5.921 13.8833C5.82858 13.8264 5.74869 13.7499 5.68708 13.6594C5.67453 13.62 5.65858 13.5806 5.64146 13.5434L6.42873 9.53981L12.0425 3.93455L4.38634 8.37538C4.38634 8.37538 0.929062 7.32463 0.415607 7.11935C0.283249 7.04628 0.173711 6.93608 0.100686 6.80154C0.0276613 6.66701 -0.00771649 6.51508 0.00141161 6.36198C0.00939869 6.20889 0.0607685 6.06159 0.147485 5.93634C0.235343 5.81108 0.356282 5.71365 0.495486 5.65566C1.22573 5.27757 14.1078 0.276547 14.5413 0.14781C14.9749 0.0190732 16.1159 -0.316109 15.9904 0.81237C15.8649 1.94085 13.8225 12.263 13.697 12.8824Z",
                              fill: "white"
                            })
                          ])),
                          createTextVNode(" Telegram")
                        ]),
                        createVNode("a", {
                          href: "",
                          class: "btn btn-blue"
                        }, [
                          (openBlock(), createBlock("svg", {
                            width: "16",
                            height: "14",
                            viewBox: "0 0 16 14",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d: "M13.697 12.8824C13.6765 13.1132 13.5874 13.3324 13.4425 13.5121C13.2988 13.6907 13.1048 13.8218 12.8857 13.8879C12.6667 13.954 12.4339 13.9517 12.2171 13.8821C11.9992 13.8125 11.8075 13.678 11.666 13.4959C10.4223 12.4903 8.48257 11.0429 8.48257 11.0429C8.48257 11.0429 7.07911 13.5562 6.82809 13.8137C6.7448 13.8844 6.64897 13.9378 6.54513 13.9679C6.44016 13.9992 6.33176 14.0074 6.2245 13.9934C6.11611 13.9784 6.01343 13.9413 5.921 13.8833C5.82858 13.8264 5.74869 13.7499 5.68708 13.6594C5.67453 13.62 5.65858 13.5806 5.64146 13.5434L6.42873 9.53981L12.0425 3.93455L4.38634 8.37538C4.38634 8.37538 0.929062 7.32463 0.415607 7.11935C0.283249 7.04628 0.173711 6.93608 0.100686 6.80154C0.0276613 6.66701 -0.00771649 6.51508 0.00141161 6.36198C0.00939869 6.20889 0.0607685 6.06159 0.147485 5.93634C0.235343 5.81108 0.356282 5.71365 0.495486 5.65566C1.22573 5.27757 14.1078 0.276547 14.5413 0.14781C14.9749 0.0190732 16.1159 -0.316109 15.9904 0.81237C15.8649 1.94085 13.8225 12.263 13.697 12.8824Z",
                              fill: "white"
                            })
                          ])),
                          createTextVNode(" ВКонтакте")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("iframe", {
                    class: "md:order-2 order-1",
                    src: "https://yandex.ru/map-widget/v1/?um=constructor%3Ab6968cc1cc65d7df7317f1394e27a03d3af9a3a375e5f83edd6f7e070ba356bf&source=constructor",
                    width: "100%",
                    style: { "height": "100%", "min-height": "400px" },
                    frameborder: "0"
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/contact.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "PopularProduct",
  __ssrInlineRender: true,
  props: {
    products: Array
  },
  setup(__props) {
    const swiperInstance = ref(null);
    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
    };
    const onSlideChange = () => {
      console.log("Слайд изменен");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative container mx-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Swiper), {
        loop: false,
        "allow-touch-move": true,
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        },
        onSwiper,
        onSlideChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.products, (product) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ie), {
                      href: `/product/${product.id}`,
                      class: "product-card shrink-0"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b2, _c2, _d2;
                        if (_push4) {
                          if ((_a2 = product.specifications.find(
                            (item) => item.key === "gost"
                          )) == null ? void 0 : _a2.value) {
                            _push4(`<p class="gost"${_scopeId3}> ГОСТ ${ssrInterpolate((_b2 = product.specifications.find(
                              (item) => item.key === "gost"
                            )) == null ? void 0 : _b2.value)}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<div class="image-wrapper"${_scopeId3}><img${ssrRenderAttr(
                            "src",
                            "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images)
                          )} alt=""${_scopeId3}></div><div class="flex flex-col h-full justify-between gap-4"${_scopeId3}><p class="text-gray_icon text-xs"${_scopeId3}>${ssrInterpolate(product.specifications.map((spec) => spec.value).join(", "))}</p><div class="product-text"${_scopeId3}><p${_scopeId3}>${ssrInterpolate(product.name)}</p></div><button class="btn btn-secondary w-fit mt-auto"${_scopeId3}> Заказать звонок </button></div>`);
                        } else {
                          return [
                            ((_c2 = product.specifications.find(
                              (item) => item.key === "gost"
                            )) == null ? void 0 : _c2.value) ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "gost"
                            }, " ГОСТ " + toDisplayString((_d2 = product.specifications.find(
                              (item) => item.key === "gost"
                            )) == null ? void 0 : _d2.value), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "image-wrapper" }, [
                              createVNode("img", {
                                src: "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images),
                                alt: ""
                              }, null, 8, ["src"])
                            ]),
                            createVNode("div", { class: "flex flex-col h-full justify-between gap-4" }, [
                              createVNode("p", { class: "text-gray_icon text-xs" }, toDisplayString(product.specifications.map((spec) => spec.value).join(", ")), 1),
                              createVNode("div", { class: "product-text" }, [
                                createVNode("p", null, toDisplayString(product.name), 1)
                              ]),
                              createVNode("button", {
                                onClick: withModifiers(($event) => unref(useContactModalStore)().openModal(), ["prevent"]),
                                class: "btn btn-secondary w-fit mt-auto"
                              }, " Заказать звонок ", 8, ["onClick"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ie), {
                        href: `/product/${product.id}`,
                        class: "product-card shrink-0"
                      }, {
                        default: withCtx(() => {
                          var _a2, _b2;
                          return [
                            ((_a2 = product.specifications.find(
                              (item) => item.key === "gost"
                            )) == null ? void 0 : _a2.value) ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "gost"
                            }, " ГОСТ " + toDisplayString((_b2 = product.specifications.find(
                              (item) => item.key === "gost"
                            )) == null ? void 0 : _b2.value), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "image-wrapper" }, [
                              createVNode("img", {
                                src: "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images),
                                alt: ""
                              }, null, 8, ["src"])
                            ]),
                            createVNode("div", { class: "flex flex-col h-full justify-between gap-4" }, [
                              createVNode("p", { class: "text-gray_icon text-xs" }, toDisplayString(product.specifications.map((spec) => spec.value).join(", ")), 1),
                              createVNode("div", { class: "product-text" }, [
                                createVNode("p", null, toDisplayString(product.name), 1)
                              ]),
                              createVNode("button", {
                                onClick: withModifiers(($event) => unref(useContactModalStore)().openModal(), ["prevent"]),
                                class: "btn btn-secondary w-fit mt-auto"
                              }, " Заказать звонок ", 8, ["onClick"])
                            ])
                          ];
                        }),
                        _: 2
                      }, 1032, ["href"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.products, (product) => {
                return openBlock(), createBlock(unref(SwiperSlide), null, {
                  default: withCtx(() => [
                    createVNode(unref(ie), {
                      href: `/product/${product.id}`,
                      class: "product-card shrink-0"
                    }, {
                      default: withCtx(() => {
                        var _a2, _b2;
                        return [
                          ((_a2 = product.specifications.find(
                            (item) => item.key === "gost"
                          )) == null ? void 0 : _a2.value) ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "gost"
                          }, " ГОСТ " + toDisplayString((_b2 = product.specifications.find(
                            (item) => item.key === "gost"
                          )) == null ? void 0 : _b2.value), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "image-wrapper" }, [
                            createVNode("img", {
                              src: "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images),
                              alt: ""
                            }, null, 8, ["src"])
                          ]),
                          createVNode("div", { class: "flex flex-col h-full justify-between gap-4" }, [
                            createVNode("p", { class: "text-gray_icon text-xs" }, toDisplayString(product.specifications.map((spec) => spec.value).join(", ")), 1),
                            createVNode("div", { class: "product-text" }, [
                              createVNode("p", null, toDisplayString(product.name), 1)
                            ]),
                            createVNode("button", {
                              onClick: withModifiers(($event) => unref(useContactModalStore)().openModal(), ["prevent"]),
                              class: "btn btn-secondary w-fit mt-auto"
                            }, " Заказать звонок ", 8, ["onClick"])
                          ])
                        ];
                      }),
                      _: 2
                    }, 1032, ["href"])
                  ]),
                  _: 2
                }, 1024);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="absolute flex gap-2 transform -translate-x-1/2 z-10 w-full justify-between px-5 left-1/2 top-1/2">`);
      if (((_a = swiperInstance.value) == null ? void 0 : _a.activeIndex) > 0) {
        _push(`<button class="rounded-full bg-white h-10 w-10 flex items-center justify-center shadow-md"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1L1 7L7 13" stroke="#7645EF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
      } else {
        _push(`<div></div>`);
      }
      if (((_b = swiperInstance.value) == null ? void 0 : _b.activeIndex) < ((_d = (_c = swiperInstance.value) == null ? void 0 : _c.slides) == null ? void 0 : _d.length) - ((_f = (_e = swiperInstance.value) == null ? void 0 : _e.params) == null ? void 0 : _f.slidesPerView)) {
        _push(`<button class="rounded-full bg-white h-10 w-10 flex items-center justify-center shadow-md"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 13L7 7L1 1" stroke="#7645EF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Slider/PopularProduct.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "main",
  __ssrInlineRender: true,
  props: {
    products: Object,
    categories: Object
  },
  setup(__props) {
    const settingStore = useSettingStore();
    const contactStore = useContactModalStore();
    if (typeof window !== "undefined") {
      settingStore.init();
      contactStore.init();
    }
    const swiperInstance = ref(null);
    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
    };
    const onSlideChange = () => {
      if (typeof window !== "undefined") {
        console.log("Слайд изменен");
      }
    };
    onMounted(() => {
      if (typeof window !== "undefined") {
        settingStore.init();
        contactStore.init();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_maska = resolveDirective("maska");
      let _temp0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Z$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-d88f3b9b${_scopeId}>КрафтСнаб - Поставки металлопроката по всей России.</title><meta name="description" content="Мы предлагаем широкий ассортимент металлопроката, соответствующего все требованиям ГОСТ, применяемого в строительных, промышленных и производственных целях." data-v-d88f3b9b${_scopeId}><meta property="og:description" content="Мы предлагаем широкий ассортимент металлопроката, соответствующего все требованиям ГОСТ, применяемого в строительных, промышленных и производственных целях." data-v-d88f3b9b${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "КрафтСнаб - Поставки металлопроката по всей России."),
              createVNode("meta", {
                name: "description",
                content: "Мы предлагаем широкий ассортимент металлопроката, соответствующего все требованиям ГОСТ, применяемого в строительных, промышленных и производственных целях."
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Мы предлагаем широкий ассортимент металлопроката, соответствующего все требованиям ГОСТ, применяемого в строительных, промышленных и производственных целях."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
          if (_push2) {
            _push2(`<main class="flex flex-col gap-24" data-v-d88f3b9b${_scopeId}><section class="relative main_page_container" data-v-d88f3b9b${_scopeId}><div class="container py-10 mx-auto" data-v-d88f3b9b${_scopeId}><div class="lg:max-w-[570px] flex flex-col gap-8 sm:gap-28" data-v-d88f3b9b${_scopeId}><h1 class="text-3xl sm:text-[56px] leading-[92%] font-bold RF-Dewi-Extended" data-v-d88f3b9b${_scopeId}> Комплексное и оптовые поставки металлопроката <br data-v-d88f3b9b${_scopeId}><span class="text-black/35" data-v-d88f3b9b${_scopeId}>по всей России</span></h1><div class="flex flex-col gap-8" data-v-d88f3b9b${_scopeId}><p class="text-gray_icon font-normal text-xl" data-v-d88f3b9b${_scopeId}> Мы предлагаем широкий ассортимент металлопроката, соответствующего все требованиям ГОСТ, применяемого в строительных, промышленных и производственных целях. </p><button class="btn btn-primary p-6 sm:w-fit flex justify-center" data-v-d88f3b9b${_scopeId}> Заказать звонок </button></div></div></div><div class="max-md:hidden overflow-hidden absolute bottom-0 right-0 -z-10 w-[50%]" data-v-d88f3b9b${_scopeId}><img src="/assets/img/metall.png" class="object-contain h-[700px]" alt="metall" srcset="" data-v-d88f3b9b${_scopeId}></div></section><section class="flex overflow-x-hidden flex-col gap-12" data-v-d88f3b9b${_scopeId}><div class="container max-sm:flex-col mx-auto flex justify-between md:items-center" data-v-d88f3b9b${_scopeId}><div class="flex max-sm:flex-col max-md:gap-2 title sm:items-center gap-4" data-v-d88f3b9b${_scopeId}><p class="title leading-none font-bold" data-v-d88f3b9b${_scopeId}>Наш каталог</p><p class="title max-sm:text-xl max-md:text-2xl leading-none text-black/35 font-bold" data-v-d88f3b9b${_scopeId}>${ssrInterpolate(__props.categories.length)} категорий </p></div>`);
            _push2(ssrRenderComponent(unref(ie), {
              href: "/catalog",
              class: "flex max-sm:hidden items-center text-gray_icon gap-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Смотр��ть все категории <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none" data-v-d88f3b9b${_scopeId2}><path d="M1.66683 5.5H12.3335M12.3335 5.5L8.3335 1.5M12.3335 5.5L8.3335 9.5" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-d88f3b9b${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Смотр��ть все категории "),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "14",
                      height: "11",
                      viewBox: "0 0 14 11",
                      fill: "none"
                    }, [
                      createVNode("path", {
                        d: "M1.66683 5.5H12.3335M12.3335 5.5L8.3335 1.5M12.3335 5.5L8.3335 9.5",
                        stroke: "#4B4951",
                        "stroke-width": "1.6",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ie), {
              href: "/catalog",
              class: "max-sm:flex hidden btn btn-secondary leading-none mt-3 max-md:w-fit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Смотреть все категории `);
                } else {
                  return [
                    createTextVNode(" Смотреть все категории ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="container mx-auto relative" data-v-d88f3b9b${_scopeId}><div class="flex items-center overflow-scroll gap-4" data-v-d88f3b9b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Swiper), {
              loop: false,
              "allow-touch-move": true,
              breakpoints: {
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20
                }
              },
              onSwiper,
              onSlideChange
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.categories, (category) => {
                    _push3(ssrRenderComponent(unref(SwiperSlide), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="category-card" data-v-d88f3b9b${_scopeId3}><p class="text-black/80 text-xl max-sm:hidden" data-v-d88f3b9b${_scopeId3}>${ssrInterpolate(category.products_count)} товара </p><img${ssrRenderAttr("src", "/storage/" + category.image)} class="img-category" alt="category" data-v-d88f3b9b${_scopeId3}><div class="flex items-center justify-center max-w-[200px] text-center flex-col gap-6" data-v-d88f3b9b${_scopeId3}><p class="text-dark text-2xl leading-[100%] font-bold RF-Dewi-Extended" data-v-d88f3b9b${_scopeId3}>${ssrInterpolate(category.name)}</p>`);
                          _push4(ssrRenderComponent(unref(ie), {
                            href: "/category/" + category.id,
                            class: "next max-sm:hidden"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Перейти <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d88f3b9b${_scopeId4}><path d="M1 13L7 7L1 1" stroke="#7645EF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-d88f3b9b${_scopeId4}></path></svg>`);
                              } else {
                                return [
                                  createTextVNode(" Перейти "),
                                  (openBlock(), createBlock("svg", {
                                    width: "8",
                                    height: "14",
                                    viewBox: "0 0 8 14",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg"
                                  }, [
                                    createVNode("path", {
                                      d: "M1 13L7 7L1 1",
                                      stroke: "#7645EF",
                                      "stroke-width": "1.6",
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round"
                                    })
                                  ]))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div><p class="text-black/80 text-xl sm:hidden" data-v-d88f3b9b${_scopeId3}>${ssrInterpolate(category.products_count)} товара </p></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "category-card" }, [
                              createVNode("p", { class: "text-black/80 text-xl max-sm:hidden" }, toDisplayString(category.products_count) + " товара ", 1),
                              createVNode("img", {
                                src: "/storage/" + category.image,
                                class: "img-category",
                                alt: "category"
                              }, null, 8, ["src"]),
                              createVNode("div", { class: "flex items-center justify-center max-w-[200px] text-center flex-col gap-6" }, [
                                createVNode("p", { class: "text-dark text-2xl leading-[100%] font-bold RF-Dewi-Extended" }, toDisplayString(category.name), 1),
                                createVNode(unref(ie), {
                                  href: "/category/" + category.id,
                                  class: "next max-sm:hidden"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Перейти "),
                                    (openBlock(), createBlock("svg", {
                                      width: "8",
                                      height: "14",
                                      viewBox: "0 0 8 14",
                                      fill: "none",
                                      xmlns: "http://www.w3.org/2000/svg"
                                    }, [
                                      createVNode("path", {
                                        d: "M1 13L7 7L1 1",
                                        stroke: "#7645EF",
                                        "stroke-width": "1.6",
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round"
                                      })
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              createVNode("p", { class: "text-black/80 text-xl sm:hidden" }, toDisplayString(category.products_count) + " товара ", 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                      return openBlock(), createBlock(unref(SwiperSlide), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "category-card" }, [
                            createVNode("p", { class: "text-black/80 text-xl max-sm:hidden" }, toDisplayString(category.products_count) + " товара ", 1),
                            createVNode("img", {
                              src: "/storage/" + category.image,
                              class: "img-category",
                              alt: "category"
                            }, null, 8, ["src"]),
                            createVNode("div", { class: "flex items-center justify-center max-w-[200px] text-center flex-col gap-6" }, [
                              createVNode("p", { class: "text-dark text-2xl leading-[100%] font-bold RF-Dewi-Extended" }, toDisplayString(category.name), 1),
                              createVNode(unref(ie), {
                                href: "/category/" + category.id,
                                class: "next max-sm:hidden"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Перейти "),
                                  (openBlock(), createBlock("svg", {
                                    width: "8",
                                    height: "14",
                                    viewBox: "0 0 8 14",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg"
                                  }, [
                                    createVNode("path", {
                                      d: "M1 13L7 7L1 1",
                                      stroke: "#7645EF",
                                      "stroke-width": "1.6",
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round"
                                    })
                                  ]))
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            createVNode("p", { class: "text-black/80 text-xl sm:hidden" }, toDisplayString(category.products_count) + " товара ", 1)
                          ])
                        ]),
                        _: 2
                      }, 1024);
                    }), 256))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="absolute flex gap-2 transform -translate-x-1/2 z-10 w-full justify-between px-5 left-1/2 top-1/2" data-v-d88f3b9b${_scopeId}>`);
            if (((_a = swiperInstance.value) == null ? void 0 : _a.activeIndex) > 0) {
              _push2(`<button class="rounded-full bg-white h-10 w-10 flex items-center justify-center shadow-md" data-v-d88f3b9b${_scopeId}><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d88f3b9b${_scopeId}><path d="M7 1L1 7L7 13" stroke="#7645EF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-d88f3b9b${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<div data-v-d88f3b9b${_scopeId}></div>`);
            }
            if (((_b = swiperInstance.value) == null ? void 0 : _b.activeIndex) < ((_d = (_c = swiperInstance.value) == null ? void 0 : _c.slides) == null ? void 0 : _d.length) - ((_f = (_e = swiperInstance.value) == null ? void 0 : _e.params) == null ? void 0 : _f.slidesPerView)) {
              _push2(`<button class="rounded-full bg-white h-10 w-10 flex items-center justify-center shadow-md" data-v-d88f3b9b${_scopeId}><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d88f3b9b${_scopeId}><path d="M1 13L7 7L1 1" stroke="#7645EF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-d88f3b9b${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></section><section class="flex container items-center justify-center mx-auto flex-col gap-12" data-v-d88f3b9b${_scopeId}><h2 class="title-big text-center max-w-[630px]" data-v-d88f3b9b${_scopeId}> Уникальные преимущества </h2><div class="grid md:grid-cols-2 gap-3 w-full" data-v-d88f3b9b${_scopeId}><div class="advantages-card advantages-bg-1" data-v-d88f3b9b${_scopeId}><div class="advantages-item" data-v-d88f3b9b${_scopeId}><div data-v-d88f3b9b${_scopeId}><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d88f3b9b${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M16.4239 8.76545C16.0487 8.43653 15.5091 8.44401 15.1995 8.53962C15.4023 8.29057 15.8747 8.08637 16.0139 8.06158C16.1199 8.10132 16.4239 8.41371 16.4239 8.76545ZM17.6219 7.40335C17.3751 6.08335 14.3075 6.95798 12.7627 6.39732C12.7331 6.78211 13.2383 7.39863 13.7215 7.62683C12.8955 8.34368 12.1539 9.78801 12.0043 11.5526C11.8551 9.78801 11.1135 8.34368 10.2875 7.62683C10.7707 7.39863 11.2763 6.78211 11.2463 6.39732C9.70148 6.95798 6.63388 6.08335 6.38668 7.40335C6.33468 7.6827 6.46908 8.1084 6.61428 8.23076C6.64028 8.14224 6.77588 7.85266 7.20348 7.78775C9.36468 7.46119 11.1691 10.7921 9.54028 12.1388C9.51548 12.1593 9.52948 12.1971 9.56308 12.1971H14.4463C14.4795 12.1971 14.4935 12.1593 14.4691 12.1388C12.8399 10.7921 14.6443 7.46119 16.8055 7.78775C17.2335 7.85266 17.3687 8.14224 17.3947 8.23076C17.5399 8.1084 17.6743 7.6827 17.6219 7.40335ZM18.1475 4.37385C18.1087 4.24912 19.3759 4.24598 19.3759 5.03916C19.3759 5.5707 18.6179 5.8225 18.6179 6.37411C18.6179 6.63103 18.8943 6.81948 18.9791 6.81948C18.7839 5.93385 19.5911 6.39732 19.8091 6.56296C19.3759 5.37201 20.3511 5.37948 20.2551 4.83339C20.1883 4.45175 19.3407 4.56703 19.0339 4.37385C18.4895 4.03116 17.8455 2.69778 17.4211 4.03116C18.2123 4.76571 17.7519 5.84689 16.7475 5.84689C16.7475 5.84689 16.7419 6.00545 16.7511 6.01804C17.9491 5.95942 18.3667 5.07889 18.1475 4.37385ZM4.17068 6.56296C4.38868 6.39732 5.19588 5.93385 5.00108 6.81948C5.08548 6.81948 5.36188 6.63103 5.36188 6.37411C5.36188 5.8225 4.60388 5.5707 4.60388 5.03916C4.60388 4.24598 5.87108 4.24912 5.83228 4.37385C5.61348 5.07889 6.03108 5.95942 7.22908 6.01804C7.23788 6.00545 7.23228 5.84689 7.23228 5.84689C6.22828 5.84689 5.76788 4.76571 6.55868 4.03116C6.13428 2.69778 5.49028 4.03116 4.94588 4.37385C4.63908 4.56703 3.79148 4.45175 3.72468 4.83339C3.62908 5.37948 4.60388 5.37201 4.17068 6.56296ZM7.57228 8.76545C7.94788 8.43653 8.48748 8.44401 8.79668 8.53962C8.59468 8.29057 8.12148 8.08637 7.98268 8.06158C7.87668 8.10132 7.57228 8.41371 7.57228 8.76545ZM12.5743 1.38171L11.9899 0.669189L11.4055 1.38171L11.9899 2.13162L12.5743 1.38171ZM15.9103 3.53621L15.4947 3.02984L15.0795 3.53621L15.4947 4.03116L15.9103 3.53621ZM19.2811 18.1731L18.7543 17.6155L18.2275 18.1731L18.7543 18.6621L19.2811 18.1731ZM8.90068 3.53621L8.48508 3.02984L8.06988 3.53621L8.48508 4.03116L8.90068 3.53621ZM7.71028 6.01804H9.26028C10.5635 6.01804 11.1499 5.21817 11.3271 4.52453H12.6531C12.8303 5.21817 13.4163 6.01804 14.7199 6.01804H16.2699C16.2699 6.01804 16.5411 5.65017 16.6091 5.46801C16.8539 4.81253 16.5411 4.50683 16.0847 4.50683L15.4947 5.04152L14.9047 4.50683C14.4483 4.50683 14.1355 4.81253 14.3803 5.46801C14.4115 5.55181 14.4863 5.67496 14.5571 5.78316C14.0071 5.70762 13.3051 5.33109 13.1511 4.52453C13.1511 4.52453 13.5575 3.87889 13.6595 3.61765C14.0259 2.67811 13.5579 2.29411 12.8735 2.29411L11.9899 3.3328L11.1063 2.29411C10.4219 2.29411 9.95388 2.67811 10.3207 3.61765C10.4223 3.87889 10.8291 4.52453 10.8291 4.52453C10.6747 5.33109 9.97268 5.70762 9.42268 5.78316C9.49388 5.67496 9.56828 5.55181 9.59948 5.46801C9.84388 4.81253 9.53188 4.50683 9.07508 4.50683L8.48508 5.04152L7.89508 4.50683C7.43828 4.50683 7.12628 4.81253 7.37068 5.46801C7.43868 5.65017 7.71028 6.01804 7.71028 6.01804ZM23.7355 10.8228C23.4363 10.9742 21.6811 11.7965 19.4327 11.4924C19.4563 11.385 19.4755 11.2768 19.4919 11.1686C20.9883 10.9896 22.2047 10.7358 22.9799 10.3046C23.8635 9.8128 24.2499 8.63876 23.8039 7.76532C23.7923 7.74329 23.7603 7.73935 23.7443 7.75784C23.4999 8.03916 21.9631 9.71089 19.5419 10.2306C19.5355 10.1043 19.5243 9.97962 19.5075 9.85568C20.6835 9.1888 21.8315 8.4204 22.3783 7.71771C23.2047 6.65542 23.1287 5.3004 22.3423 4.60952C22.3255 4.59457 22.2983 4.59889 22.2867 4.61739C22.0379 5.02775 19.7091 8.79181 17.1523 10.4167C17.1267 10.4333 17.0923 10.4545 17.0579 10.4754C16.9847 10.5198 16.9767 10.615 17.0391 10.6717C17.3339 10.9388 17.5171 11.3106 17.5171 11.7234C17.5171 12.441 16.9639 13.0378 16.2327 13.1673C15.8611 13.2393 15.3247 13.2184 14.8095 13.0481C14.7863 13.0406 14.7623 13.0559 14.7623 13.0792V15.3521C14.7623 15.3887 14.8179 15.3977 14.8311 15.3627C15.1443 14.5329 16.0819 14.3567 16.4919 14.3567C16.6395 15.2435 16.9031 15.978 17.2455 16.3735C17.8031 17.0159 18.7135 17.0069 19.1083 16.5627C19.1219 16.5474 19.1179 16.5234 19.0995 16.5131C18.8675 16.3797 17.5403 15.5649 17.2747 14.2296C17.3795 14.1934 17.4819 14.1525 17.5799 14.1041C18.0083 14.8131 18.6319 15.4445 19.1339 15.6857C19.9771 16.0902 20.7491 15.8935 21.0915 15.3013C21.1039 15.2805 21.0887 15.2545 21.0635 15.2521C20.5419 15.2104 18.9411 14.7517 18.2595 13.6339C18.3375 13.5623 18.4139 13.4875 18.4851 13.4081C19.1983 13.951 20.2067 14.431 20.9287 14.529C21.7735 14.6439 22.7307 14.3744 22.7539 13.3919C22.7543 13.3723 22.7367 13.3561 22.7159 13.3573C22.4155 13.3754 20.4271 13.462 19.0103 12.6487C19.0595 12.5555 19.1051 12.4603 19.1479 12.3631C19.1479 12.3631 21.2887 12.8691 22.3031 12.7015C23.3111 12.535 23.9015 11.7835 23.7875 10.8487C23.7843 10.8255 23.7571 10.8117 23.7355 10.8228ZM4.83188 12.3631C4.87468 12.4603 4.92068 12.5555 4.96988 12.6487C3.55348 13.4616 1.56588 13.3758 1.26428 13.3573C1.24308 13.3561 1.22548 13.3731 1.22588 13.3923C1.24948 14.3744 2.20628 14.6439 3.05108 14.529C3.77268 14.431 4.78148 13.951 5.49468 13.4081C5.56628 13.4875 5.64228 13.5623 5.72028 13.6339C5.03828 14.7517 3.43788 15.2104 2.91628 15.2521C2.89108 15.2545 2.87628 15.2805 2.88828 15.3013C3.23068 15.8935 4.00268 16.0902 4.84628 15.6857C5.34788 15.4445 5.97148 14.8131 6.39988 14.1041C6.49828 14.1525 6.60068 14.1934 6.70508 14.2296C6.43948 15.5649 5.11228 16.3797 4.88028 16.5131C4.86228 16.5234 4.85788 16.5474 4.87148 16.5627C5.26628 17.0069 6.17708 17.0159 6.73468 16.3735C7.07708 15.978 7.34028 15.2435 7.48788 14.3567C7.89828 14.3567 8.83548 14.5329 9.14868 15.3627C9.16228 15.3977 9.21788 15.3887 9.21788 15.3521V13.0792C9.21788 13.0559 9.19348 13.0406 9.17028 13.0481C8.65508 13.2184 8.11868 13.2393 7.74748 13.1673C7.01588 13.0378 6.46268 12.441 6.46268 11.7234C6.46268 11.3106 6.64628 10.9384 6.94068 10.6713C7.00348 10.615 6.99508 10.5198 6.92228 10.4754C6.88748 10.4545 6.85308 10.4333 6.82708 10.4167C4.27188 8.7926 1.94428 5.03129 1.69348 4.61817C1.68188 4.59889 1.65388 4.59496 1.63668 4.60991C0.85148 5.30119 0.77508 6.65581 1.60148 7.71771C2.14828 8.4204 3.29628 9.1888 4.47188 9.85568C4.45548 9.97962 4.44388 10.1043 4.43788 10.2306C2.01868 9.71129 0.48308 8.0423 0.23628 7.75903C0.21988 7.73975 0.18708 7.74368 0.17588 7.76571C-0.26932 8.63955 0.11708 9.8128 0.99988 10.3046C1.77508 10.7358 2.99148 10.9896 4.48788 11.1686C4.50428 11.2768 4.52348 11.385 4.54708 11.4924C2.30108 11.7961 0.54668 10.9758 0.24508 10.8232C0.22268 10.8117 0.19548 10.8259 0.19268 10.8495C0.0790803 11.7843 0.66908 12.535 1.67708 12.7015C2.69108 12.8691 4.83188 12.3631 4.83188 12.3631ZM18.7543 19.3801L17.9743 18.7664C17.6631 18.9517 17.4343 19.246 17.3455 19.591C16.8763 19.6567 15.5971 19.3727 15.7215 19.1842C17.1235 17.2123 16.0511 16.0382 14.7623 16.1035V17.4279C14.7623 17.8532 14.3911 18.1978 13.9339 18.1978H13.0439C12.4055 18.1978 11.9899 18.8396 11.9899 18.8396C11.9899 18.8396 11.5743 18.1978 10.9359 18.1978H10.0459C9.58828 18.1978 9.21788 17.8532 9.21788 17.4279V16.1035C7.92908 16.0382 6.85588 17.2123 8.25828 19.1842C8.38148 19.3707 7.06668 19.6693 6.44988 19.5938C6.28748 19.4254 6.05308 19.3192 5.79068 19.3192C5.67508 19.3192 5.56508 19.3404 5.46388 19.3778C5.46388 19.3778 3.04028 17.0832 2.99588 17.0608L3.01588 17.0144C3.15388 16.7563 2.94268 16.475 2.80908 16.4946C2.96428 16.3085 2.97148 15.4937 2.11068 15.3053C2.13588 15.4689 2.14868 15.803 2.14868 15.803C2.14868 15.803 1.48428 15.4437 1.15068 15.7538C0.85748 16.1008 1.26428 16.7303 1.26428 16.7303C1.26428 16.7303 0.92428 16.7386 0.75668 16.7244C1.00308 17.5577 1.82948 17.4987 2.00828 17.3342C1.99668 17.4668 2.29548 17.6557 2.54868 17.5042L2.65988 17.4503C2.67948 17.4767 5.03988 19.7067 5.03988 19.7067C4.93148 19.8676 4.87988 20.0651 4.91548 20.2756C4.97148 20.6045 5.24548 20.8772 5.59548 20.948C5.84268 20.9976 6.07508 20.9496 6.26148 20.8406L6.88628 21.4205C6.94188 21.4709 7.01708 21.5024 7.10108 21.4965C7.25388 21.4862 7.36828 21.3623 7.35668 21.2203C7.35188 21.1561 7.31908 21.1011 7.27388 21.0594C7.26388 21.0483 6.63748 20.4668 6.63748 20.4668C7.15428 20.1045 8.11708 19.8491 8.91628 19.8491C9.05668 19.8491 9.12268 19.7303 9.07428 19.6138C8.71228 18.7432 9.49068 18.1125 10.2959 18.6259C10.6471 18.8498 11.0039 19.2908 11.2727 20.0266C9.95148 20.3464 8.29268 21.2277 7.95708 22.1897C7.82788 22.5611 8.25468 23.0675 8.77308 23.1694C8.79268 23.1737 8.81148 23.1607 8.81508 23.1422C9.08588 21.7062 10.6303 20.636 11.4339 20.4542C11.4743 20.5624 11.4611 20.5274 11.5015 20.6352C10.6263 21.0491 9.77748 21.9222 9.53508 22.9601C9.42388 23.4354 9.95388 23.8638 10.3915 23.9811C10.4135 23.987 10.4351 23.9716 10.4363 23.9504C10.5195 22.6378 11.0991 21.5232 11.6183 21.0161C11.6323 21.1136 11.6431 21.2136 11.6503 21.3147C11.6503 21.3147 11.1187 22.796 11.1187 23.8768C11.1187 24.3796 11.8659 24.7306 11.9763 24.7797C12.1143 24.7306 12.8611 24.3796 12.8611 23.8768C12.8611 22.796 12.3295 21.3147 12.3295 21.3147C12.3371 21.2136 12.3475 21.1136 12.3619 21.0161C12.8807 21.5232 13.4607 22.6375 13.5435 23.95C13.5447 23.9712 13.5667 23.987 13.5883 23.9811C14.0263 23.8638 14.5559 23.4354 14.4451 22.9601C14.2023 21.9222 13.3539 21.0491 12.4787 20.6352C12.5187 20.5274 12.5055 20.5624 12.5459 20.4542C13.3499 20.636 14.8939 21.7062 15.1647 23.1422C15.1683 23.1607 15.1875 23.1737 15.2067 23.1694C15.7247 23.0675 16.1523 22.5611 16.0223 22.1897C15.6875 21.2277 14.0283 20.3464 12.7071 20.0266C12.9763 19.2908 13.3331 18.8498 13.6843 18.6259C14.4891 18.1125 15.2675 18.7432 14.9055 19.6138C14.8571 19.7303 14.9227 19.8491 15.0635 19.8491C15.9675 19.8491 17.0811 20.1757 17.5219 20.6136C17.8035 21.0361 18.3239 21.3064 18.9111 21.2486C19.5783 21.1833 20.1223 20.682 20.1975 20.0624C20.2631 19.5194 19.9823 19.0319 19.5347 18.7664L18.7543 19.3801ZM13.0051 15.4249C13.2831 15.3218 13.7187 15.4052 13.7039 15.8065C13.7003 15.8974 13.8279 15.8974 13.8371 15.8045C13.9203 15.2037 13.5143 15.0306 13.0895 15.1011C13.0367 14.8945 12.9935 14.7139 12.9443 14.5349C12.9051 14.3901 12.8907 14.1182 13.0583 14.1182C13.1487 14.1182 13.1123 14.3712 13.1039 14.4802C13.0963 14.5758 13.1307 14.6336 13.2083 14.6364C13.2567 14.6384 13.3171 14.5766 13.3531 14.5357C13.5963 14.2607 13.6527 13.835 13.3679 13.6296C13.1295 13.4573 12.5327 13.5855 12.3687 13.831C12.3439 13.7386 12.2255 13.5859 12.1687 13.5194C12.1135 13.4545 12.0991 13.41 12.1755 13.353C12.2115 13.3255 12.3203 13.2173 12.3203 13.1055C12.3203 13.0394 12.2691 12.9175 12.1063 12.9175C11.9779 12.9175 11.8351 13.0064 11.8351 13.2047C11.8351 13.2487 11.8459 13.2959 11.8743 13.3467C11.7931 13.3333 11.5727 13.3388 11.4595 13.3668L13.0247 17.662C13.4727 17.4409 13.8011 17.0907 13.8011 16.715C13.8011 16.3947 13.3295 16.5009 13.1003 16.7508C13.0267 16.3447 12.9611 15.9698 12.8895 15.596C12.8699 15.4929 12.9223 15.4559 13.0051 15.4249ZM10.7919 12.5071L11.1207 13.4207C10.8391 13.4875 10.3863 13.6929 10.3863 13.9648C10.3863 14.3268 11.0267 14.5624 11.3971 14.5341C11.3787 14.6167 11.3999 14.6903 11.4575 14.7576C11.3231 14.7576 11.0695 14.8201 10.9863 14.9098C10.7899 14.7269 10.4827 14.6604 10.3367 14.7717C10.1899 14.8839 10.1855 15.0739 10.3387 15.2887C10.4455 15.4375 10.4855 15.5842 10.3655 15.7565C10.8119 15.7565 10.6475 15.1762 10.8223 15.1762C10.7995 15.2887 10.8135 15.419 10.8643 15.5634C10.8979 15.6594 10.8979 15.7274 10.8403 15.8199C10.6963 16.05 10.4723 16.5788 10.5027 17.0569C10.3563 17.0561 10.2819 17.0203 10.3335 16.8204C10.3527 16.746 10.3067 16.6929 10.2459 16.7846C10.1787 16.8857 10.1463 17.0584 10.1463 17.1324C10.1463 17.5581 10.6535 17.6439 10.8471 17.5538C11.4071 18.0957 12.5071 17.9512 12.8755 17.7694L10.9387 12.4552C10.8991 12.3548 10.7571 12.4028 10.7919 12.5071ZM10.7247 16.8845C10.6847 16.6658 10.9891 16.2747 11.3763 15.8974C11.2939 16.1433 11.3451 16.567 11.5067 16.713C11.2259 16.713 10.8923 16.7657 10.7247 16.8845Z" fill="black" data-v-d88f3b9b${_scopeId}></path></svg> Партнерство с гос. структурами </div><div data-v-d88f3b9b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" data-v-d88f3b9b${_scopeId}><path d="M7.21386 0.131066C5.9578 -0.275544 4.59234 0.290042 3.99167 1.46575L3.26953 2.8792C3.18373 3.04714 3.04714 3.18373 2.8792 3.26953L1.46575 3.99167C0.290042 4.59234 -0.275544 5.9578 0.131066 7.21386L0.619902 8.72394C0.677984 8.90336 0.677984 9.09658 0.619902 9.276L0.131066 10.7861C-0.275544 12.0422 0.290042 13.4076 1.46575 14.0083L2.8792 14.7304C3.04714 14.8162 3.18373 14.9528 3.26953 15.1208L3.99167 16.5342C4.59234 17.71 5.9578 18.2755 7.21386 17.8689L8.72394 17.3801C8.90336 17.322 9.09658 17.322 9.276 17.3801L10.7861 17.8689C12.0422 18.2755 13.4076 17.71 14.0083 16.5342L14.7304 15.1208C14.8162 14.9528 14.9528 14.8162 15.1208 14.7304L16.5342 14.0083C17.71 13.4076 18.2755 12.0422 17.8689 10.7861L17.3801 9.276C17.322 9.09658 17.322 8.90336 17.3801 8.72394L17.8689 7.21386C18.2755 5.9578 17.71 4.59234 16.5342 3.99167L15.1208 3.26953C14.9528 3.18373 14.8162 3.04714 14.7304 2.8792L14.0083 1.46575C13.4076 0.290042 12.0422 -0.275544 10.7861 0.131066L9.276 0.619902C9.09658 0.677976 8.90336 0.677984 8.72394 0.619902L7.21386 0.131066ZM4.30373 8.78247L5.57114 7.51498L8.10593 10.0499L13.1756 4.98024L14.443 6.24765L8.10593 12.5846L4.30373 8.78247Z" fill="#4B4951" fill-opacity="0.8" data-v-d88f3b9b${_scopeId}></path></svg> Счет для бизнеса по металлу </div></div><div class="advantages-card-text" data-v-d88f3b9b${_scopeId}><p data-v-d88f3b9b${_scopeId}> Работаем с ГосОборон заказами и ГосКонтрактами. Открытие отдельного банковского счета. </p><span data-v-d88f3b9b${_scopeId}>Работа с государственными заказами представляет собой уникальную возможность для компаний, занимающихся комплексными и оптовыми поставками металлопродукта.</span></div></div><div class="advantages-card advantages-bg-2" data-v-d88f3b9b${_scopeId}><div class="advantages-item" data-v-d88f3b9b${_scopeId}><div data-v-d88f3b9b${_scopeId}><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d88f3b9b${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M21.7071 14.2929C22.0976 14.6834 22.0976 15.3166 21.7071 15.7071L17.7071 19.7071C17.3166 20.0976 16.6834 20.0976 16.2929 19.7071L14.2929 17.7071C13.9024 17.3166 13.9024 16.6834 14.2929 16.2929C14.6834 15.9024 15.3166 15.9024 15.7071 16.2929L17 17.5858L20.2929 14.2929C20.6834 13.9024 21.3166 13.9024 21.7071 14.2929Z" fill="black" data-v-d88f3b9b${_scopeId}></path><path d="M9.5971 0.185046C9.86292 0.130375 10.1371 0.130375 10.4029 0.185046C10.7102 0.248242 10.9848 0.402069 11.2032 0.524362L11.2627 0.557609C13.0256 1.53701 16.0079 3.19466 17.6893 4.12926C18.0975 4.35619 18.3017 4.46965 18.3699 4.61961C18.4293 4.75034 18.4297 4.90033 18.3709 5.03136C18.3035 5.18166 18.0997 5.29625 17.6923 5.52544L15.3632 6.83555L6.40038 1.85619L8.73733 0.55761L8.79685 0.524362C9.01519 0.402069 9.28983 0.248242 9.5971 0.185046Z" fill="black" data-v-d88f3b9b${_scopeId}></path><path d="M4.34168 3.00039L13.3169 7.98661L10.3922 9.63177C10.2491 9.71225 10.1776 9.75249 10.1017 9.76825C10.0346 9.78221 9.96533 9.78221 9.8982 9.76825C9.82235 9.75249 9.75082 9.71225 9.60775 9.63177L2.30769 5.52545C1.90025 5.29627 1.69653 5.18167 1.62907 5.03137C1.57027 4.90034 1.57065 4.75035 1.63012 4.61962C1.69833 4.46967 1.90245 4.3562 2.3107 4.12928L4.34168 3.00039Z" fill="black" data-v-d88f3b9b${_scopeId}></path><path d="M19.9959 7.89013C19.9955 7.4418 19.9953 7.21764 19.9008 7.08675C19.8183 6.97256 19.6915 6.89845 19.5515 6.88267C19.3911 6.86457 19.1953 6.97469 18.8038 7.19493L11.4078 11.3552C11.2593 11.4387 11.1851 11.4805 11.1311 11.5395C11.0833 11.5918 11.0471 11.6536 11.025 11.7209C11 11.7969 11 11.8821 11 12.0524V20.2277C11 20.6749 11 20.8985 11.094 21.0293C11.1761 21.1434 11.3023 21.2177 11.4419 21.234C11.6019 21.2527 11.7968 21.1445 12.1865 20.9281C12.3936 20.8131 12.6217 20.6865 12.8658 20.5509C13.1807 20.3761 13.3381 20.2887 13.4075 20.1643C13.4683 20.0554 13.4862 19.9278 13.4577 19.8064C13.4251 19.6678 13.2978 19.5404 13.0432 19.2858L12.8787 19.1213C11.7071 17.9497 11.7071 16.0503 12.8787 14.8787C14.0095 13.7478 15.8186 13.7085 16.9966 14.7608L18.8787 12.8787C19.0647 12.6926 19.2691 12.5361 19.4861 12.4092C19.7082 12.2791 19.8193 12.2141 19.8718 12.1554C19.9268 12.0938 19.9493 12.0544 19.9746 11.9759C19.9988 11.9009 19.9988 11.8022 19.9986 11.6049C19.9978 10.2354 19.9967 8.86272 19.9959 7.89013Z" fill="black" data-v-d88f3b9b${_scopeId}></path><path d="M7.81351 20.9281C8.20323 21.1445 8.39809 21.2527 8.55808 21.234C8.69766 21.2177 8.82394 21.1434 8.90598 21.0293C9 20.8985 9 20.6749 9 20.2277V12.0525C9 11.8821 9 11.797 8.97501 11.7209C8.95289 11.6536 8.91674 11.5918 8.86894 11.5396C8.81491 11.4805 8.74066 11.4387 8.59221 11.3552L1.19624 7.19496C0.804702 6.97472 0.608935 6.8646 0.448491 6.88269C0.308519 6.89848 0.181685 6.97259 0.0992064 7.08677C0.00466455 7.21766 0.00447714 7.44183 0.00410232 7.89017C0.00254217 9.75633 2.55066e-06 13.0956 2.55066e-06 15.0586L-0.000175071 15.1308C-0.00113637 15.3946 -0.00234505 15.7264 0.100972 16.0391C0.190297 16.3095 0.336318 16.5576 0.529269 16.767C0.752434 17.0092 1.04303 17.1692 1.27416 17.2966L1.33733 17.3314C3.11852 18.321 6.14715 20.0028 7.81351 20.9281Z" fill="black" data-v-d88f3b9b${_scopeId}></path><path d="M7.81351 20.9281C8.20323 21.1445 8.39809 21.2527 8.55808 21.234C8.69766 21.2177 8.82394 21.1434 8.90598 21.0293C9 20.8985 9 20.6749 9 20.2277V12.0525C9 11.8821 9 11.797 8.97501 11.7209C8.95289 11.6536 8.91674 11.5918 8.86894 11.5396C8.81491 11.4805 8.74066 11.4387 8.59221 11.3552L1.19624 7.19496C0.804702 6.97472 0.608935 6.8646 0.448491 6.88269C0.308519 6.89848 0.181685 6.97259 0.0992064 7.08677C0.00466455 7.21766 0.00447714 7.44183 0.00410232 7.89017C0.00254217 9.75633 2.55066e-06 13.0956 2.55066e-06 15.0586L-0.000175071 15.1308C-0.00113637 15.3946 -0.00234505 15.7264 0.100972 16.0391C0.190297 16.3095 0.336318 16.5576 0.529269 16.767C0.752434 17.0092 1.04303 17.1692 1.27416 17.2966L1.33733 17.3314C3.11852 18.321 6.14715 20.0028 7.81351 20.9281Z" fill="black" data-v-d88f3b9b${_scopeId}></path></svg> Профессиональный подход </div><div data-v-d88f3b9b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" data-v-d88f3b9b${_scopeId}><path d="M7.21386 0.131066C5.9578 -0.275544 4.59234 0.290042 3.99167 1.46575L3.26953 2.8792C3.18373 3.04714 3.04714 3.18373 2.8792 3.26953L1.46575 3.99167C0.290042 4.59234 -0.275544 5.9578 0.131066 7.21386L0.619902 8.72394C0.677984 8.90336 0.677984 9.09658 0.619902 9.276L0.131066 10.7861C-0.275544 12.0422 0.290042 13.4076 1.46575 14.0083L2.8792 14.7304C3.04714 14.8162 3.18373 14.9528 3.26953 15.1208L3.99167 16.5342C4.59234 17.71 5.9578 18.2755 7.21386 17.8689L8.72394 17.3801C8.90336 17.322 9.09658 17.322 9.276 17.3801L10.7861 17.8689C12.0422 18.2755 13.4076 17.71 14.0083 16.5342L14.7304 15.1208C14.8162 14.9528 14.9528 14.8162 15.1208 14.7304L16.5342 14.0083C17.71 13.4076 18.2755 12.0422 17.8689 10.7861L17.3801 9.276C17.322 9.09658 17.322 8.90336 17.3801 8.72394L17.8689 7.21386C18.2755 5.9578 17.71 4.59234 16.5342 3.99167L15.1208 3.26953C14.9528 3.18373 14.8162 3.04714 14.7304 2.8792L14.0083 1.46575C13.4076 0.290042 12.0422 -0.275544 10.7861 0.131066L9.276 0.619902C9.09658 0.677976 8.90336 0.677984 8.72394 0.619902L7.21386 0.131066ZM4.30373 8.78247L5.57114 7.51498L8.10593 10.0499L13.1756 4.98024L14.443 6.24765L8.10593 12.5846L4.30373 8.78247Z" fill="#4B4951" fill-opacity="0.8" data-v-d88f3b9b${_scopeId}></path></svg> Проверенная компания </div></div><div class="advantages-card-text" data-v-d88f3b9b${_scopeId}><p data-v-d88f3b9b${_scopeId}> Наша компания уже не первый год осуществляет оптовые поставки металлопроката по всей России. </p><span data-v-d88f3b9b${_scopeId}>Благодаря наличию собственных складов мы выполняем поставки в самые кратчайшие сроки.</span></div></div></div></section><section class="container mx-auto flex flex-col gap-12" data-v-d88f3b9b${_scopeId}><div class="flex justify-between items-center" data-v-d88f3b9b${_scopeId}><h2 class="title" data-v-d88f3b9b${_scopeId}>Популярные товары</h2>`);
            _push2(ssrRenderComponent(unref(ie), {
              href: "/catalog",
              class: "flex max-sm:hidden items-center text-gray_icon gap-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Смотреть все категории <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none" data-v-d88f3b9b${_scopeId2}><path d="M1.66683 5.5H12.3335M12.3335 5.5L8.3335 1.5M12.3335 5.5L8.3335 9.5" stroke="#4B4951" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-v-d88f3b9b${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Смотреть все категории "),
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "14",
                      height: "11",
                      viewBox: "0 0 14 11",
                      fill: "none"
                    }, [
                      createVNode("path", {
                        d: "M1.66683 5.5H12.3335M12.3335 5.5L8.3335 1.5M12.3335 5.5L8.3335 9.5",
                        stroke: "#4B4951",
                        "stroke-width": "1.6",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="lg:hidden" data-v-d88f3b9b${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { products: __props.products }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex max-lg:hidden overflow-x-auto md:grid grid-cols-4 gap-4" data-v-d88f3b9b${_scopeId}><!--[-->`);
            ssrRenderList(__props.products, (product) => {
              _push2(ssrRenderComponent(unref(ie), {
                href: `/product/${product.id}`,
                class: "product-card shrink-0"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2, _c2, _d2;
                  if (_push3) {
                    if ((_a2 = product.specifications.find(
                      (item) => item.key === "gost"
                    )) == null ? void 0 : _a2.value) {
                      _push3(`<p class="gost" data-v-d88f3b9b${_scopeId2}> ГОСТ ${ssrInterpolate((_b2 = product.specifications.find(
                        (item) => item.key === "gost"
                      )) == null ? void 0 : _b2.value)}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="image-wrapper" data-v-d88f3b9b${_scopeId2}><img${ssrRenderAttr(
                      "src",
                      "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images)
                    )} alt="" data-v-d88f3b9b${_scopeId2}></div><div class="flex flex-col h-full justify-between gap-4" data-v-d88f3b9b${_scopeId2}><p class="text-gray_icon text-xs" data-v-d88f3b9b${_scopeId2}>${ssrInterpolate(product.specifications.map((spec) => spec.value).join(", "))}</p><div class="product-text" data-v-d88f3b9b${_scopeId2}><p data-v-d88f3b9b${_scopeId2}>${ssrInterpolate(product.name)}</p></div><button class="btn btn-secondary w-fit mt-auto" data-v-d88f3b9b${_scopeId2}> Заказать звонок </button></div>`);
                  } else {
                    return [
                      ((_c2 = product.specifications.find(
                        (item) => item.key === "gost"
                      )) == null ? void 0 : _c2.value) ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "gost"
                      }, " ГОСТ " + toDisplayString((_d2 = product.specifications.find(
                        (item) => item.key === "gost"
                      )) == null ? void 0 : _d2.value), 1)) : createCommentVNode("", true),
                      createVNode("div", { class: "image-wrapper" }, [
                        createVNode("img", {
                          src: "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images),
                          alt: ""
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "flex flex-col h-full justify-between gap-4" }, [
                        createVNode("p", { class: "text-gray_icon text-xs" }, toDisplayString(product.specifications.map((spec) => spec.value).join(", ")), 1),
                        createVNode("div", { class: "product-text" }, [
                          createVNode("p", null, toDisplayString(product.name), 1)
                        ]),
                        createVNode("button", {
                          onClick: withModifiers(($event) => unref(useContactModalStore)().openModal(), ["prevent"]),
                          class: "btn btn-secondary w-fit mt-auto"
                        }, " Заказать звонок ", 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></section><section class="container px-0 mx-auto flex flex-col gap-12" data-v-d88f3b9b${_scopeId}><h2 class="title max-sm:px-8" data-v-d88f3b9b${_scopeId}> Занимаемся поставками <br data-v-d88f3b9b${_scopeId}> металлопроката<br data-v-d88f3b9b${_scopeId}> по всей России </h2><div class="max-sm:pl-8" data-v-d88f3b9b${_scopeId}><img class="flex lg:hidden" src="/assets/img/map_tablet.png" alt="" data-v-d88f3b9b${_scopeId}><img class="hidden lg:block" src="/assets/img/map_pc.png" alt="" data-v-d88f3b9b${_scopeId}></div></section><section class="container mx-auto max-md:flex-col flex items-start gap-28" data-v-d88f3b9b${_scopeId}><div class="flex md:max-w-[500px] flex-col gap-10" data-v-d88f3b9b${_scopeId}><div class="flex flex-col gap-6" data-v-d88f3b9b${_scopeId}><h2 class="title" data-v-d88f3b9b${_scopeId}> Нужна консультация по выбору металлопроката? </h2><p class="text-lg" data-v-d88f3b9b${_scopeId}> Оставьте заявку, и наш специалист свяжется с вами для подробной консультации. </p></div><div class="flex flex-col gap-6" data-v-d88f3b9b${_scopeId}><div class="input-label-block" data-v-d88f3b9b${_scopeId}><label for="name" data-v-d88f3b9b${_scopeId}>Имя и Фамилия <span data-v-d88f3b9b${_scopeId}>*</span></label><label class="input-wrapper" data-v-d88f3b9b${_scopeId}><input type="text" id="name"${ssrRenderAttr("value", unref(contactStore).options.data.name)} placeholder="Имя и фамилия" autocomplete="off" data-v-d88f3b9b${_scopeId}></label></div><div class="input-label-block" data-v-d88f3b9b${_scopeId}><label for="phone" data-v-d88f3b9b${_scopeId}>Контактный телефон <span data-v-d88f3b9b${_scopeId}>*</span></label><label for="phone" class="input-wrapper" data-v-d88f3b9b${_scopeId}><input${ssrRenderAttrs((_temp0 = mergeProps({
              type: "tel",
              id: "phone",
              value: unref(contactStore).options.data.phone,
              placeholder: "+7 (900) 000-00-00",
              autocomplete: "off"
            }, ssrGetDirectiveProps(_ctx, _directive_maska)), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(contactStore).options.data.phone))))} data-v-d88f3b9b${_scopeId}></label></div><div class="input-label-block" data-v-d88f3b9b${_scopeId}><label for="time" data-v-d88f3b9b${_scopeId}>Удобное для вас время</label><label for="time" class="input-wrapper" data-v-d88f3b9b${_scopeId}><input type="text" id="time"${ssrRenderAttr("value", unref(contactStore).options.data.time)} placeholder="Пятница 12:00" autocomplete="off" data-v-d88f3b9b${_scopeId}></label></div><div class="input-label-block" data-v-d88f3b9b${_scopeId}><label for="email" data-v-d88f3b9b${_scopeId}>E-mail</label><label for="email" class="input-wrapper" data-v-d88f3b9b${_scopeId}><input type="email" id="email"${ssrRenderAttr("value", unref(contactStore).options.data.email)} placeholder="you@email.com" autocomplete="off" data-v-d88f3b9b${_scopeId}></label>`);
            if (((_g = unref(contactStore).options.errors) == null ? void 0 : _g.length) > 0) {
              _push2(`<p class="text-red text-xs" data-v-d88f3b9b${_scopeId}>${ssrInterpolate(unref(contactStore).options.errors[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button class="btn text-center btn-primary justify-center py-4" data-v-d88f3b9b${_scopeId}> Заказать звонок </button></div></div><div class="info-company-container" data-v-d88f3b9b${_scopeId}><div class="item" data-v-d88f3b9b${_scopeId}><p data-v-d88f3b9b${_scopeId}>Название организации</p><span data-v-d88f3b9b${_scopeId}>${ssrInterpolate((_h = unref(settingStore).options.settings) == null ? void 0 : _h.name_company)}</span></div><div class="line" data-v-d88f3b9b${_scopeId}></div><div class="item" data-v-d88f3b9b${_scopeId}><p data-v-d88f3b9b${_scopeId}>Юридический/Фактический адрес</p><span data-v-d88f3b9b${_scopeId}>${ssrInterpolate((_i = unref(settingStore).options.settings) == null ? void 0 : _i.fakt_address)}</span></div><div class="line" data-v-d88f3b9b${_scopeId}></div><div class="item" data-v-d88f3b9b${_scopeId}><p data-v-d88f3b9b${_scopeId}>Почтовый адрес</p><span data-v-d88f3b9b${_scopeId}>${ssrInterpolate((_j = unref(settingStore).options.settings) == null ? void 0 : _j.mail_address)}</span></div><div class="line" data-v-d88f3b9b${_scopeId}></div><div class="item" data-v-d88f3b9b${_scopeId}><div class="flex items-center gap-10" data-v-d88f3b9b${_scopeId}><div class="company-item" data-v-d88f3b9b${_scopeId}><p data-v-d88f3b9b${_scopeId}>ИНН</p><span data-v-d88f3b9b${_scopeId}>${ssrInterpolate((_k = unref(settingStore).options.settings) == null ? void 0 : _k.inn)}</span></div><div class="company-item" data-v-d88f3b9b${_scopeId}><p data-v-d88f3b9b${_scopeId}>КПП</p><span data-v-d88f3b9b${_scopeId}>${ssrInterpolate((_l = unref(settingStore).options.settings) == null ? void 0 : _l.kpp)}</span></div><div class="company-item" data-v-d88f3b9b${_scopeId}><p data-v-d88f3b9b${_scopeId}>ОГРН</p><span data-v-d88f3b9b${_scopeId}>${ssrInterpolate((_m = unref(settingStore).options.settings) == null ? void 0 : _m.orgn)}</span></div></div></div><div class="line" data-v-d88f3b9b${_scopeId}></div><div class="item" data-v-d88f3b9b${_scopeId}><p data-v-d88f3b9b${_scopeId}>Постановка в налоговый учет</p><span data-v-d88f3b9b${_scopeId}>${ssrInterpolate((_n = unref(settingStore).options.settings) == null ? void 0 : _n.tax_system)}</span></div></div></section></main>`);
          } else {
            return [
              createVNode("main", { class: "flex flex-col gap-24" }, [
                createVNode("section", { class: "relative main_page_container" }, [
                  createVNode("div", { class: "container py-10 mx-auto" }, [
                    createVNode("div", { class: "lg:max-w-[570px] flex flex-col gap-8 sm:gap-28" }, [
                      createVNode("h1", { class: "text-3xl sm:text-[56px] leading-[92%] font-bold RF-Dewi-Extended" }, [
                        createTextVNode(" Комплексное и оптовые поставки металлопроката "),
                        createVNode("br"),
                        createVNode("span", { class: "text-black/35" }, "по всей России")
                      ]),
                      createVNode("div", { class: "flex flex-col gap-8" }, [
                        createVNode("p", { class: "text-gray_icon font-normal text-xl" }, " Мы предлагаем широкий ассортимент металлопроката, соответствующего все требованиям ГОСТ, применяемого в строительных, промышленных и производственных целях. "),
                        createVNode("button", {
                          onClick: ($event) => unref(useContactModalStore)().openModal(),
                          class: "btn btn-primary p-6 sm:w-fit flex justify-center"
                        }, " Заказать звонок ", 8, ["onClick"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "max-md:hidden overflow-hidden absolute bottom-0 right-0 -z-10 w-[50%]" }, [
                    createVNode("img", {
                      src: "/assets/img/metall.png",
                      class: "object-contain h-[700px]",
                      alt: "metall",
                      srcset: ""
                    })
                  ])
                ]),
                createVNode("section", { class: "flex overflow-x-hidden flex-col gap-12" }, [
                  createVNode("div", { class: "container max-sm:flex-col mx-auto flex justify-between md:items-center" }, [
                    createVNode("div", { class: "flex max-sm:flex-col max-md:gap-2 title sm:items-center gap-4" }, [
                      createVNode("p", { class: "title leading-none font-bold" }, "Наш каталог"),
                      createVNode("p", { class: "title max-sm:text-xl max-md:text-2xl leading-none text-black/35 font-bold" }, toDisplayString(__props.categories.length) + " категорий ", 1)
                    ]),
                    createVNode(unref(ie), {
                      href: "/catalog",
                      class: "flex max-sm:hidden items-center text-gray_icon gap-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Смотр��ть все категории "),
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "14",
                          height: "11",
                          viewBox: "0 0 14 11",
                          fill: "none"
                        }, [
                          createVNode("path", {
                            d: "M1.66683 5.5H12.3335M12.3335 5.5L8.3335 1.5M12.3335 5.5L8.3335 9.5",
                            stroke: "#4B4951",
                            "stroke-width": "1.6",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          })
                        ]))
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ie), {
                      href: "/catalog",
                      class: "max-sm:flex hidden btn btn-secondary leading-none mt-3 max-md:w-fit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Смотреть все категории ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "container mx-auto relative" }, [
                    createVNode("div", { class: "flex items-center overflow-scroll gap-4" }, [
                      createVNode(unref(Swiper), {
                        loop: false,
                        "allow-touch-move": true,
                        breakpoints: {
                          320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                          },
                          768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                          },
                          1024: {
                            slidesPerView: 3,
                            spaceBetween: 20
                          }
                        },
                        onSwiper,
                        onSlideChange
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                            return openBlock(), createBlock(unref(SwiperSlide), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "category-card" }, [
                                  createVNode("p", { class: "text-black/80 text-xl max-sm:hidden" }, toDisplayString(category.products_count) + " товара ", 1),
                                  createVNode("img", {
                                    src: "/storage/" + category.image,
                                    class: "img-category",
                                    alt: "category"
                                  }, null, 8, ["src"]),
                                  createVNode("div", { class: "flex items-center justify-center max-w-[200px] text-center flex-col gap-6" }, [
                                    createVNode("p", { class: "text-dark text-2xl leading-[100%] font-bold RF-Dewi-Extended" }, toDisplayString(category.name), 1),
                                    createVNode(unref(ie), {
                                      href: "/category/" + category.id,
                                      class: "next max-sm:hidden"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Перейти "),
                                        (openBlock(), createBlock("svg", {
                                          width: "8",
                                          height: "14",
                                          viewBox: "0 0 8 14",
                                          fill: "none",
                                          xmlns: "http://www.w3.org/2000/svg"
                                        }, [
                                          createVNode("path", {
                                            d: "M1 13L7 7L1 1",
                                            stroke: "#7645EF",
                                            "stroke-width": "1.6",
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round"
                                          })
                                        ]))
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ]),
                                  createVNode("p", { class: "text-black/80 text-xl sm:hidden" }, toDisplayString(category.products_count) + " товара ", 1)
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 256))
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "absolute flex gap-2 transform -translate-x-1/2 z-10 w-full justify-between px-5 left-1/2 top-1/2" }, [
                      ((_o = swiperInstance.value) == null ? void 0 : _o.activeIndex) > 0 ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => {
                          var _a2;
                          return (_a2 = swiperInstance.value) == null ? void 0 : _a2.slidePrev();
                        },
                        class: "rounded-full bg-white h-10 w-10 flex items-center justify-center shadow-md"
                      }, [
                        (openBlock(), createBlock("svg", {
                          width: "8",
                          height: "14",
                          viewBox: "0 0 8 14",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M7 1L1 7L7 13",
                            stroke: "#7645EF",
                            "stroke-width": "1.6",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          })
                        ]))
                      ], 8, ["onClick"])) : (openBlock(), createBlock("div", { key: 1 })),
                      ((_p = swiperInstance.value) == null ? void 0 : _p.activeIndex) < ((_r = (_q = swiperInstance.value) == null ? void 0 : _q.slides) == null ? void 0 : _r.length) - ((_t = (_s = swiperInstance.value) == null ? void 0 : _s.params) == null ? void 0 : _t.slidesPerView) ? (openBlock(), createBlock("button", {
                        key: 2,
                        onClick: ($event) => {
                          var _a2;
                          return (_a2 = swiperInstance.value) == null ? void 0 : _a2.slideNext();
                        },
                        class: "rounded-full bg-white h-10 w-10 flex items-center justify-center shadow-md"
                      }, [
                        (openBlock(), createBlock("svg", {
                          width: "8",
                          height: "14",
                          viewBox: "0 0 8 14",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M1 13L7 7L1 1",
                            stroke: "#7645EF",
                            "stroke-width": "1.6",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          })
                        ]))
                      ], 8, ["onClick"])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("section", { class: "flex container items-center justify-center mx-auto flex-col gap-12" }, [
                  createVNode("h2", { class: "title-big text-center max-w-[630px]" }, " Уникальные преимущества "),
                  createVNode("div", { class: "grid md:grid-cols-2 gap-3 w-full" }, [
                    createVNode("div", { class: "advantages-card advantages-bg-1" }, [
                      createVNode("div", { class: "advantages-item" }, [
                        createVNode("div", null, [
                          (openBlock(), createBlock("svg", {
                            width: "24",
                            height: "25",
                            viewBox: "0 0 24 25",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d: "M16.4239 8.76545C16.0487 8.43653 15.5091 8.44401 15.1995 8.53962C15.4023 8.29057 15.8747 8.08637 16.0139 8.06158C16.1199 8.10132 16.4239 8.41371 16.4239 8.76545ZM17.6219 7.40335C17.3751 6.08335 14.3075 6.95798 12.7627 6.39732C12.7331 6.78211 13.2383 7.39863 13.7215 7.62683C12.8955 8.34368 12.1539 9.78801 12.0043 11.5526C11.8551 9.78801 11.1135 8.34368 10.2875 7.62683C10.7707 7.39863 11.2763 6.78211 11.2463 6.39732C9.70148 6.95798 6.63388 6.08335 6.38668 7.40335C6.33468 7.6827 6.46908 8.1084 6.61428 8.23076C6.64028 8.14224 6.77588 7.85266 7.20348 7.78775C9.36468 7.46119 11.1691 10.7921 9.54028 12.1388C9.51548 12.1593 9.52948 12.1971 9.56308 12.1971H14.4463C14.4795 12.1971 14.4935 12.1593 14.4691 12.1388C12.8399 10.7921 14.6443 7.46119 16.8055 7.78775C17.2335 7.85266 17.3687 8.14224 17.3947 8.23076C17.5399 8.1084 17.6743 7.6827 17.6219 7.40335ZM18.1475 4.37385C18.1087 4.24912 19.3759 4.24598 19.3759 5.03916C19.3759 5.5707 18.6179 5.8225 18.6179 6.37411C18.6179 6.63103 18.8943 6.81948 18.9791 6.81948C18.7839 5.93385 19.5911 6.39732 19.8091 6.56296C19.3759 5.37201 20.3511 5.37948 20.2551 4.83339C20.1883 4.45175 19.3407 4.56703 19.0339 4.37385C18.4895 4.03116 17.8455 2.69778 17.4211 4.03116C18.2123 4.76571 17.7519 5.84689 16.7475 5.84689C16.7475 5.84689 16.7419 6.00545 16.7511 6.01804C17.9491 5.95942 18.3667 5.07889 18.1475 4.37385ZM4.17068 6.56296C4.38868 6.39732 5.19588 5.93385 5.00108 6.81948C5.08548 6.81948 5.36188 6.63103 5.36188 6.37411C5.36188 5.8225 4.60388 5.5707 4.60388 5.03916C4.60388 4.24598 5.87108 4.24912 5.83228 4.37385C5.61348 5.07889 6.03108 5.95942 7.22908 6.01804C7.23788 6.00545 7.23228 5.84689 7.23228 5.84689C6.22828 5.84689 5.76788 4.76571 6.55868 4.03116C6.13428 2.69778 5.49028 4.03116 4.94588 4.37385C4.63908 4.56703 3.79148 4.45175 3.72468 4.83339C3.62908 5.37948 4.60388 5.37201 4.17068 6.56296ZM7.57228 8.76545C7.94788 8.43653 8.48748 8.44401 8.79668 8.53962C8.59468 8.29057 8.12148 8.08637 7.98268 8.06158C7.87668 8.10132 7.57228 8.41371 7.57228 8.76545ZM12.5743 1.38171L11.9899 0.669189L11.4055 1.38171L11.9899 2.13162L12.5743 1.38171ZM15.9103 3.53621L15.4947 3.02984L15.0795 3.53621L15.4947 4.03116L15.9103 3.53621ZM19.2811 18.1731L18.7543 17.6155L18.2275 18.1731L18.7543 18.6621L19.2811 18.1731ZM8.90068 3.53621L8.48508 3.02984L8.06988 3.53621L8.48508 4.03116L8.90068 3.53621ZM7.71028 6.01804H9.26028C10.5635 6.01804 11.1499 5.21817 11.3271 4.52453H12.6531C12.8303 5.21817 13.4163 6.01804 14.7199 6.01804H16.2699C16.2699 6.01804 16.5411 5.65017 16.6091 5.46801C16.8539 4.81253 16.5411 4.50683 16.0847 4.50683L15.4947 5.04152L14.9047 4.50683C14.4483 4.50683 14.1355 4.81253 14.3803 5.46801C14.4115 5.55181 14.4863 5.67496 14.5571 5.78316C14.0071 5.70762 13.3051 5.33109 13.1511 4.52453C13.1511 4.52453 13.5575 3.87889 13.6595 3.61765C14.0259 2.67811 13.5579 2.29411 12.8735 2.29411L11.9899 3.3328L11.1063 2.29411C10.4219 2.29411 9.95388 2.67811 10.3207 3.61765C10.4223 3.87889 10.8291 4.52453 10.8291 4.52453C10.6747 5.33109 9.97268 5.70762 9.42268 5.78316C9.49388 5.67496 9.56828 5.55181 9.59948 5.46801C9.84388 4.81253 9.53188 4.50683 9.07508 4.50683L8.48508 5.04152L7.89508 4.50683C7.43828 4.50683 7.12628 4.81253 7.37068 5.46801C7.43868 5.65017 7.71028 6.01804 7.71028 6.01804ZM23.7355 10.8228C23.4363 10.9742 21.6811 11.7965 19.4327 11.4924C19.4563 11.385 19.4755 11.2768 19.4919 11.1686C20.9883 10.9896 22.2047 10.7358 22.9799 10.3046C23.8635 9.8128 24.2499 8.63876 23.8039 7.76532C23.7923 7.74329 23.7603 7.73935 23.7443 7.75784C23.4999 8.03916 21.9631 9.71089 19.5419 10.2306C19.5355 10.1043 19.5243 9.97962 19.5075 9.85568C20.6835 9.1888 21.8315 8.4204 22.3783 7.71771C23.2047 6.65542 23.1287 5.3004 22.3423 4.60952C22.3255 4.59457 22.2983 4.59889 22.2867 4.61739C22.0379 5.02775 19.7091 8.79181 17.1523 10.4167C17.1267 10.4333 17.0923 10.4545 17.0579 10.4754C16.9847 10.5198 16.9767 10.615 17.0391 10.6717C17.3339 10.9388 17.5171 11.3106 17.5171 11.7234C17.5171 12.441 16.9639 13.0378 16.2327 13.1673C15.8611 13.2393 15.3247 13.2184 14.8095 13.0481C14.7863 13.0406 14.7623 13.0559 14.7623 13.0792V15.3521C14.7623 15.3887 14.8179 15.3977 14.8311 15.3627C15.1443 14.5329 16.0819 14.3567 16.4919 14.3567C16.6395 15.2435 16.9031 15.978 17.2455 16.3735C17.8031 17.0159 18.7135 17.0069 19.1083 16.5627C19.1219 16.5474 19.1179 16.5234 19.0995 16.5131C18.8675 16.3797 17.5403 15.5649 17.2747 14.2296C17.3795 14.1934 17.4819 14.1525 17.5799 14.1041C18.0083 14.8131 18.6319 15.4445 19.1339 15.6857C19.9771 16.0902 20.7491 15.8935 21.0915 15.3013C21.1039 15.2805 21.0887 15.2545 21.0635 15.2521C20.5419 15.2104 18.9411 14.7517 18.2595 13.6339C18.3375 13.5623 18.4139 13.4875 18.4851 13.4081C19.1983 13.951 20.2067 14.431 20.9287 14.529C21.7735 14.6439 22.7307 14.3744 22.7539 13.3919C22.7543 13.3723 22.7367 13.3561 22.7159 13.3573C22.4155 13.3754 20.4271 13.462 19.0103 12.6487C19.0595 12.5555 19.1051 12.4603 19.1479 12.3631C19.1479 12.3631 21.2887 12.8691 22.3031 12.7015C23.3111 12.535 23.9015 11.7835 23.7875 10.8487C23.7843 10.8255 23.7571 10.8117 23.7355 10.8228ZM4.83188 12.3631C4.87468 12.4603 4.92068 12.5555 4.96988 12.6487C3.55348 13.4616 1.56588 13.3758 1.26428 13.3573C1.24308 13.3561 1.22548 13.3731 1.22588 13.3923C1.24948 14.3744 2.20628 14.6439 3.05108 14.529C3.77268 14.431 4.78148 13.951 5.49468 13.4081C5.56628 13.4875 5.64228 13.5623 5.72028 13.6339C5.03828 14.7517 3.43788 15.2104 2.91628 15.2521C2.89108 15.2545 2.87628 15.2805 2.88828 15.3013C3.23068 15.8935 4.00268 16.0902 4.84628 15.6857C5.34788 15.4445 5.97148 14.8131 6.39988 14.1041C6.49828 14.1525 6.60068 14.1934 6.70508 14.2296C6.43948 15.5649 5.11228 16.3797 4.88028 16.5131C4.86228 16.5234 4.85788 16.5474 4.87148 16.5627C5.26628 17.0069 6.17708 17.0159 6.73468 16.3735C7.07708 15.978 7.34028 15.2435 7.48788 14.3567C7.89828 14.3567 8.83548 14.5329 9.14868 15.3627C9.16228 15.3977 9.21788 15.3887 9.21788 15.3521V13.0792C9.21788 13.0559 9.19348 13.0406 9.17028 13.0481C8.65508 13.2184 8.11868 13.2393 7.74748 13.1673C7.01588 13.0378 6.46268 12.441 6.46268 11.7234C6.46268 11.3106 6.64628 10.9384 6.94068 10.6713C7.00348 10.615 6.99508 10.5198 6.92228 10.4754C6.88748 10.4545 6.85308 10.4333 6.82708 10.4167C4.27188 8.7926 1.94428 5.03129 1.69348 4.61817C1.68188 4.59889 1.65388 4.59496 1.63668 4.60991C0.85148 5.30119 0.77508 6.65581 1.60148 7.71771C2.14828 8.4204 3.29628 9.1888 4.47188 9.85568C4.45548 9.97962 4.44388 10.1043 4.43788 10.2306C2.01868 9.71129 0.48308 8.0423 0.23628 7.75903C0.21988 7.73975 0.18708 7.74368 0.17588 7.76571C-0.26932 8.63955 0.11708 9.8128 0.99988 10.3046C1.77508 10.7358 2.99148 10.9896 4.48788 11.1686C4.50428 11.2768 4.52348 11.385 4.54708 11.4924C2.30108 11.7961 0.54668 10.9758 0.24508 10.8232C0.22268 10.8117 0.19548 10.8259 0.19268 10.8495C0.0790803 11.7843 0.66908 12.535 1.67708 12.7015C2.69108 12.8691 4.83188 12.3631 4.83188 12.3631ZM18.7543 19.3801L17.9743 18.7664C17.6631 18.9517 17.4343 19.246 17.3455 19.591C16.8763 19.6567 15.5971 19.3727 15.7215 19.1842C17.1235 17.2123 16.0511 16.0382 14.7623 16.1035V17.4279C14.7623 17.8532 14.3911 18.1978 13.9339 18.1978H13.0439C12.4055 18.1978 11.9899 18.8396 11.9899 18.8396C11.9899 18.8396 11.5743 18.1978 10.9359 18.1978H10.0459C9.58828 18.1978 9.21788 17.8532 9.21788 17.4279V16.1035C7.92908 16.0382 6.85588 17.2123 8.25828 19.1842C8.38148 19.3707 7.06668 19.6693 6.44988 19.5938C6.28748 19.4254 6.05308 19.3192 5.79068 19.3192C5.67508 19.3192 5.56508 19.3404 5.46388 19.3778C5.46388 19.3778 3.04028 17.0832 2.99588 17.0608L3.01588 17.0144C3.15388 16.7563 2.94268 16.475 2.80908 16.4946C2.96428 16.3085 2.97148 15.4937 2.11068 15.3053C2.13588 15.4689 2.14868 15.803 2.14868 15.803C2.14868 15.803 1.48428 15.4437 1.15068 15.7538C0.85748 16.1008 1.26428 16.7303 1.26428 16.7303C1.26428 16.7303 0.92428 16.7386 0.75668 16.7244C1.00308 17.5577 1.82948 17.4987 2.00828 17.3342C1.99668 17.4668 2.29548 17.6557 2.54868 17.5042L2.65988 17.4503C2.67948 17.4767 5.03988 19.7067 5.03988 19.7067C4.93148 19.8676 4.87988 20.0651 4.91548 20.2756C4.97148 20.6045 5.24548 20.8772 5.59548 20.948C5.84268 20.9976 6.07508 20.9496 6.26148 20.8406L6.88628 21.4205C6.94188 21.4709 7.01708 21.5024 7.10108 21.4965C7.25388 21.4862 7.36828 21.3623 7.35668 21.2203C7.35188 21.1561 7.31908 21.1011 7.27388 21.0594C7.26388 21.0483 6.63748 20.4668 6.63748 20.4668C7.15428 20.1045 8.11708 19.8491 8.91628 19.8491C9.05668 19.8491 9.12268 19.7303 9.07428 19.6138C8.71228 18.7432 9.49068 18.1125 10.2959 18.6259C10.6471 18.8498 11.0039 19.2908 11.2727 20.0266C9.95148 20.3464 8.29268 21.2277 7.95708 22.1897C7.82788 22.5611 8.25468 23.0675 8.77308 23.1694C8.79268 23.1737 8.81148 23.1607 8.81508 23.1422C9.08588 21.7062 10.6303 20.636 11.4339 20.4542C11.4743 20.5624 11.4611 20.5274 11.5015 20.6352C10.6263 21.0491 9.77748 21.9222 9.53508 22.9601C9.42388 23.4354 9.95388 23.8638 10.3915 23.9811C10.4135 23.987 10.4351 23.9716 10.4363 23.9504C10.5195 22.6378 11.0991 21.5232 11.6183 21.0161C11.6323 21.1136 11.6431 21.2136 11.6503 21.3147C11.6503 21.3147 11.1187 22.796 11.1187 23.8768C11.1187 24.3796 11.8659 24.7306 11.9763 24.7797C12.1143 24.7306 12.8611 24.3796 12.8611 23.8768C12.8611 22.796 12.3295 21.3147 12.3295 21.3147C12.3371 21.2136 12.3475 21.1136 12.3619 21.0161C12.8807 21.5232 13.4607 22.6375 13.5435 23.95C13.5447 23.9712 13.5667 23.987 13.5883 23.9811C14.0263 23.8638 14.5559 23.4354 14.4451 22.9601C14.2023 21.9222 13.3539 21.0491 12.4787 20.6352C12.5187 20.5274 12.5055 20.5624 12.5459 20.4542C13.3499 20.636 14.8939 21.7062 15.1647 23.1422C15.1683 23.1607 15.1875 23.1737 15.2067 23.1694C15.7247 23.0675 16.1523 22.5611 16.0223 22.1897C15.6875 21.2277 14.0283 20.3464 12.7071 20.0266C12.9763 19.2908 13.3331 18.8498 13.6843 18.6259C14.4891 18.1125 15.2675 18.7432 14.9055 19.6138C14.8571 19.7303 14.9227 19.8491 15.0635 19.8491C15.9675 19.8491 17.0811 20.1757 17.5219 20.6136C17.8035 21.0361 18.3239 21.3064 18.9111 21.2486C19.5783 21.1833 20.1223 20.682 20.1975 20.0624C20.2631 19.5194 19.9823 19.0319 19.5347 18.7664L18.7543 19.3801ZM13.0051 15.4249C13.2831 15.3218 13.7187 15.4052 13.7039 15.8065C13.7003 15.8974 13.8279 15.8974 13.8371 15.8045C13.9203 15.2037 13.5143 15.0306 13.0895 15.1011C13.0367 14.8945 12.9935 14.7139 12.9443 14.5349C12.9051 14.3901 12.8907 14.1182 13.0583 14.1182C13.1487 14.1182 13.1123 14.3712 13.1039 14.4802C13.0963 14.5758 13.1307 14.6336 13.2083 14.6364C13.2567 14.6384 13.3171 14.5766 13.3531 14.5357C13.5963 14.2607 13.6527 13.835 13.3679 13.6296C13.1295 13.4573 12.5327 13.5855 12.3687 13.831C12.3439 13.7386 12.2255 13.5859 12.1687 13.5194C12.1135 13.4545 12.0991 13.41 12.1755 13.353C12.2115 13.3255 12.3203 13.2173 12.3203 13.1055C12.3203 13.0394 12.2691 12.9175 12.1063 12.9175C11.9779 12.9175 11.8351 13.0064 11.8351 13.2047C11.8351 13.2487 11.8459 13.2959 11.8743 13.3467C11.7931 13.3333 11.5727 13.3388 11.4595 13.3668L13.0247 17.662C13.4727 17.4409 13.8011 17.0907 13.8011 16.715C13.8011 16.3947 13.3295 16.5009 13.1003 16.7508C13.0267 16.3447 12.9611 15.9698 12.8895 15.596C12.8699 15.4929 12.9223 15.4559 13.0051 15.4249ZM10.7919 12.5071L11.1207 13.4207C10.8391 13.4875 10.3863 13.6929 10.3863 13.9648C10.3863 14.3268 11.0267 14.5624 11.3971 14.5341C11.3787 14.6167 11.3999 14.6903 11.4575 14.7576C11.3231 14.7576 11.0695 14.8201 10.9863 14.9098C10.7899 14.7269 10.4827 14.6604 10.3367 14.7717C10.1899 14.8839 10.1855 15.0739 10.3387 15.2887C10.4455 15.4375 10.4855 15.5842 10.3655 15.7565C10.8119 15.7565 10.6475 15.1762 10.8223 15.1762C10.7995 15.2887 10.8135 15.419 10.8643 15.5634C10.8979 15.6594 10.8979 15.7274 10.8403 15.8199C10.6963 16.05 10.4723 16.5788 10.5027 17.0569C10.3563 17.0561 10.2819 17.0203 10.3335 16.8204C10.3527 16.746 10.3067 16.6929 10.2459 16.7846C10.1787 16.8857 10.1463 17.0584 10.1463 17.1324C10.1463 17.5581 10.6535 17.6439 10.8471 17.5538C11.4071 18.0957 12.5071 17.9512 12.8755 17.7694L10.9387 12.4552C10.8991 12.3548 10.7571 12.4028 10.7919 12.5071ZM10.7247 16.8845C10.6847 16.6658 10.9891 16.2747 11.3763 15.8974C11.2939 16.1433 11.3451 16.567 11.5067 16.713C11.2259 16.713 10.8923 16.7657 10.7247 16.8845Z",
                              fill: "black"
                            })
                          ])),
                          createTextVNode(" Партнерство с гос. структурами ")
                        ]),
                        createVNode("div", null, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "18",
                            height: "18",
                            viewBox: "0 0 18 18",
                            fill: "none"
                          }, [
                            createVNode("path", {
                              d: "M7.21386 0.131066C5.9578 -0.275544 4.59234 0.290042 3.99167 1.46575L3.26953 2.8792C3.18373 3.04714 3.04714 3.18373 2.8792 3.26953L1.46575 3.99167C0.290042 4.59234 -0.275544 5.9578 0.131066 7.21386L0.619902 8.72394C0.677984 8.90336 0.677984 9.09658 0.619902 9.276L0.131066 10.7861C-0.275544 12.0422 0.290042 13.4076 1.46575 14.0083L2.8792 14.7304C3.04714 14.8162 3.18373 14.9528 3.26953 15.1208L3.99167 16.5342C4.59234 17.71 5.9578 18.2755 7.21386 17.8689L8.72394 17.3801C8.90336 17.322 9.09658 17.322 9.276 17.3801L10.7861 17.8689C12.0422 18.2755 13.4076 17.71 14.0083 16.5342L14.7304 15.1208C14.8162 14.9528 14.9528 14.8162 15.1208 14.7304L16.5342 14.0083C17.71 13.4076 18.2755 12.0422 17.8689 10.7861L17.3801 9.276C17.322 9.09658 17.322 8.90336 17.3801 8.72394L17.8689 7.21386C18.2755 5.9578 17.71 4.59234 16.5342 3.99167L15.1208 3.26953C14.9528 3.18373 14.8162 3.04714 14.7304 2.8792L14.0083 1.46575C13.4076 0.290042 12.0422 -0.275544 10.7861 0.131066L9.276 0.619902C9.09658 0.677976 8.90336 0.677984 8.72394 0.619902L7.21386 0.131066ZM4.30373 8.78247L5.57114 7.51498L8.10593 10.0499L13.1756 4.98024L14.443 6.24765L8.10593 12.5846L4.30373 8.78247Z",
                              fill: "#4B4951",
                              "fill-opacity": "0.8"
                            })
                          ])),
                          createTextVNode(" Счет для бизнеса по металлу ")
                        ])
                      ]),
                      createVNode("div", { class: "advantages-card-text" }, [
                        createVNode("p", null, " Работаем с ГосОборон заказами и ГосКонтрактами. Открытие отдельного банковского счета. "),
                        createVNode("span", null, "Работа с государственными заказами представляет собой уникальную возможность для компаний, занимающихся комплексными и оптовыми поставками металлопродукта.")
                      ])
                    ]),
                    createVNode("div", { class: "advantages-card advantages-bg-2" }, [
                      createVNode("div", { class: "advantages-item" }, [
                        createVNode("div", null, [
                          (openBlock(), createBlock("svg", {
                            width: "22",
                            height: "22",
                            viewBox: "0 0 22 22",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              "clip-rule": "evenodd",
                              d: "M21.7071 14.2929C22.0976 14.6834 22.0976 15.3166 21.7071 15.7071L17.7071 19.7071C17.3166 20.0976 16.6834 20.0976 16.2929 19.7071L14.2929 17.7071C13.9024 17.3166 13.9024 16.6834 14.2929 16.2929C14.6834 15.9024 15.3166 15.9024 15.7071 16.2929L17 17.5858L20.2929 14.2929C20.6834 13.9024 21.3166 13.9024 21.7071 14.2929Z",
                              fill: "black"
                            }),
                            createVNode("path", {
                              d: "M9.5971 0.185046C9.86292 0.130375 10.1371 0.130375 10.4029 0.185046C10.7102 0.248242 10.9848 0.402069 11.2032 0.524362L11.2627 0.557609C13.0256 1.53701 16.0079 3.19466 17.6893 4.12926C18.0975 4.35619 18.3017 4.46965 18.3699 4.61961C18.4293 4.75034 18.4297 4.90033 18.3709 5.03136C18.3035 5.18166 18.0997 5.29625 17.6923 5.52544L15.3632 6.83555L6.40038 1.85619L8.73733 0.55761L8.79685 0.524362C9.01519 0.402069 9.28983 0.248242 9.5971 0.185046Z",
                              fill: "black"
                            }),
                            createVNode("path", {
                              d: "M4.34168 3.00039L13.3169 7.98661L10.3922 9.63177C10.2491 9.71225 10.1776 9.75249 10.1017 9.76825C10.0346 9.78221 9.96533 9.78221 9.8982 9.76825C9.82235 9.75249 9.75082 9.71225 9.60775 9.63177L2.30769 5.52545C1.90025 5.29627 1.69653 5.18167 1.62907 5.03137C1.57027 4.90034 1.57065 4.75035 1.63012 4.61962C1.69833 4.46967 1.90245 4.3562 2.3107 4.12928L4.34168 3.00039Z",
                              fill: "black"
                            }),
                            createVNode("path", {
                              d: "M19.9959 7.89013C19.9955 7.4418 19.9953 7.21764 19.9008 7.08675C19.8183 6.97256 19.6915 6.89845 19.5515 6.88267C19.3911 6.86457 19.1953 6.97469 18.8038 7.19493L11.4078 11.3552C11.2593 11.4387 11.1851 11.4805 11.1311 11.5395C11.0833 11.5918 11.0471 11.6536 11.025 11.7209C11 11.7969 11 11.8821 11 12.0524V20.2277C11 20.6749 11 20.8985 11.094 21.0293C11.1761 21.1434 11.3023 21.2177 11.4419 21.234C11.6019 21.2527 11.7968 21.1445 12.1865 20.9281C12.3936 20.8131 12.6217 20.6865 12.8658 20.5509C13.1807 20.3761 13.3381 20.2887 13.4075 20.1643C13.4683 20.0554 13.4862 19.9278 13.4577 19.8064C13.4251 19.6678 13.2978 19.5404 13.0432 19.2858L12.8787 19.1213C11.7071 17.9497 11.7071 16.0503 12.8787 14.8787C14.0095 13.7478 15.8186 13.7085 16.9966 14.7608L18.8787 12.8787C19.0647 12.6926 19.2691 12.5361 19.4861 12.4092C19.7082 12.2791 19.8193 12.2141 19.8718 12.1554C19.9268 12.0938 19.9493 12.0544 19.9746 11.9759C19.9988 11.9009 19.9988 11.8022 19.9986 11.6049C19.9978 10.2354 19.9967 8.86272 19.9959 7.89013Z",
                              fill: "black"
                            }),
                            createVNode("path", {
                              d: "M7.81351 20.9281C8.20323 21.1445 8.39809 21.2527 8.55808 21.234C8.69766 21.2177 8.82394 21.1434 8.90598 21.0293C9 20.8985 9 20.6749 9 20.2277V12.0525C9 11.8821 9 11.797 8.97501 11.7209C8.95289 11.6536 8.91674 11.5918 8.86894 11.5396C8.81491 11.4805 8.74066 11.4387 8.59221 11.3552L1.19624 7.19496C0.804702 6.97472 0.608935 6.8646 0.448491 6.88269C0.308519 6.89848 0.181685 6.97259 0.0992064 7.08677C0.00466455 7.21766 0.00447714 7.44183 0.00410232 7.89017C0.00254217 9.75633 2.55066e-06 13.0956 2.55066e-06 15.0586L-0.000175071 15.1308C-0.00113637 15.3946 -0.00234505 15.7264 0.100972 16.0391C0.190297 16.3095 0.336318 16.5576 0.529269 16.767C0.752434 17.0092 1.04303 17.1692 1.27416 17.2966L1.33733 17.3314C3.11852 18.321 6.14715 20.0028 7.81351 20.9281Z",
                              fill: "black"
                            }),
                            createVNode("path", {
                              d: "M7.81351 20.9281C8.20323 21.1445 8.39809 21.2527 8.55808 21.234C8.69766 21.2177 8.82394 21.1434 8.90598 21.0293C9 20.8985 9 20.6749 9 20.2277V12.0525C9 11.8821 9 11.797 8.97501 11.7209C8.95289 11.6536 8.91674 11.5918 8.86894 11.5396C8.81491 11.4805 8.74066 11.4387 8.59221 11.3552L1.19624 7.19496C0.804702 6.97472 0.608935 6.8646 0.448491 6.88269C0.308519 6.89848 0.181685 6.97259 0.0992064 7.08677C0.00466455 7.21766 0.00447714 7.44183 0.00410232 7.89017C0.00254217 9.75633 2.55066e-06 13.0956 2.55066e-06 15.0586L-0.000175071 15.1308C-0.00113637 15.3946 -0.00234505 15.7264 0.100972 16.0391C0.190297 16.3095 0.336318 16.5576 0.529269 16.767C0.752434 17.0092 1.04303 17.1692 1.27416 17.2966L1.33733 17.3314C3.11852 18.321 6.14715 20.0028 7.81351 20.9281Z",
                              fill: "black"
                            })
                          ])),
                          createTextVNode(" Профессиональный подход ")
                        ]),
                        createVNode("div", null, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "18",
                            height: "18",
                            viewBox: "0 0 18 18",
                            fill: "none"
                          }, [
                            createVNode("path", {
                              d: "M7.21386 0.131066C5.9578 -0.275544 4.59234 0.290042 3.99167 1.46575L3.26953 2.8792C3.18373 3.04714 3.04714 3.18373 2.8792 3.26953L1.46575 3.99167C0.290042 4.59234 -0.275544 5.9578 0.131066 7.21386L0.619902 8.72394C0.677984 8.90336 0.677984 9.09658 0.619902 9.276L0.131066 10.7861C-0.275544 12.0422 0.290042 13.4076 1.46575 14.0083L2.8792 14.7304C3.04714 14.8162 3.18373 14.9528 3.26953 15.1208L3.99167 16.5342C4.59234 17.71 5.9578 18.2755 7.21386 17.8689L8.72394 17.3801C8.90336 17.322 9.09658 17.322 9.276 17.3801L10.7861 17.8689C12.0422 18.2755 13.4076 17.71 14.0083 16.5342L14.7304 15.1208C14.8162 14.9528 14.9528 14.8162 15.1208 14.7304L16.5342 14.0083C17.71 13.4076 18.2755 12.0422 17.8689 10.7861L17.3801 9.276C17.322 9.09658 17.322 8.90336 17.3801 8.72394L17.8689 7.21386C18.2755 5.9578 17.71 4.59234 16.5342 3.99167L15.1208 3.26953C14.9528 3.18373 14.8162 3.04714 14.7304 2.8792L14.0083 1.46575C13.4076 0.290042 12.0422 -0.275544 10.7861 0.131066L9.276 0.619902C9.09658 0.677976 8.90336 0.677984 8.72394 0.619902L7.21386 0.131066ZM4.30373 8.78247L5.57114 7.51498L8.10593 10.0499L13.1756 4.98024L14.443 6.24765L8.10593 12.5846L4.30373 8.78247Z",
                              fill: "#4B4951",
                              "fill-opacity": "0.8"
                            })
                          ])),
                          createTextVNode(" Проверенная компания ")
                        ])
                      ]),
                      createVNode("div", { class: "advantages-card-text" }, [
                        createVNode("p", null, " Наша компания уже не первый год осуществляет оптовые поставки металлопроката по всей России. "),
                        createVNode("span", null, "Благодаря наличию собственных складов мы выполняем поставки в самые кратчайшие сроки.")
                      ])
                    ])
                  ])
                ]),
                createVNode("section", { class: "container mx-auto flex flex-col gap-12" }, [
                  createVNode("div", { class: "flex justify-between items-center" }, [
                    createVNode("h2", { class: "title" }, "Популярные товары"),
                    createVNode(unref(ie), {
                      href: "/catalog",
                      class: "flex max-sm:hidden items-center text-gray_icon gap-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Смотреть все категории "),
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "14",
                          height: "11",
                          viewBox: "0 0 14 11",
                          fill: "none"
                        }, [
                          createVNode("path", {
                            d: "M1.66683 5.5H12.3335M12.3335 5.5L8.3335 1.5M12.3335 5.5L8.3335 9.5",
                            stroke: "#4B4951",
                            "stroke-width": "1.6",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          })
                        ]))
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "lg:hidden" }, [
                    createVNode(_sfc_main$4, { products: __props.products }, null, 8, ["products"])
                  ]),
                  createVNode("div", { class: "flex max-lg:hidden overflow-x-auto md:grid grid-cols-4 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.products, (product) => {
                      return openBlock(), createBlock(unref(ie), {
                        href: `/product/${product.id}`,
                        class: "product-card shrink-0"
                      }, {
                        default: withCtx(() => {
                          var _a2, _b2;
                          return [
                            ((_a2 = product.specifications.find(
                              (item) => item.key === "gost"
                            )) == null ? void 0 : _a2.value) ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "gost"
                            }, " ГОСТ " + toDisplayString((_b2 = product.specifications.find(
                              (item) => item.key === "gost"
                            )) == null ? void 0 : _b2.value), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "image-wrapper" }, [
                              createVNode("img", {
                                src: "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images),
                                alt: ""
                              }, null, 8, ["src"])
                            ]),
                            createVNode("div", { class: "flex flex-col h-full justify-between gap-4" }, [
                              createVNode("p", { class: "text-gray_icon text-xs" }, toDisplayString(product.specifications.map((spec) => spec.value).join(", ")), 1),
                              createVNode("div", { class: "product-text" }, [
                                createVNode("p", null, toDisplayString(product.name), 1)
                              ]),
                              createVNode("button", {
                                onClick: withModifiers(($event) => unref(useContactModalStore)().openModal(), ["prevent"]),
                                class: "btn btn-secondary w-fit mt-auto"
                              }, " Заказать звонок ", 8, ["onClick"])
                            ])
                          ];
                        }),
                        _: 2
                      }, 1032, ["href"]);
                    }), 256))
                  ])
                ]),
                createVNode("section", { class: "container px-0 mx-auto flex flex-col gap-12" }, [
                  createVNode("h2", { class: "title max-sm:px-8" }, [
                    createTextVNode(" Занимаемся поставками "),
                    createVNode("br"),
                    createTextVNode(" металлопроката"),
                    createVNode("br"),
                    createTextVNode(" по всей России ")
                  ]),
                  createVNode("div", { class: "max-sm:pl-8" }, [
                    createVNode("img", {
                      class: "flex lg:hidden",
                      src: "/assets/img/map_tablet.png",
                      alt: ""
                    }),
                    createVNode("img", {
                      class: "hidden lg:block",
                      src: "/assets/img/map_pc.png",
                      alt: ""
                    })
                  ])
                ]),
                createVNode("section", { class: "container mx-auto max-md:flex-col flex items-start gap-28" }, [
                  createVNode("div", { class: "flex md:max-w-[500px] flex-col gap-10" }, [
                    createVNode("div", { class: "flex flex-col gap-6" }, [
                      createVNode("h2", { class: "title" }, " Нужна консультация по выбору металлопроката? "),
                      createVNode("p", { class: "text-lg" }, " Оставьте заявку, и наш специалист свяжется с вами для подробной консультации. ")
                    ]),
                    createVNode("div", { class: "flex flex-col gap-6" }, [
                      createVNode("div", { class: "input-label-block" }, [
                        createVNode("label", { for: "name" }, [
                          createTextVNode("Имя и Фамилия "),
                          createVNode("span", null, "*")
                        ]),
                        createVNode("label", { class: "input-wrapper" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "name",
                            "onUpdate:modelValue": ($event) => unref(contactStore).options.data.name = $event,
                            placeholder: "Имя и фамилия",
                            autocomplete: "off"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(contactStore).options.data.name]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "input-label-block" }, [
                        createVNode("label", { for: "phone" }, [
                          createTextVNode("Контактный телефон "),
                          createVNode("span", null, "*")
                        ]),
                        createVNode("label", {
                          for: "phone",
                          class: "input-wrapper"
                        }, [
                          withDirectives(createVNode("input", {
                            type: "tel",
                            id: "phone",
                            "onUpdate:modelValue": ($event) => unref(contactStore).options.data.phone = $event,
                            placeholder: "+7 (900) 000-00-00",
                            autocomplete: "off"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(contactStore).options.data.phone],
                            [_directive_maska]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "input-label-block" }, [
                        createVNode("label", { for: "time" }, "Удобное для вас время"),
                        createVNode("label", {
                          for: "time",
                          class: "input-wrapper"
                        }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "time",
                            "onUpdate:modelValue": ($event) => unref(contactStore).options.data.time = $event,
                            placeholder: "Пятница 12:00",
                            autocomplete: "off"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(contactStore).options.data.time]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "input-label-block" }, [
                        createVNode("label", { for: "email" }, "E-mail"),
                        createVNode("label", {
                          for: "email",
                          class: "input-wrapper"
                        }, [
                          withDirectives(createVNode("input", {
                            type: "email",
                            id: "email",
                            "onUpdate:modelValue": ($event) => unref(contactStore).options.data.email = $event,
                            placeholder: "you@email.com",
                            autocomplete: "off"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(contactStore).options.data.email]
                          ])
                        ]),
                        ((_u = unref(contactStore).options.errors) == null ? void 0 : _u.length) > 0 ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-red text-xs"
                        }, toDisplayString(unref(contactStore).options.errors[0]), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("button", {
                        class: "btn text-center btn-primary justify-center py-4",
                        onClick: ($event) => unref(contactStore).validate()
                      }, " Заказать звонок ", 8, ["onClick"])
                    ])
                  ]),
                  createVNode("div", { class: "info-company-container" }, [
                    createVNode("div", { class: "item" }, [
                      createVNode("p", null, "Название организации"),
                      createVNode("span", null, toDisplayString((_v = unref(settingStore).options.settings) == null ? void 0 : _v.name_company), 1)
                    ]),
                    createVNode("div", { class: "line" }),
                    createVNode("div", { class: "item" }, [
                      createVNode("p", null, "Юридический/Фактический адрес"),
                      createVNode("span", null, toDisplayString((_w = unref(settingStore).options.settings) == null ? void 0 : _w.fakt_address), 1)
                    ]),
                    createVNode("div", { class: "line" }),
                    createVNode("div", { class: "item" }, [
                      createVNode("p", null, "Почтовый адрес"),
                      createVNode("span", null, toDisplayString((_x = unref(settingStore).options.settings) == null ? void 0 : _x.mail_address), 1)
                    ]),
                    createVNode("div", { class: "line" }),
                    createVNode("div", { class: "item" }, [
                      createVNode("div", { class: "flex items-center gap-10" }, [
                        createVNode("div", { class: "company-item" }, [
                          createVNode("p", null, "ИНН"),
                          createVNode("span", null, toDisplayString((_y = unref(settingStore).options.settings) == null ? void 0 : _y.inn), 1)
                        ]),
                        createVNode("div", { class: "company-item" }, [
                          createVNode("p", null, "КПП"),
                          createVNode("span", null, toDisplayString((_z = unref(settingStore).options.settings) == null ? void 0 : _z.kpp), 1)
                        ]),
                        createVNode("div", { class: "company-item" }, [
                          createVNode("p", null, "ОГРН"),
                          createVNode("span", null, toDisplayString((_A = unref(settingStore).options.settings) == null ? void 0 : _A.orgn), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "line" }),
                    createVNode("div", { class: "item" }, [
                      createVNode("p", null, "Постановка в налоговый учет"),
                      createVNode("span", null, toDisplayString((_B = unref(settingStore).options.settings) == null ? void 0 : _B.tax_system), 1)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/main.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const main = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d88f3b9b"]]);
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: main
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "imageSlider",
  __ssrInlineRender: true,
  props: {
    images: Array
  },
  setup(__props) {
    const swiperInstance = ref(null);
    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
    };
    const onSlideChange = () => {
      console.log("Слайд изменен");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative max-w-[630px] container mx-auto" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(Swiper), {
        class: "lg:w-[616px] rounded-3xl w-full",
        loop: false,
        "allow-touch-move": false,
        onSwiper,
        onSlideChange
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.images, (image) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", "/storage/" + image)} alt="" class="rounded-3xl w-full h-full object-cover"${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: "/storage/" + image,
                        alt: "",
                        class: "rounded-3xl w-full h-full object-cover"
                      }, null, 8, ["src"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.images, (image) => {
                return openBlock(), createBlock(unref(SwiperSlide), null, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: "/storage/" + image,
                      alt: "",
                      class: "rounded-3xl w-full h-full object-cover"
                    }, null, 8, ["src"])
                  ]),
                  _: 2
                }, 1024);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="absolute flex gap-2 transform -translate-x-1/2 z-10 w-full justify-between px-5 left-1/2 top-1/2">`);
      if (((_a = swiperInstance.value) == null ? void 0 : _a.activeIndex) > 0) {
        _push(`<button class="rounded-full bg-white_blur h-12 w-12 flex items-center justify-center shadow-md"><svg width="24" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1874 1.07612C11.8816 0.381854 13.0073 0.381854 13.7015 1.07612C14.3958 1.77038 14.3958 2.89601 13.7015 3.59028L6.06971 11.2221H30.2222C31.2041 11.2221 32 12.018 32 12.9999C32 13.9817 31.2041 14.7776 30.2222 14.7776H6.06971L13.7015 22.4095C14.3958 23.1037 14.3958 24.2293 13.7015 24.9236C13.0073 25.6179 11.8816 25.6179 11.1874 24.9236L0.520697 14.2569C-0.173569 13.5627 -0.173569 12.4371 0.520697 11.7428L11.1874 1.07612Z" fill="white"></path></svg></button>`);
      } else {
        _push(`<div></div>`);
      }
      if (((_b = swiperInstance.value) == null ? void 0 : _b.activeIndex) < ((_d = (_c = swiperInstance.value) == null ? void 0 : _c.slides) == null ? void 0 : _d.length) - ((_f = (_e = swiperInstance.value) == null ? void 0 : _e.params) == null ? void 0 : _f.slidesPerView)) {
        _push(`<button class="rounded-full bg-white_blur h-12 w-12 flex items-center justify-center shadow-md"><svg width="24" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.8126 1.07612C20.1184 0.381854 18.9927 0.381854 18.2985 1.07612C17.6042 1.77038 17.6042 2.89601 18.2985 3.59028L25.9303 11.2221H1.77778C0.795938 11.2221 0 12.018 0 12.9999C0 13.9817 0.795938 14.7776 1.77778 14.7776H25.9303L18.2985 22.4095C17.6042 23.1037 17.6042 24.2293 18.2985 24.9236C18.9927 25.6179 20.1184 25.6179 20.8126 24.9236L31.4793 14.2569C32.1736 13.5627 32.1736 12.4371 31.4793 11.7428L20.8126 1.07612Z" fill="white"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Slider/imageSlider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "product",
  __ssrInlineRender: true,
  props: {
    product: Object,
    category: Object,
    subcategory: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const productStore = useProductStore();
    const historyViews = ((_a = JSON.parse(localStorage.getItem("history_views"))) == null ? void 0 : _a.reverse()) || [];
    productStore.addToHistoryViews(props.product);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Z$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(props.product.name)} - КрафтСнаб</title><meta name="description"${ssrRenderAttr("content", props.product.description)}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", props.product.description)}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(props.product.name) + " - КрафтСнаб", 1),
              createVNode("meta", {
                name: "description",
                content: props.product.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: props.product.description
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<main class="flex flex-col py-14 gap-12"${_scopeId}><section class="hidden md:flex flex-col items-start container mx-auto justify-start gap-6"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><a class="text-gray_icon/70" href="/"${_scopeId}>Главная</a><svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><circle cx="3" cy="3" r="3" fill="#E3E3E3"${_scopeId}></circle></svg><a class="text-gray_icon/70" href="/catalog"${_scopeId}>Каталог</a><svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><circle cx="3" cy="3" r="3" fill="#E3E3E3"${_scopeId}></circle></svg>`);
            _push2(ssrRenderComponent(unref(ie), {
              class: "text-gray_icon/70",
              href: _ctx.route("category", props.category.id)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(props.category.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(props.category.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><circle cx="3" cy="3" r="3" fill="#E3E3E3"${_scopeId}></circle></svg>`);
            _push2(ssrRenderComponent(unref(ie), {
              class: "text-gray_icon/70",
              href: _ctx.route("category", {
                category: props.category.id,
                subcategory: props.subcategory.id
              })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(props.subcategory.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(props.subcategory.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><circle cx="3" cy="3" r="3" fill="#E3E3E3"${_scopeId}></circle></svg><span${_scopeId}>${ssrInterpolate(props.product.name)}</span></div></section><section class="flex container mx-auto justify-between flex-wrap"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              images: props.product.images
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex flex-col py-6 gap-8 justify-between w-full lg:w-[552px]"${_scopeId}><div class="flex flex-col"${_scopeId}><div class="flex flex-col gap-4"${_scopeId}><span class="text-3xl lg:text-[56px] leading-none font-bold"${_scopeId}>${ssrInterpolate(props.product.name)}</span><span class="text-base font-normal lg:text-xl"${_scopeId}>${ssrInterpolate(props.product.description)}</span></div></div><div class="flex flex-col border-t-2 border-b-2 border-solid border-border py-6 gap-3"${_scopeId}><!--[-->`);
            ssrRenderList((_a2 = props.product) == null ? void 0 : _a2.specifications, (spec) => {
              _push2(`<div class="catalog-item-element"${_scopeId}><span class="text-base text-gray-1 font-semibold"${_scopeId}>${ssrInterpolate(spec.name)}</span><span class="text-base text-gray-1 font-semibold"${_scopeId}>${ssrInterpolate(spec.value)}</span></div>`);
            });
            _push2(`<!--]--></div><button class="btn btn-primary justify-center py-4"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"${_scopeId}><path d="M5.08685 5.90223C5.55085 6.86865 6.18338 7.77441 6.98443 8.57546C7.78548 9.37651 8.69124 10.009 9.65765 10.473C9.74078 10.5129 9.78234 10.5329 9.83494 10.5482C10.0218 10.6027 10.2513 10.5636 10.4096 10.4502C10.4542 10.4183 10.4923 10.3802 10.5685 10.304C10.8016 10.071 10.9181 9.95443 11.0353 9.87824C11.4772 9.59091 12.0469 9.59091 12.4889 9.87824C12.606 9.95443 12.7226 10.071 12.9556 10.304L13.0856 10.434C13.4399 10.7882 13.617 10.9654 13.7132 11.1556C13.9046 11.534 13.9046 11.9809 13.7132 12.3592C13.617 12.5495 13.4399 12.7266 13.0856 13.0809L12.9805 13.186C12.6274 13.5391 12.4508 13.7156 12.2108 13.8505C11.9445 14.0001 11.5308 14.1077 11.2253 14.1068C10.95 14.1059 10.7619 14.0525 10.3856 13.9457C8.36334 13.3718 6.45509 12.2888 4.86311 10.6968C3.27112 9.10479 2.18814 7.19655 1.61416 5.17429C1.50735 4.79799 1.45395 4.60984 1.45313 4.33455C1.45222 4.02906 1.5598 3.6154 1.70941 3.34907C1.84424 3.10905 2.02078 2.9325 2.37386 2.57942L2.47895 2.47433C2.83325 2.12004 3.0104 1.94289 3.20065 1.84666C3.57903 1.65528 4.02587 1.65528 4.40424 1.84666C4.5945 1.94289 4.77164 2.12004 5.12594 2.47433L5.25585 2.60424C5.48892 2.83732 5.60546 2.95385 5.68165 3.07104C5.96898 3.51296 5.96898 4.08268 5.68165 4.52461C5.60546 4.6418 5.48892 4.75833 5.25585 4.9914C5.17964 5.06761 5.14154 5.10571 5.10965 5.15026C4.99631 5.30854 4.95717 5.53805 5.01165 5.72495C5.02698 5.77755 5.04694 5.81911 5.08685 5.90223Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></svg> Заказать звонок </button></div></section><section class="container mx-auto flex flex-col gap-12"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><h2 class="title"${_scopeId}>Вы недавно смотрели</h2></div><div class="flex overflow-x-auto md:grid grid-cols-4 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(historyViews), (product) => {
              _push2(ssrRenderComponent(unref(ie), {
                href: `/product/${product.id}`,
                class: "product-card shrink-0"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a3, _b2, _c, _d;
                  if (_push3) {
                    if ((_a3 = product.specifications.find(
                      (item) => item.key === "gost"
                    )) == null ? void 0 : _a3.value) {
                      _push3(`<p class="gost"${_scopeId2}> ГОСТ ${ssrInterpolate((_b2 = product.specifications.find(
                        (item) => item.key === "gost"
                      )) == null ? void 0 : _b2.value)}</p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<img class="w-full h-full object-cover rounded-3xl"${ssrRenderAttr(
                      "src",
                      "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images)
                    )}${_scopeId2}><div class="flex flex-col h-full justify-between gap-4"${_scopeId2}><p class="text-gray_icon text-xs"${_scopeId2}>${ssrInterpolate(product.specifications.map((spec) => spec.value).join(", "))}</p><div class="product-text"${_scopeId2}><p${_scopeId2}>${ssrInterpolate(product.name)}</p></div></div>`);
                  } else {
                    return [
                      ((_c = product.specifications.find(
                        (item) => item.key === "gost"
                      )) == null ? void 0 : _c.value) ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "gost"
                      }, " ГОСТ " + toDisplayString((_d = product.specifications.find(
                        (item) => item.key === "gost"
                      )) == null ? void 0 : _d.value), 1)) : createCommentVNode("", true),
                      createVNode("img", {
                        class: "w-full h-full object-cover rounded-3xl",
                        src: "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images)
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "flex flex-col h-full justify-between gap-4" }, [
                        createVNode("p", { class: "text-gray_icon text-xs" }, toDisplayString(product.specifications.map((spec) => spec.value).join(", ")), 1),
                        createVNode("div", { class: "product-text" }, [
                          createVNode("p", null, toDisplayString(product.name), 1)
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></section></main>`);
          } else {
            return [
              createVNode("main", { class: "flex flex-col py-14 gap-12" }, [
                createVNode("section", { class: "hidden md:flex flex-col items-start container mx-auto justify-start gap-6" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("a", {
                      class: "text-gray_icon/70",
                      href: "/"
                    }, "Главная"),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ])),
                    createVNode("a", {
                      class: "text-gray_icon/70",
                      href: "/catalog"
                    }, "Каталог"),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ])),
                    createVNode(unref(ie), {
                      class: "text-gray_icon/70",
                      href: _ctx.route("category", props.category.id)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.category.name), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ])),
                    createVNode(unref(ie), {
                      class: "text-gray_icon/70",
                      href: _ctx.route("category", {
                        category: props.category.id,
                        subcategory: props.subcategory.id
                      })
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.subcategory.name), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ])),
                    createVNode("span", null, toDisplayString(props.product.name), 1)
                  ])
                ]),
                createVNode("section", { class: "flex container mx-auto justify-between flex-wrap" }, [
                  createVNode(_sfc_main$2, {
                    images: props.product.images
                  }, null, 8, ["images"]),
                  createVNode("div", { class: "flex flex-col py-6 gap-8 justify-between w-full lg:w-[552px]" }, [
                    createVNode("div", { class: "flex flex-col" }, [
                      createVNode("div", { class: "flex flex-col gap-4" }, [
                        createVNode("span", { class: "text-3xl lg:text-[56px] leading-none font-bold" }, toDisplayString(props.product.name), 1),
                        createVNode("span", { class: "text-base font-normal lg:text-xl" }, toDisplayString(props.product.description), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-col border-t-2 border-b-2 border-solid border-border py-6 gap-3" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList((_b = props.product) == null ? void 0 : _b.specifications, (spec) => {
                        return openBlock(), createBlock("div", { class: "catalog-item-element" }, [
                          createVNode("span", { class: "text-base text-gray-1 font-semibold" }, toDisplayString(spec.name), 1),
                          createVNode("span", { class: "text-base text-gray-1 font-semibold" }, toDisplayString(spec.value), 1)
                        ]);
                      }), 256))
                    ]),
                    createVNode("button", {
                      onClick: ($event) => unref(useContactModalStore)().openModal(),
                      class: "btn btn-primary justify-center py-4"
                    }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "15",
                        height: "15",
                        viewBox: "0 0 15 15",
                        fill: "none"
                      }, [
                        createVNode("path", {
                          d: "M5.08685 5.90223C5.55085 6.86865 6.18338 7.77441 6.98443 8.57546C7.78548 9.37651 8.69124 10.009 9.65765 10.473C9.74078 10.5129 9.78234 10.5329 9.83494 10.5482C10.0218 10.6027 10.2513 10.5636 10.4096 10.4502C10.4542 10.4183 10.4923 10.3802 10.5685 10.304C10.8016 10.071 10.9181 9.95443 11.0353 9.87824C11.4772 9.59091 12.0469 9.59091 12.4889 9.87824C12.606 9.95443 12.7226 10.071 12.9556 10.304L13.0856 10.434C13.4399 10.7882 13.617 10.9654 13.7132 11.1556C13.9046 11.534 13.9046 11.9809 13.7132 12.3592C13.617 12.5495 13.4399 12.7266 13.0856 13.0809L12.9805 13.186C12.6274 13.5391 12.4508 13.7156 12.2108 13.8505C11.9445 14.0001 11.5308 14.1077 11.2253 14.1068C10.95 14.1059 10.7619 14.0525 10.3856 13.9457C8.36334 13.3718 6.45509 12.2888 4.86311 10.6968C3.27112 9.10479 2.18814 7.19655 1.61416 5.17429C1.50735 4.79799 1.45395 4.60984 1.45313 4.33455C1.45222 4.02906 1.5598 3.6154 1.70941 3.34907C1.84424 3.10905 2.02078 2.9325 2.37386 2.57942L2.47895 2.47433C2.83325 2.12004 3.0104 1.94289 3.20065 1.84666C3.57903 1.65528 4.02587 1.65528 4.40424 1.84666C4.5945 1.94289 4.77164 2.12004 5.12594 2.47433L5.25585 2.60424C5.48892 2.83732 5.60546 2.95385 5.68165 3.07104C5.96898 3.51296 5.96898 4.08268 5.68165 4.52461C5.60546 4.6418 5.48892 4.75833 5.25585 4.9914C5.17964 5.06761 5.14154 5.10571 5.10965 5.15026C4.99631 5.30854 4.95717 5.53805 5.01165 5.72495C5.02698 5.77755 5.04694 5.81911 5.08685 5.90223Z",
                          stroke: "white",
                          "stroke-width": "1.6",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round"
                        })
                      ])),
                      createTextVNode(" Заказать звонок ")
                    ], 8, ["onClick"])
                  ])
                ]),
                createVNode("section", { class: "container mx-auto flex flex-col gap-12" }, [
                  createVNode("div", { class: "flex justify-between items-center" }, [
                    createVNode("h2", { class: "title" }, "Вы недавно смотрели")
                  ]),
                  createVNode("div", { class: "flex overflow-x-auto md:grid grid-cols-4 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(historyViews), (product) => {
                      return openBlock(), createBlock(unref(ie), {
                        href: `/product/${product.id}`,
                        class: "product-card shrink-0"
                      }, {
                        default: withCtx(() => {
                          var _a3, _b2;
                          return [
                            ((_a3 = product.specifications.find(
                              (item) => item.key === "gost"
                            )) == null ? void 0 : _a3.value) ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "gost"
                            }, " ГОСТ " + toDisplayString((_b2 = product.specifications.find(
                              (item) => item.key === "gost"
                            )) == null ? void 0 : _b2.value), 1)) : createCommentVNode("", true),
                            createVNode("img", {
                              class: "w-full h-full object-cover rounded-3xl",
                              src: "/storage/" + (Array.isArray(product.images) ? product.images[0] : product.images)
                            }, null, 8, ["src"]),
                            createVNode("div", { class: "flex flex-col h-full justify-between gap-4" }, [
                              createVNode("p", { class: "text-gray_icon text-xs" }, toDisplayString(product.specifications.map((spec) => spec.value).join(", ")), 1),
                              createVNode("div", { class: "product-text" }, [
                                createVNode("p", null, toDisplayString(product.name), 1)
                              ])
                            ])
                          ];
                        }),
                        _: 2
                      }, 1032, ["href"]);
                    }), 256))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/product.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "products",
  __ssrInlineRender: true,
  props: {
    category: {
      type: Object,
      required: true
    },
    subcategory: {
      type: Object,
      required: true
    },
    products: {
      type: Object,
      required: true
    },
    filters: {
      type: Array,
      required: true
    },
    specifications_all: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const currentPage = ref(1);
    const products2 = ref(props.products.data);
    const totalPages = ref(
      Math.ceil(props.products.total / props.products.per_page)
    );
    watch(
      () => props.products,
      (newProducts) => {
        products2.value = JSON.parse(JSON.stringify(newProducts));
      },
      { deep: true }
    );
    const selectedFilters = ref({});
    props.filters.forEach((filter2) => {
      selectedFilters.value[filter2.key] = null;
    });
    const getProducts = async (page = 1) => {
      try {
        const response = await axios.get(
          `/category/${props.category.id}/${props.subcategory.id}/filters`,
          {
            params: {
              ...selectedFilters.value,
              page
            }
          }
        );
        products2.value = JSON.parse(JSON.stringify(response.data.data));
        console.log(response.data.data);
        totalPages.value = Math.ceil(
          response.data.total / response.data.per_page
        );
        currentPage.value = page;
        if (typeof window !== "undefined") {
          const element = document.getElementById("catalog-title");
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    };
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        getProducts(page);
      }
    };
    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l2;
      for (let i2 = 1; i2 <= totalPages.value; i2++) {
        if (i2 === 1 || i2 === totalPages.value || i2 >= currentPage.value - delta && i2 <= currentPage.value + delta) {
          range.push(i2);
        }
      }
      for (let i2 of range) {
        if (l2) {
          if (i2 - l2 === 2) {
            rangeWithDots.push(l2 + 1);
          } else if (i2 - l2 !== 1) {
            rangeWithDots.push("...");
          }
        }
        rangeWithDots.push(i2);
        l2 = i2;
      }
      return rangeWithDots;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Z$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-448cbae7${_scopeId}>${ssrInterpolate(props.subcategory.name)} - КрафтСнаб</title><meta name="description" content="Каталог продуктов КрафтСнаб" data-v-448cbae7${_scopeId}><meta property="og:description" content="Каталог продуктов КрафтСнаб" data-v-448cbae7${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(props.subcategory.name) + " - КрафтСнаб", 1),
              createVNode("meta", {
                name: "description",
                content: "Каталог продуктов КрафтСнаб"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Каталог продуктов КрафтСнаб"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$9, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="flex flex-col py-14 gap-12" data-v-448cbae7${_scopeId}><section class="flex flex-col items-center justify-center gap-6" data-v-448cbae7${_scopeId}><div class="flex flex-wrap items-center gap-3" data-v-448cbae7${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ie), {
              class: "text-gray_icon/70 flex items-center gap-2",
              href: `/`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Главная <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-448cbae7${_scopeId2}><circle cx="3" cy="3" r="3" fill="#E3E3E3" data-v-448cbae7${_scopeId2}></circle></svg>`);
                } else {
                  return [
                    createTextVNode(" Главная "),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ie), {
              class: "text-gray_icon/70 flex items-center gap-2",
              href: `/catalog`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Каталог <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-448cbae7${_scopeId2}><circle cx="3" cy="3" r="3" fill="#E3E3E3" data-v-448cbae7${_scopeId2}></circle></svg>`);
                } else {
                  return [
                    createTextVNode(" Каталог "),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ie), {
              class: "text-gray_icon/70 flex items-center gap-2",
              href: `/category/${__props.category.id}`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.category.name)} <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-448cbae7${_scopeId2}><circle cx="3" cy="3" r="3" fill="#E3E3E3" data-v-448cbae7${_scopeId2}></circle></svg>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.category.name) + " ", 1),
                    (openBlock(), createBlock("svg", {
                      width: "6",
                      height: "6",
                      viewBox: "0 0 6 6",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("circle", {
                        cx: "3",
                        cy: "3",
                        r: "3",
                        fill: "#E3E3E3"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span data-v-448cbae7${_scopeId}>${ssrInterpolate(__props.subcategory.name)}</span></div><h1 id="catalog-title" class="text-[56px] leading-none font-bold" data-v-448cbae7${_scopeId}>${ssrInterpolate(__props.subcategory.name)}</h1></section><section class="flex gap-12 max-md:flex-col container mx-auto items-stretch" data-v-448cbae7${_scopeId}><div class="flex max-sm:flex-col max-md:gap-2 md:max-w-[300px] w-full max-md:flex-wrap md:flex-col gap-6" data-v-448cbae7${_scopeId}><!--[-->`);
            ssrRenderList(props.filters, (filter2) => {
              _push2(`<div class="flex flex-col gap-2" data-v-448cbae7${_scopeId}><p data-v-448cbae7${_scopeId}>${ssrInterpolate(filter2.name)}</p>`);
              _push2(ssrRenderComponent(unref(VueSelect), {
                class: "",
                key: filter2.key,
                modelValue: selectedFilters.value[filter2.key],
                "onUpdate:modelValue": ($event) => selectedFilters.value[filter2.key] = $event,
                options: filter2.values.map((value) => ({
                  label: value,
                  value
                })),
                placeholder: filter2.name
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--><div class="input-wrapper-label hidden gap-3 flex-col" data-v-448cbae7${_scopeId}><p data-v-448cbae7${_scopeId}>Способ получения</p><div class="flex flex-col gap-2" data-v-448cbae7${_scopeId}><div class="checkbox-wrapper" data-v-448cbae7${_scopeId}><input type="checkbox" data-v-448cbae7${_scopeId}><label for="search" data-v-448cbae7${_scopeId}>Пункты выдачи</label></div><div class="checkbox-wrapper" data-v-448cbae7${_scopeId}><input type="checkbox" data-v-448cbae7${_scopeId}><label for="search" data-v-448cbae7${_scopeId}>Самовывоз</label></div><div class="checkbox-wrapper" data-v-448cbae7${_scopeId}><input type="checkbox" data-v-448cbae7${_scopeId}><label for="search" data-v-448cbae7${_scopeId}>Доставка курьером</label></div></div></div>`);
            if (Object.values(selectedFilters.value).some(
              (filter2) => filter2 !== null
            )) {
              _push2(`<button class="btn btn-primary text-center justify-center" data-v-448cbae7${_scopeId}> Показать </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (products2.value.length > 0) {
              _push2(`<div class="flex flex-col gap-6 w-full" data-v-448cbae7${_scopeId}><div class="flex container mx-auto flex-col gap-2" data-v-448cbae7${_scopeId}><!--[-->`);
              ssrRenderList(products2.value, (product) => {
                _push2(ssrRenderComponent(_sfc_main$7, {
                  key: `${product.id}-${JSON.stringify(
                    product.specifications
                  )}`,
                  product,
                  specifications: product.specifications,
                  specifications_all: __props.specifications_all
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><div class="w-full mt-auto" data-v-448cbae7${_scopeId}><div class="flex justify-center gap-5" data-v-448cbae7${_scopeId}><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-448cbae7${_scopeId}><svg width="7.500000" height="13.333313" viewBox="0 0 7.5 13.3333" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-448cbae7${_scopeId}><path id="Icon" d="M7.25 0.24C7.58 0.56 7.58 1.09 7.25 1.42L2.01 6.66L7.25 11.91C7.58 12.23 7.58 12.76 7.25 13.08C6.93 13.41 6.4 13.41 6.07 13.08L0.24 7.25C-0.09 6.93 -0.09 6.4 0.24 6.07L6.07 0.24C6.4 -0.09 6.93 -0.09 7.25 0.24Z"${ssrRenderAttr(
                "fill",
                currentPage.value === 1 ? "#CCCCCC" : "#000000"
              )} data-v-448cbae7${_scopeId}></path></svg></button><div class="flex gap-1" data-v-448cbae7${_scopeId}><!--[-->`);
              ssrRenderList(getVisiblePages(), (page) => {
                _push2(`<!--[-->`);
                if (page === "...") {
                  _push2(`<span class="w-12 h-12 items-center justify-center flex" data-v-448cbae7${_scopeId}>${ssrInterpolate(page)}</span>`);
                } else {
                  _push2(`<span class="${ssrRenderClass([{
                    "bg-black text-white": page === currentPage.value
                  }, "rounded-2xl w-12 h-12 items-center justify-center flex"])}" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-448cbae7${_scopeId}>${ssrInterpolate(page)}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-448cbae7${_scopeId}><svg width="7.500000" height="13.333313" viewBox="0 0 7.5 13.3333" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-448cbae7${_scopeId}><path id="Icon" d="M0.24 0.24C-0.09 0.56 -0.09 1.09 0.24 1.42L5.48 6.66L0.24 11.91C-0.09 12.23 -0.09 12.76 0.24 13.08C0.56 13.41 1.09 13.41 1.42 13.08L7.25 7.25C7.58 6.93 7.58 6.4 7.25 6.07L1.42 0.24C1.09 -0.09 0.56 -0.09 0.24 0.24Z"${ssrRenderAttr(
                "fill",
                currentPage.value === totalPages.value ? "#CCCCCC" : "#000000"
              )} data-v-448cbae7${_scopeId}></path></svg></button></div></div></div>`);
            } else {
              _push2(`<div class="flex flex-col gap-6 w-full justify-center items-center" data-v-448cbae7${_scopeId}><p class="text-gray_icon/70 text-2xl" data-v-448cbae7${_scopeId}>Продуктов нет</p></div>`);
            }
            _push2(`</section></main>`);
          } else {
            return [
              createVNode("main", { class: "flex flex-col py-14 gap-12" }, [
                createVNode("section", { class: "flex flex-col items-center justify-center gap-6" }, [
                  createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                    createVNode(unref(ie), {
                      class: "text-gray_icon/70 flex items-center gap-2",
                      href: `/`
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Главная "),
                        (openBlock(), createBlock("svg", {
                          width: "6",
                          height: "6",
                          viewBox: "0 0 6 6",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("circle", {
                            cx: "3",
                            cy: "3",
                            r: "3",
                            fill: "#E3E3E3"
                          })
                        ]))
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ie), {
                      class: "text-gray_icon/70 flex items-center gap-2",
                      href: `/catalog`
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Каталог "),
                        (openBlock(), createBlock("svg", {
                          width: "6",
                          height: "6",
                          viewBox: "0 0 6 6",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("circle", {
                            cx: "3",
                            cy: "3",
                            r: "3",
                            fill: "#E3E3E3"
                          })
                        ]))
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ie), {
                      class: "text-gray_icon/70 flex items-center gap-2",
                      href: `/category/${__props.category.id}`
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.category.name) + " ", 1),
                        (openBlock(), createBlock("svg", {
                          width: "6",
                          height: "6",
                          viewBox: "0 0 6 6",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("circle", {
                            cx: "3",
                            cy: "3",
                            r: "3",
                            fill: "#E3E3E3"
                          })
                        ]))
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("span", null, toDisplayString(__props.subcategory.name), 1)
                  ]),
                  createVNode("h1", {
                    id: "catalog-title",
                    class: "text-[56px] leading-none font-bold"
                  }, toDisplayString(__props.subcategory.name), 1)
                ]),
                createVNode("section", { class: "flex gap-12 max-md:flex-col container mx-auto items-stretch" }, [
                  createVNode("div", { class: "flex max-sm:flex-col max-md:gap-2 md:max-w-[300px] w-full max-md:flex-wrap md:flex-col gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.filters, (filter2) => {
                      return openBlock(), createBlock("div", { class: "flex flex-col gap-2" }, [
                        createVNode("p", null, toDisplayString(filter2.name), 1),
                        (openBlock(), createBlock(unref(VueSelect), {
                          class: "",
                          key: filter2.key,
                          modelValue: selectedFilters.value[filter2.key],
                          "onUpdate:modelValue": ($event) => selectedFilters.value[filter2.key] = $event,
                          options: filter2.values.map((value) => ({
                            label: value,
                            value
                          })),
                          placeholder: filter2.name
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"]))
                      ]);
                    }), 256)),
                    createVNode("div", { class: "input-wrapper-label hidden gap-3 flex-col" }, [
                      createVNode("p", null, "Способ получения"),
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode("div", { class: "checkbox-wrapper" }, [
                          createVNode("input", { type: "checkbox" }),
                          createVNode("label", { for: "search" }, "Пункты выдачи")
                        ]),
                        createVNode("div", { class: "checkbox-wrapper" }, [
                          createVNode("input", { type: "checkbox" }),
                          createVNode("label", { for: "search" }, "Самовывоз")
                        ]),
                        createVNode("div", { class: "checkbox-wrapper" }, [
                          createVNode("input", { type: "checkbox" }),
                          createVNode("label", { for: "search" }, "Доставка курьером")
                        ])
                      ])
                    ]),
                    createVNode(Transition, { name: "jumped-fade" }, {
                      default: withCtx(() => [
                        Object.values(selectedFilters.value).some(
                          (filter2) => filter2 !== null
                        ) ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: ($event) => getProducts(1),
                          class: "btn btn-primary text-center justify-center"
                        }, " Показать ", 8, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ]),
                  products2.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex flex-col gap-6 w-full"
                  }, [
                    createVNode("div", { class: "flex container mx-auto flex-col gap-2" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(products2.value, (product) => {
                        return openBlock(), createBlock(_sfc_main$7, {
                          key: `${product.id}-${JSON.stringify(
                            product.specifications
                          )}`,
                          product,
                          specifications: product.specifications,
                          specifications_all: __props.specifications_all
                        }, null, 8, ["product", "specifications", "specifications_all"]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "w-full mt-auto" }, [
                      createVNode("div", { class: "flex justify-center gap-5" }, [
                        createVNode("button", {
                          onClick: ($event) => goToPage(currentPage.value - 1),
                          disabled: currentPage.value === 1
                        }, [
                          (openBlock(), createBlock("svg", {
                            width: "7.500000",
                            height: "13.333313",
                            viewBox: "0 0 7.5 13.3333",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              id: "Icon",
                              d: "M7.25 0.24C7.58 0.56 7.58 1.09 7.25 1.42L2.01 6.66L7.25 11.91C7.58 12.23 7.58 12.76 7.25 13.08C6.93 13.41 6.4 13.41 6.07 13.08L0.24 7.25C-0.09 6.93 -0.09 6.4 0.24 6.07L6.07 0.24C6.4 -0.09 6.93 -0.09 7.25 0.24Z",
                              fill: currentPage.value === 1 ? "#CCCCCC" : "#000000"
                            }, null, 8, ["fill"])
                          ]))
                        ], 8, ["onClick", "disabled"]),
                        createVNode("div", { class: "flex gap-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(getVisiblePages(), (page) => {
                            return openBlock(), createBlock(Fragment, { key: page }, [
                              page === "..." ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "w-12 h-12 items-center justify-center flex"
                              }, toDisplayString(page), 1)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: ["rounded-2xl w-12 h-12 items-center justify-center flex", {
                                  "bg-black text-white": page === currentPage.value
                                }],
                                onClick: ($event) => goToPage(page),
                                style: { "cursor": "pointer" }
                              }, toDisplayString(page), 11, ["onClick"]))
                            ], 64);
                          }), 128))
                        ]),
                        createVNode("button", {
                          onClick: ($event) => goToPage(currentPage.value + 1),
                          disabled: currentPage.value === totalPages.value
                        }, [
                          (openBlock(), createBlock("svg", {
                            width: "7.500000",
                            height: "13.333313",
                            viewBox: "0 0 7.5 13.3333",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", {
                              id: "Icon",
                              d: "M0.24 0.24C-0.09 0.56 -0.09 1.09 0.24 1.42L5.48 6.66L0.24 11.91C-0.09 12.23 -0.09 12.76 0.24 13.08C0.56 13.41 1.09 13.41 1.42 13.08L7.25 7.25C7.58 6.93 7.58 6.4 7.25 6.07L1.42 0.24C1.09 -0.09 0.56 -0.09 0.24 0.24Z",
                              fill: currentPage.value === totalPages.value ? "#CCCCCC" : "#000000"
                            }, null, 8, ["fill"])
                          ]))
                        ], 8, ["onClick", "disabled"])
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex flex-col gap-6 w-full justify-center items-center"
                  }, [
                    createVNode("p", { class: "text-gray_icon/70 text-2xl" }, "Продуктов нет")
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const products = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-448cbae7"]]);
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: products
}, Symbol.toStringTag, { value: "Module" }));
function _createForOfIteratorHelper$1(o2, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (!it) {
    if (Array.isArray(o2) || (it = _unsupportedIterableToArray$3(o2)) || allowArrayLike) {
      if (it) o2 = it;
      var i2 = 0;
      var F2 = function F3() {
      };
      return { s: F2, n: function n2() {
        if (i2 >= o2.length) return { done: true };
        return { done: false, value: o2[i2++] };
      }, e: function e2(_e) {
        throw _e;
      }, f: F2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s2() {
    it = it.call(o2);
  }, n: function n2() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e2(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f2() {
    try {
      if (!normalCompletion && it["return"] != null) it["return"]();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _toConsumableArray$3(arr) {
  return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$3();
}
function _nonIterableSpread$3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$3(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$3(arr);
}
function _typeof$3$1(o2) {
  "@babel/helpers - typeof";
  return _typeof$3$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$3$1(o2);
}
function _slicedToArray$1$1(arr, i2) {
  return _arrayWithHoles$1$1(arr) || _iterableToArrayLimit$1$1(arr, i2) || _unsupportedIterableToArray$3(arr, i2) || _nonIterableRest$1$1();
}
function _nonIterableRest$1$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o2, minLen) {
  if (!o2) return;
  if (typeof o2 === "string") return _arrayLikeToArray$3(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray$3(o2, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
  return arr2;
}
function _iterableToArrayLimit$1$1(r2, l2) {
  var t4 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t4) {
    var e2, n2, i2, u2, a2 = [], f2 = true, o2 = false;
    try {
      if (i2 = (t4 = t4.call(r2)).next, 0 === l2) ;
      else for (; !(f2 = (e2 = i2.call(t4)).done) && (a2.push(e2.value), a2.length !== l2); f2 = true) ;
    } catch (r3) {
      o2 = true, n2 = r3;
    } finally {
      try {
        if (!f2 && null != t4["return"] && (u2 = t4["return"](), Object(u2) !== u2)) return;
      } finally {
        if (o2) throw n2;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$1$1(arr) {
  if (Array.isArray(arr)) return arr;
}
var DomHandler = {
  innerWidth: function innerWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  width: function width(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  getWindowScrollTop: function getWindowScrollTop() {
    var doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  },
  getWindowScrollLeft: function getWindowScrollLeft() {
    var doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  },
  getOuterWidth: function getOuterWidth(el, margin) {
    if (el) {
      var width2 = el.offsetWidth;
      if (margin) {
        var style = getComputedStyle(el);
        width2 += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width2;
    }
    return 0;
  },
  getOuterHeight: function getOuterHeight(el, margin) {
    if (el) {
      var height = el.offsetHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getClientHeight: function getClientHeight(el, margin) {
    if (el) {
      var height = el.clientHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getViewport: function getViewport() {
    var win = window, d2 = document, e2 = d2.documentElement, g2 = d2.getElementsByTagName("body")[0], w2 = win.innerWidth || e2.clientWidth || g2.clientWidth, h2 = win.innerHeight || e2.clientHeight || g2.clientHeight;
    return {
      width: w2,
      height: h2
    };
  },
  getOffset: function getOffset(el) {
    if (el) {
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
        left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index: function index(element) {
    if (element) {
      var _this$getParentNode;
      var children = (_this$getParentNode = this.getParentNode(element)) === null || _this$getParentNode === void 0 ? void 0 : _this$getParentNode.childNodes;
      var num = 0;
      for (var i2 = 0; i2 < children.length; i2++) {
        if (children[i2] === element) return num;
        if (children[i2].nodeType === 1) num++;
      }
    }
    return -1;
  },
  addMultipleClasses: function addMultipleClasses(element, classNames) {
    var _this = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this.addClass(element, className);
        });
      });
    }
  },
  removeMultipleClasses: function removeMultipleClasses(element, classNames) {
    var _this2 = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this2.removeClass(element, className);
        });
      });
    }
  },
  addClass: function addClass(element, className) {
    if (element && className && !this.hasClass(element, className)) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    }
  },
  removeClass: function removeClass(element, className) {
    if (element && className) {
      if (element.classList) element.classList.remove(className);
      else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
  },
  hasClass: function hasClass(element, className) {
    if (element) {
      if (element.classList) return element.classList.contains(className);
      else return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    return false;
  },
  addStyles: function addStyles(element) {
    var styles = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (element) {
      Object.entries(styles).forEach(function(_ref) {
        var _ref2 = _slicedToArray$1$1(_ref, 2), key = _ref2[0], value = _ref2[1];
        return element.style[key] = value;
      });
    }
  },
  find: function find(element, selector) {
    return this.isElement(element) ? element.querySelectorAll(selector) : [];
  },
  findSingle: function findSingle(element, selector) {
    return this.isElement(element) ? element.querySelector(selector) : null;
  },
  createElement: function createElement(type) {
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (type) {
      var element = document.createElement(type);
      this.setAttributes(element, attributes);
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }
      element.append.apply(element, children);
      return element;
    }
    return void 0;
  },
  setAttribute: function setAttribute(element) {
    var attribute = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var value = arguments.length > 2 ? arguments[2] : void 0;
    if (this.isElement(element) && value !== null && value !== void 0) {
      element.setAttribute(attribute, value);
    }
  },
  setAttributes: function setAttributes(element) {
    var _this3 = this;
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.isElement(element)) {
      var computedStyles = function computedStyles2(rule, value) {
        var _element$$attrs, _element$$attrs2;
        var styles = element !== null && element !== void 0 && (_element$$attrs = element.$attrs) !== null && _element$$attrs !== void 0 && _element$$attrs[rule] ? [element === null || element === void 0 || (_element$$attrs2 = element.$attrs) === null || _element$$attrs2 === void 0 ? void 0 : _element$$attrs2[rule]] : [];
        return [value].flat().reduce(function(cv, v2) {
          if (v2 !== null && v2 !== void 0) {
            var type = _typeof$3$1(v2);
            if (type === "string" || type === "number") {
              cv.push(v2);
            } else if (type === "object") {
              var _cv = Array.isArray(v2) ? computedStyles2(rule, v2) : Object.entries(v2).map(function(_ref3) {
                var _ref4 = _slicedToArray$1$1(_ref3, 2), _k = _ref4[0], _v = _ref4[1];
                return rule === "style" && (!!_v || _v === 0) ? "".concat(_k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), ":").concat(_v) : !!_v ? _k : void 0;
              });
              cv = _cv.length ? cv.concat(_cv.filter(function(c2) {
                return !!c2;
              })) : cv;
            }
          }
          return cv;
        }, styles);
      };
      Object.entries(attributes).forEach(function(_ref5) {
        var _ref6 = _slicedToArray$1$1(_ref5, 2), key = _ref6[0], value = _ref6[1];
        if (value !== void 0 && value !== null) {
          var matchedEvent = key.match(/^on(.+)/);
          if (matchedEvent) {
            element.addEventListener(matchedEvent[1].toLowerCase(), value);
          } else if (key === "p-bind") {
            _this3.setAttributes(element, value);
          } else {
            value = key === "class" ? _toConsumableArray$3(new Set(computedStyles("class", value))).join(" ").trim() : key === "style" ? computedStyles("style", value).join(";").trim() : value;
            (element.$attrs = element.$attrs || {}) && (element.$attrs[key] = value);
            element.setAttribute(key, value);
          }
        }
      });
    }
  },
  getAttribute: function getAttribute(element, name) {
    if (this.isElement(element)) {
      var value = element.getAttribute(name);
      if (!isNaN(value)) {
        return +value;
      }
      if (value === "true" || value === "false") {
        return value === "true";
      }
      return value;
    }
    return void 0;
  },
  isAttributeEquals: function isAttributeEquals(element, name, value) {
    return this.isElement(element) ? this.getAttribute(element, name) === value : false;
  },
  isAttributeNotEquals: function isAttributeNotEquals(element, name, value) {
    return !this.isAttributeEquals(element, name, value);
  },
  getHeight: function getHeight(el) {
    if (el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  getWidth: function getWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width2;
    }
    return 0;
  },
  absolutePosition: function absolutePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var elementOuterHeight = elementDimensions.height;
      var elementOuterWidth = elementDimensions.width;
      var targetOuterHeight = target.offsetHeight;
      var targetOuterWidth = target.offsetWidth;
      var targetOffset = target.getBoundingClientRect();
      var windowScrollTop = this.getWindowScrollTop();
      var windowScrollLeft = this.getWindowScrollLeft();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        origin = "bottom";
        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
      }
      if (targetOffset.left + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
      else left = targetOffset.left + windowScrollLeft;
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  relativePosition: function relativePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var targetHeight = target.offsetHeight;
      var targetOffset = target.getBoundingClientRect();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
        top = -1 * elementDimensions.height;
        origin = "bottom";
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
      }
      if (elementDimensions.width > viewport.width) {
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        left = 0;
      }
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  nestedPosition: function nestedPosition(element, level) {
    if (element) {
      var parentItem = element.parentElement;
      var elementOffset = this.getOffset(parentItem);
      var viewport = this.getViewport();
      var sublistWidth = element.offsetParent ? element.offsetWidth : this.getHiddenElementOuterWidth(element);
      var itemOuterWidth = this.getOuterWidth(parentItem.children[0]);
      var left;
      if (parseInt(elementOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - this.calculateScrollbarWidth()) {
        if (parseInt(elementOffset.left, 10) < sublistWidth) {
          if (level % 2 === 1) {
            left = parseInt(elementOffset.left, 10) ? "-" + parseInt(elementOffset.left, 10) + "px" : "100%";
          } else if (level % 2 === 0) {
            left = viewport.width - sublistWidth - this.calculateScrollbarWidth() + "px";
          }
        } else {
          left = "-100%";
        }
      } else {
        left = "100%";
      }
      element.style.top = "0px";
      element.style.left = left;
    }
  },
  getParentNode: function getParentNode(element) {
    var parent = element === null || element === void 0 ? void 0 : element.parentNode;
    if (parent && parent instanceof ShadowRoot && parent.host) {
      parent = parent.host;
    }
    return parent;
  },
  getParents: function getParents(element) {
    var parents = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var parent = this.getParentNode(element);
    return parent === null ? parents : this.getParents(parent, parents.concat([parent]));
  },
  getScrollableParents: function getScrollableParents(element) {
    var scrollableParents = [];
    if (element) {
      var parents = this.getParents(element);
      var overflowRegex = /(auto|scroll)/;
      var overflowCheck = function overflowCheck2(node) {
        try {
          var styleDeclaration = window["getComputedStyle"](node, null);
          return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
        } catch (err) {
          return false;
        }
      };
      var _iterator = _createForOfIteratorHelper$1(parents), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var parent = _step.value;
          var scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
          if (scrollSelectors) {
            var selectors = scrollSelectors.split(",");
            var _iterator2 = _createForOfIteratorHelper$1(selectors), _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var selector = _step2.value;
                var el = this.findSingle(parent, selector);
                if (el && overflowCheck(el)) {
                  scrollableParents.push(el);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
          if (parent.nodeType !== 9 && overflowCheck(parent)) {
            scrollableParents.push(parent);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return scrollableParents;
  },
  getHiddenElementOuterHeight: function getHiddenElementOuterHeight(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementHeight = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementHeight;
    }
    return 0;
  },
  getHiddenElementOuterWidth: function getHiddenElementOuterWidth(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementWidth = element.offsetWidth;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementWidth;
    }
    return 0;
  },
  getHiddenElementDimensions: function getHiddenElementDimensions(element) {
    if (element) {
      var dimensions = {};
      element.style.visibility = "hidden";
      element.style.display = "block";
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return dimensions;
    }
    return 0;
  },
  fadeIn: function fadeIn(element, duration) {
    if (element) {
      element.style.opacity = 0;
      var last = +/* @__PURE__ */ new Date();
      var opacity = 0;
      var tick = function tick2() {
        opacity = +element.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +/* @__PURE__ */ new Date();
        if (+opacity < 1) {
          window.requestAnimationFrame && requestAnimationFrame(tick2) || setTimeout(tick2, 16);
        }
      };
      tick();
    }
  },
  fadeOut: function fadeOut(element, ms) {
    if (element) {
      var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
      var fading = setInterval(function() {
        opacity -= gap;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
        element.style.opacity = opacity;
      }, interval);
    }
  },
  getUserAgent: function getUserAgent() {
    return navigator.userAgent;
  },
  appendChild: function appendChild(element, target) {
    if (this.isElement(target)) target.appendChild(element);
    else if (target.el && target.elElement) target.elElement.appendChild(element);
    else throw new Error("Cannot append " + target + " to " + element);
  },
  isElement: function isElement(obj) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof$3$1(HTMLElement)) === "object" ? obj instanceof HTMLElement : obj && _typeof$3$1(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
  },
  scrollInView: function scrollInView(container, item) {
    var borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
    var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    var paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
    var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    var containerRect = container.getBoundingClientRect();
    var itemRect = item.getBoundingClientRect();
    var offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    var scroll = container.scrollTop;
    var elementHeight = container.clientHeight;
    var itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  },
  clearSelection: function clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
        window.getSelection().removeAllRanges();
      }
    } else if (document["selection"] && document["selection"].empty) {
      try {
        document["selection"].empty();
      } catch (error) {
      }
    }
  },
  getSelection: function getSelection() {
    if (window.getSelection) return window.getSelection().toString();
    else if (document.getSelection) return document.getSelection().toString();
    else if (document["selection"]) return document["selection"].createRange().text;
    return null;
  },
  calculateScrollbarWidth: function calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;
    var scrollDiv = document.createElement("div");
    this.addStyles(scrollDiv, {
      width: "100px",
      height: "100px",
      overflow: "scroll",
      position: "absolute",
      top: "-9999px"
    });
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  },
  calculateBodyScrollbarWidth: function calculateBodyScrollbarWidth() {
    return window.innerWidth - document.documentElement.offsetWidth;
  },
  getBrowser: function getBrowser() {
    if (!this.browser) {
      var matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser["version"] = matched.version;
      }
      if (this.browser["chrome"]) {
        this.browser["webkit"] = true;
      } else if (this.browser["webkit"]) {
        this.browser["safari"] = true;
      }
    }
    return this.browser;
  },
  resolveUserAgent: function resolveUserAgent() {
    var ua = navigator.userAgent.toLowerCase();
    var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  },
  isVisible: function isVisible(element) {
    return element && element.offsetParent != null;
  },
  invokeElementMethod: function invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  },
  isExist: function isExist(element) {
    return !!(element !== null && typeof element !== "undefined" && element.nodeName && this.getParentNode(element));
  },
  isClient: function isClient() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
  },
  focus: function focus(el, options) {
    el && document.activeElement !== el && el.focus(options);
  },
  isFocusableElement: function isFocusableElement(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.isElement(element) ? element.matches('button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector)) : false;
  },
  getFocusableElements: function getFocusableElements(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var focusableElements = this.find(element, 'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector));
    var visibleFocusableElements = [];
    var _iterator3 = _createForOfIteratorHelper$1(focusableElements), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var focusableElement = _step3.value;
        if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden") visibleFocusableElements.push(focusableElement);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return visibleFocusableElements;
  },
  getFirstFocusableElement: function getFirstFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },
  getLastFocusableElement: function getLastFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  },
  getNextFocusableElement: function getNextFocusableElement(container, element, selector) {
    var focusableElements = this.getFocusableElements(container, selector);
    var index2 = focusableElements.length > 0 ? focusableElements.findIndex(function(el) {
      return el === element;
    }) : -1;
    var nextIndex = index2 > -1 && focusableElements.length >= index2 + 1 ? index2 + 1 : -1;
    return nextIndex > -1 ? focusableElements[nextIndex] : null;
  },
  getPreviousElementSibling: function getPreviousElementSibling(element, selector) {
    var previousElement = element.previousElementSibling;
    while (previousElement) {
      if (previousElement.matches(selector)) {
        return previousElement;
      } else {
        previousElement = previousElement.previousElementSibling;
      }
    }
    return null;
  },
  getNextElementSibling: function getNextElementSibling(element, selector) {
    var nextElement = element.nextElementSibling;
    while (nextElement) {
      if (nextElement.matches(selector)) {
        return nextElement;
      } else {
        nextElement = nextElement.nextElementSibling;
      }
    }
    return null;
  },
  isClickable: function isClickable(element) {
    if (element) {
      var targetNode = element.nodeName;
      var parentNode = element.parentElement && element.parentElement.nodeName;
      return targetNode === "INPUT" || targetNode === "TEXTAREA" || targetNode === "BUTTON" || targetNode === "A" || parentNode === "INPUT" || parentNode === "TEXTAREA" || parentNode === "BUTTON" || parentNode === "A" || !!element.closest(".p-button, .p-checkbox, .p-radiobutton");
    }
    return false;
  },
  applyStyle: function applyStyle(element, style) {
    if (typeof style === "string") {
      element.style.cssText = style;
    } else {
      for (var prop in style) {
        element.style[prop] = style[prop];
      }
    }
  },
  isIOS: function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window["MSStream"];
  },
  isAndroid: function isAndroid() {
    return /(android)/i.test(navigator.userAgent);
  },
  isTouchDevice: function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  },
  hasCSSAnimation: function hasCSSAnimation(element) {
    if (element) {
      var style = getComputedStyle(element);
      var animationDuration = parseFloat(style.getPropertyValue("animation-duration") || "0");
      return animationDuration > 0;
    }
    return false;
  },
  hasCSSTransition: function hasCSSTransition(element) {
    if (element) {
      var style = getComputedStyle(element);
      var transitionDuration = parseFloat(style.getPropertyValue("transition-duration") || "0");
      return transitionDuration > 0;
    }
    return false;
  },
  exportCSV: function exportCSV(csv, filename) {
    var blob = new Blob([csv], {
      type: "application/csv;charset=utf-8;"
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename + ".csv");
    } else {
      var link = document.createElement("a");
      if (link.download !== void 0) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename + ".csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        csv = "data:text/csv;charset=utf-8," + csv;
        window.open(encodeURI(csv));
      }
    }
  },
  blockBodyScroll: function blockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    document.body.style.setProperty("--scrollbar-width", this.calculateBodyScrollbarWidth() + "px");
    this.addClass(document.body, className);
  },
  unblockBodyScroll: function unblockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    document.body.style.removeProperty("--scrollbar-width");
    this.removeClass(document.body, className);
  }
};
function _typeof$2$1(o2) {
  "@babel/helpers - typeof";
  return _typeof$2$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$2$1(o2);
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1$1(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _toPropertyKey$1$1(t4) {
  var i2 = _toPrimitive$1$1(t4, "string");
  return "symbol" == _typeof$2$1(i2) ? i2 : String(i2);
}
function _toPrimitive$1$1(t4, r2) {
  if ("object" != _typeof$2$1(t4) || !t4) return t4;
  var e2 = t4[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t4, r2);
    if ("object" != _typeof$2$1(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t4);
}
var ConnectedOverlayScrollHandler = /* @__PURE__ */ function() {
  function ConnectedOverlayScrollHandler2(element) {
    var listener = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    };
    _classCallCheck$1(this, ConnectedOverlayScrollHandler2);
    this.element = element;
    this.listener = listener;
  }
  _createClass$1(ConnectedOverlayScrollHandler2, [{
    key: "bindScrollListener",
    value: function bindScrollListener2() {
      this.scrollableParents = DomHandler.getScrollableParents(this.element);
      for (var i2 = 0; i2 < this.scrollableParents.length; i2++) {
        this.scrollableParents[i2].addEventListener("scroll", this.listener);
      }
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener2() {
      if (this.scrollableParents) {
        for (var i2 = 0; i2 < this.scrollableParents.length; i2++) {
          this.scrollableParents[i2].removeEventListener("scroll", this.listener);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbindScrollListener();
      this.element = null;
      this.listener = null;
      this.scrollableParents = null;
    }
  }]);
  return ConnectedOverlayScrollHandler2;
}();
function _slicedToArray$3(arr, i2) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i2) || _unsupportedIterableToArray$2$1(arr, i2) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$3(r2, l2) {
  var t4 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t4) {
    var e2, n2, i2, u2, a2 = [], f2 = true, o2 = false;
    try {
      if (i2 = (t4 = t4.call(r2)).next, 0 === l2) ;
      else for (; !(f2 = (e2 = i2.call(t4)).done) && (a2.push(e2.value), a2.length !== l2); f2 = true) ;
    } catch (r3) {
      o2 = true, n2 = r3;
    } finally {
      try {
        if (!f2 && null != t4["return"] && (u2 = t4["return"](), Object(u2) !== u2)) return;
      } finally {
        if (o2) throw n2;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr)) return arr;
}
function _toConsumableArray$2(arr) {
  return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$2$1(arr) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$2(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$2$1(arr);
}
function _createForOfIteratorHelper(o2, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (!it) {
    if (Array.isArray(o2) || (it = _unsupportedIterableToArray$2$1(o2)) || allowArrayLike) {
      if (it) o2 = it;
      var i2 = 0;
      var F2 = function F3() {
      };
      return { s: F2, n: function n2() {
        if (i2 >= o2.length) return { done: true };
        return { done: false, value: o2[i2++] };
      }, e: function e2(_e) {
        throw _e;
      }, f: F2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s2() {
    it = it.call(o2);
  }, n: function n2() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e2(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f2() {
    try {
      if (!normalCompletion && it["return"] != null) it["return"]();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _unsupportedIterableToArray$2$1(o2, minLen) {
  if (!o2) return;
  if (typeof o2 === "string") return _arrayLikeToArray$2$1(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray$2$1(o2, minLen);
}
function _arrayLikeToArray$2$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
  return arr2;
}
function _typeof$1$1(o2) {
  "@babel/helpers - typeof";
  return _typeof$1$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$1$1(o2);
}
var ObjectUtils = {
  equals: function equals(obj1, obj2, field) {
    if (field) return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
    else return this.deepEquals(obj1, obj2);
  },
  deepEquals: function deepEquals(a2, b2) {
    if (a2 === b2) return true;
    if (a2 && b2 && _typeof$1$1(a2) == "object" && _typeof$1$1(b2) == "object") {
      var arrA = Array.isArray(a2), arrB = Array.isArray(b2), i2, length, key;
      if (arrA && arrB) {
        length = a2.length;
        if (length != b2.length) return false;
        for (i2 = length; i2-- !== 0; ) if (!this.deepEquals(a2[i2], b2[i2])) return false;
        return true;
      }
      if (arrA != arrB) return false;
      var dateA = a2 instanceof Date, dateB = b2 instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a2.getTime() == b2.getTime();
      var regexpA = a2 instanceof RegExp, regexpB = b2 instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a2.toString() == b2.toString();
      var keys = Object.keys(a2);
      length = keys.length;
      if (length !== Object.keys(b2).length) return false;
      for (i2 = length; i2-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b2, keys[i2])) return false;
      for (i2 = length; i2-- !== 0; ) {
        key = keys[i2];
        if (!this.deepEquals(a2[key], b2[key])) return false;
      }
      return true;
    }
    return a2 !== a2 && b2 !== b2;
  },
  resolveFieldData: function resolveFieldData(data, field) {
    if (!data || !field) {
      return null;
    }
    try {
      var value = data[field];
      if (this.isNotEmpty(value)) return value;
    } catch (_unused) {
    }
    if (Object.keys(data).length) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf(".") === -1) {
        return data[field];
      } else {
        var fields = field.split(".");
        var _value = data;
        for (var i2 = 0, len = fields.length; i2 < len; ++i2) {
          if (_value == null) {
            return null;
          }
          _value = _value[fields[i2]];
        }
        return _value;
      }
    }
    return null;
  },
  getItemValue: function getItemValue(obj) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
  },
  filter: function filter(value, fields, filterValue) {
    var filteredItems = [];
    if (value) {
      var _iterator = _createForOfIteratorHelper(value), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var item = _step.value;
          var _iterator2 = _createForOfIteratorHelper(fields), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var field = _step2.value;
              if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return filteredItems;
  },
  reorderArray: function reorderArray(value, from, to) {
    if (value && from !== to) {
      if (to >= value.length) {
        to %= value.length;
        from %= value.length;
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },
  findIndexInList: function findIndexInList(value, list) {
    var index2 = -1;
    if (list) {
      for (var i2 = 0; i2 < list.length; i2++) {
        if (list[i2] === value) {
          index2 = i2;
          break;
        }
      }
    }
    return index2;
  },
  contains: function contains(value, list) {
    if (value != null && list && list.length) {
      var _iterator3 = _createForOfIteratorHelper(list), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var val = _step3.value;
          if (this.equals(value, val)) return true;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    return false;
  },
  insertIntoOrderedArray: function insertIntoOrderedArray(item, index2, arr, sourceArr) {
    if (arr.length > 0) {
      var injected = false;
      for (var i2 = 0; i2 < arr.length; i2++) {
        var currentItemIndex = this.findIndexInList(arr[i2], sourceArr);
        if (currentItemIndex > index2) {
          arr.splice(i2, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },
  removeAccents: function removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
    }
    return str;
  },
  getVNodeProp: function getVNodeProp(vnode, prop) {
    if (vnode) {
      var props = vnode.props;
      if (props) {
        var kebabProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        var propName = Object.prototype.hasOwnProperty.call(props, kebabProp) ? kebabProp : prop;
        return vnode.type["extends"].props[prop].type === Boolean && props[propName] === "" ? true : props[propName];
      }
    }
    return null;
  },
  toFlatCase: function toFlatCase(str) {
    return this.isString(str) ? str.replace(/(-|_)/g, "").toLowerCase() : str;
  },
  toKebabCase: function toKebabCase(str) {
    return this.isString(str) ? str.replace(/(_)/g, "-").replace(/[A-Z]/g, function(c2, i2) {
      return i2 === 0 ? c2 : "-" + c2.toLowerCase();
    }).toLowerCase() : str;
  },
  toCapitalCase: function toCapitalCase(str) {
    return this.isString(str, {
      empty: false
    }) ? str[0].toUpperCase() + str.slice(1) : str;
  },
  isEmpty: function isEmpty(value) {
    return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof$1$1(value) === "object" && Object.keys(value).length === 0;
  },
  isNotEmpty: function isNotEmpty(value) {
    return !this.isEmpty(value);
  },
  isFunction: function isFunction(value) {
    return !!(value && value.constructor && value.call && value.apply);
  },
  isObject: function isObject(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return value instanceof Object && value.constructor === Object && (empty || Object.keys(value).length !== 0);
  },
  isDate: function isDate(value) {
    return value instanceof Date && value.constructor === Date;
  },
  isArray: function isArray(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return Array.isArray(value) && (empty || value.length !== 0);
  },
  isString: function isString(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return typeof value === "string" && (empty || value !== "");
  },
  isPrintableCharacter: function isPrintableCharacter() {
    var _char = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return this.isNotEmpty(_char) && _char.length === 1 && _char.match(/\S| /);
  },
  /**
   * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlast
   */
  findLast: function findLast(arr, callback) {
    var item;
    if (this.isNotEmpty(arr)) {
      try {
        item = arr.findLast(callback);
      } catch (_unused2) {
        item = _toConsumableArray$2(arr).reverse().find(callback);
      }
    }
    return item;
  },
  /**
   * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
   */
  findLastIndex: function findLastIndex(arr, callback) {
    var index2 = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index2 = arr.findLastIndex(callback);
      } catch (_unused3) {
        index2 = arr.lastIndexOf(_toConsumableArray$2(arr).reverse().find(callback));
      }
    }
    return index2;
  },
  sort: function sort(value1, value2) {
    var order = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var comparator = arguments.length > 3 ? arguments[3] : void 0;
    var nullSortOrder = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
    var result = this.compare(value1, value2, comparator, order);
    var finalSortOrder = order;
    if (this.isEmpty(value1) || this.isEmpty(value2)) {
      finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
    }
    return finalSortOrder * result;
  },
  compare: function compare(value1, value2, comparator) {
    var order = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
    var result = -1;
    var emptyValue1 = this.isEmpty(value1);
    var emptyValue2 = this.isEmpty(value2);
    if (emptyValue1 && emptyValue2) result = 0;
    else if (emptyValue1) result = order;
    else if (emptyValue2) result = -order;
    else if (typeof value1 === "string" && typeof value2 === "string") result = comparator(value1, value2);
    else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    return result;
  },
  localeComparator: function localeComparator() {
    return new Intl.Collator(void 0, {
      numeric: true
    }).compare;
  },
  nestedKeys: function nestedKeys() {
    var _this = this;
    var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var parentKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return Object.entries(obj).reduce(function(o2, _ref) {
      var _ref2 = _slicedToArray$3(_ref, 2), key = _ref2[0], value = _ref2[1];
      var currentKey = parentKey ? "".concat(parentKey, ".").concat(key) : key;
      _this.isObject(value) ? o2 = o2.concat(_this.nestedKeys(value, currentKey)) : o2.push(currentKey);
      return o2;
    }, []);
  },
  stringify: function stringify(value) {
    var _this2 = this;
    var indent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    var currentIndent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var currentIndentStr = " ".repeat(currentIndent);
    var nextIndentStr = " ".repeat(currentIndent + indent);
    if (this.isArray(value)) {
      return "[" + value.map(function(v2) {
        return _this2.stringify(v2, indent, currentIndent + indent);
      }).join(", ") + "]";
    } else if (this.isDate(value)) {
      return value.toISOString();
    } else if (this.isFunction(value)) {
      return value.toString();
    } else if (this.isObject(value)) {
      return "{\n" + Object.entries(value).map(function(_ref3) {
        var _ref4 = _slicedToArray$3(_ref3, 2), k2 = _ref4[0], v2 = _ref4[1];
        return "".concat(nextIndentStr).concat(k2, ": ").concat(_this2.stringify(v2, indent, currentIndent + indent));
      }).join(",\n") + "\n".concat(currentIndentStr) + "}";
    } else {
      return JSON.stringify(value);
    }
  }
};
var lastId = 0;
function UniqueComponentId() {
  var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pv_id_";
  lastId++;
  return "".concat(prefix).concat(lastId);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$4(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o2, minLen) {
  if (!o2) return;
  if (typeof o2 === "string") return _arrayLikeToArray$4(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray$4(o2, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$4(arr);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
  return arr2;
}
function handler() {
  var zIndexes = [];
  var generateZIndex = function generateZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 999;
    var lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
    var newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({
      key,
      value: newZIndex
    });
    return newZIndex;
  };
  var revertZIndex = function revertZIndex2(zIndex) {
    zIndexes = zIndexes.filter(function(obj) {
      return obj.value !== zIndex;
    });
  };
  var getCurrentZIndex = function getCurrentZIndex2(key, autoZIndex) {
    return getLastZIndex(key, autoZIndex).value;
  };
  var getLastZIndex = function getLastZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    return _toConsumableArray(zIndexes).reverse().find(function(obj) {
      return true;
    }) || {
      key,
      value: baseZIndex
    };
  };
  var getZIndex = function getZIndex2(el) {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: function set(key, el, baseZIndex) {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, true, baseZIndex));
      }
    },
    clear: function clear(el) {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: function getCurrent(key) {
      return getCurrentZIndex(key, true);
    }
  };
}
var ZIndexUtils = handler();
var FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
function _typeof$4(o2) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$4(o2);
}
function ownKeys$3(e2, r2) {
  var t4 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t4.push.apply(t4, o2);
  }
  return t4;
}
function _objectSpread$3(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t4 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$3(Object(t4), true).forEach(function(r3) {
      _defineProperty$3(e2, r3, t4[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t4)) : ownKeys$3(Object(t4)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t4, r3));
    });
  }
  return e2;
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(t4) {
  var i2 = _toPrimitive$3(t4, "string");
  return "symbol" == _typeof$4(i2) ? i2 : String(i2);
}
function _toPrimitive$3(t4, r2) {
  if ("object" != _typeof$4(t4) || !t4) return t4;
  var e2 = t4[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t4, r2 || "default");
    if ("object" != _typeof$4(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t4);
}
var defaultOptions = {
  ripple: false,
  inputStyle: null,
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "Page {page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List"
    }
  },
  filterMatchModeOptions: {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  },
  pt: void 0,
  ptOptions: {
    mergeSections: true,
    mergeProps: false
  },
  unstyled: false,
  csp: {
    nonce: void 0
  }
};
var PrimeVueSymbol = Symbol();
function switchTheme(currentTheme, newTheme, linkElementId, callback) {
  if (currentTheme !== newTheme) {
    var linkElement = document.getElementById(linkElementId);
    var cloneLinkElement = linkElement.cloneNode(true);
    var newThemeUrl = linkElement.getAttribute("href").replace(currentTheme, newTheme);
    cloneLinkElement.setAttribute("id", linkElementId + "-clone");
    cloneLinkElement.setAttribute("href", newThemeUrl);
    cloneLinkElement.addEventListener("load", function() {
      linkElement.remove();
      cloneLinkElement.setAttribute("id", linkElementId);
      if (callback) {
        callback();
      }
    });
    linkElement.parentNode && linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  }
}
var PrimeVue = {
  install: function install(app, options) {
    var configOptions = options ? _objectSpread$3(_objectSpread$3({}, defaultOptions), options) : _objectSpread$3({}, defaultOptions);
    var PrimeVue2 = {
      config: reactive(configOptions),
      changeTheme: switchTheme
    };
    app.config.globalProperties.$primevue = PrimeVue2;
    app.provide(PrimeVueSymbol, PrimeVue2);
  }
};
function _typeof$3(o2) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$3(o2);
}
function ownKeys$2(e2, r2) {
  var t4 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t4.push.apply(t4, o2);
  }
  return t4;
}
function _objectSpread$2(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t4 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$2(Object(t4), true).forEach(function(r3) {
      _defineProperty$2(e2, r3, t4[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t4)) : ownKeys$2(Object(t4)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t4, r3));
    });
  }
  return e2;
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t4) {
  var i2 = _toPrimitive$2(t4, "string");
  return "symbol" == _typeof$3(i2) ? i2 : String(i2);
}
function _toPrimitive$2(t4, r2) {
  if ("object" != _typeof$3(t4) || !t4) return t4;
  var e2 = t4[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t4, r2 || "default");
    if ("object" != _typeof$3(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t4);
}
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance()) onMounted(fn);
  else if (sync) fn();
  else nextTick(fn);
}
var _id = 0;
function useStyle(css2) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css2);
  var styleRef = ref(null);
  var defaultDocument = DomHandler.isClient() ? window.document : void 0;
  var _options$document = options.document, document2 = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop2() {
  };
  var load = function load2(_css) {
    var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!document2) return;
    var _styleProps = _objectSpread$2(_objectSpread$2({}, props), _props);
    var _name = _styleProps.name || name, _id2 = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
    styleRef.value = document2.querySelector('style[data-primevue-style-id="'.concat(_name, '"]')) || document2.getElementById(_id2) || document2.createElement("style");
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css2;
      DomHandler.setAttributes(styleRef.value, {
        type: "text/css",
        id: _id2,
        media,
        nonce: _nonce
      });
      document2.head.appendChild(styleRef.value);
      DomHandler.setAttribute(styleRef.value, "data-primevue-style-id", name);
      DomHandler.setAttributes(styleRef.value, _styleProps);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, function(value) {
      styleRef.value.textContent = value;
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload2() {
    if (!document2 || !isLoaded.value) return;
    stop();
    DomHandler.isExist(styleRef.value) && document2.head.removeChild(styleRef.value);
    isLoaded.value = false;
  };
  if (immediate && !manual) tryOnMounted(load);
  return {
    id,
    name,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
function _typeof$2(o2) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$2(o2);
}
function _slicedToArray$2(arr, i2) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i2) || _unsupportedIterableToArray$2(arr, i2) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o2, minLen) {
  if (!o2) return;
  if (typeof o2 === "string") return _arrayLikeToArray$2(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray$2(o2, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
  return arr2;
}
function _iterableToArrayLimit$2(r2, l2) {
  var t4 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t4) {
    var e2, n2, i2, u2, a2 = [], f2 = true, o2 = false;
    try {
      if (i2 = (t4 = t4.call(r2)).next, 0 === l2) ;
      else for (; !(f2 = (e2 = i2.call(t4)).done) && (a2.push(e2.value), a2.length !== l2); f2 = true) ;
    } catch (r3) {
      o2 = true, n2 = r3;
    } finally {
      try {
        if (!f2 && null != t4["return"] && (u2 = t4["return"](), Object(u2) !== u2)) return;
      } finally {
        if (o2) throw n2;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys$1(e2, r2) {
  var t4 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t4.push.apply(t4, o2);
  }
  return t4;
}
function _objectSpread$1(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t4 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$1(Object(t4), true).forEach(function(r3) {
      _defineProperty$1(e2, r3, t4[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t4)) : ownKeys$1(Object(t4)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t4, r3));
    });
  }
  return e2;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t4) {
  var i2 = _toPrimitive$1(t4, "string");
  return "symbol" == _typeof$2(i2) ? i2 : String(i2);
}
function _toPrimitive$1(t4, r2) {
  if ("object" != _typeof$2(t4) || !t4) return t4;
  var e2 = t4[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t4, r2 || "default");
    if ("object" != _typeof$2(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t4);
}
var css = "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: var(--scrollbar-width);\n}\n";
var classes$1 = {};
var inlineStyles = {};
var BaseStyle = {
  name: "base",
  css,
  classes: classes$1,
  inlineStyles,
  loadStyle: function loadStyle() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.css ? useStyle(this.css, _objectSpread$1({
      name: this.name
    }, options)) : {};
  },
  getStyleSheet: function getStyleSheet() {
    var extendedCSS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var _props = Object.entries(props).reduce(function(acc, _ref) {
        var _ref2 = _slicedToArray$2(_ref, 2), k2 = _ref2[0], v2 = _ref2[1];
        return acc.push("".concat(k2, '="').concat(v2, '"')) && acc;
      }, []).join(" ");
      return '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(_props, ">").concat(this.css).concat(extendedCSS, "</style>");
    }
    return "";
  },
  extend: function extend(style) {
    return _objectSpread$1(_objectSpread$1({}, this), {}, {
      css: void 0
    }, style);
  }
};
function _typeof$1(o2) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$1(o2);
}
function _slicedToArray$1(arr, i2) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i2) || _unsupportedIterableToArray$1(arr, i2) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o2, minLen) {
  if (!o2) return;
  if (typeof o2 === "string") return _arrayLikeToArray$1(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray$1(o2, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
  return arr2;
}
function _iterableToArrayLimit$1(r2, l2) {
  var t4 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t4) {
    var e2, n2, i2, u2, a2 = [], f2 = true, o2 = false;
    try {
      if (i2 = (t4 = t4.call(r2)).next, 0 === l2) ;
      else for (; !(f2 = (e2 = i2.call(t4)).done) && (a2.push(e2.value), a2.length !== l2); f2 = true) ;
    } catch (r3) {
      o2 = true, n2 = r3;
    } finally {
      try {
        if (!f2 && null != t4["return"] && (u2 = t4["return"](), Object(u2) !== u2)) return;
      } finally {
        if (o2) throw n2;
      }
    }
    return a2;
  }
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys(e2, r2) {
  var t4 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t4.push.apply(t4, o2);
  }
  return t4;
}
function _objectSpread(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t4 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t4), true).forEach(function(r3) {
      _defineProperty(e2, r3, t4[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t4)) : ownKeys(Object(t4)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t4, r3));
    });
  }
  return e2;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t4) {
  var i2 = _toPrimitive(t4, "string");
  return "symbol" == _typeof$1(i2) ? i2 : String(i2);
}
function _toPrimitive(t4, r2) {
  if ("object" != _typeof$1(t4) || !t4) return t4;
  var e2 = t4[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t4, r2 || "default");
    if ("object" != _typeof$1(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t4);
}
var BaseDirective = {
  _getMeta: function _getMeta() {
    return [ObjectUtils.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? void 0 : arguments.length <= 0 ? void 0 : arguments[0], ObjectUtils.getItemValue(ObjectUtils.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 0 ? void 0 : arguments[0] : arguments.length <= 1 ? void 0 : arguments[1])];
  },
  _getConfig: function _getConfig(binding, vnode) {
    var _ref, _binding$instance, _vnode$ctx;
    return (_ref = (binding === null || binding === void 0 || (_binding$instance = binding.instance) === null || _binding$instance === void 0 ? void 0 : _binding$instance.$primevue) || (vnode === null || vnode === void 0 || (_vnode$ctx = vnode.ctx) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.appContext) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.config) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.globalProperties) === null || _vnode$ctx === void 0 ? void 0 : _vnode$ctx.$primevue)) === null || _ref === void 0 ? void 0 : _ref.config;
  },
  _getOptionValue: function _getOptionValue(options) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var fKeys = ObjectUtils.toFlatCase(key).split(".");
    var fKey = fKeys.shift();
    return fKey ? ObjectUtils.isObject(options) ? BaseDirective._getOptionValue(ObjectUtils.getItemValue(options[Object.keys(options).find(function(k2) {
      return ObjectUtils.toFlatCase(k2) === fKey;
    }) || ""], params), fKeys.join("."), params) : void 0 : ObjectUtils.getItemValue(options, params);
  },
  _getPTValue: function _getPTValue() {
    var _instance$binding, _instance$$primevueCo;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var key = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
    var params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var searchInDefaultPT = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
    var getValue = function getValue2() {
      var value = BaseDirective._getOptionValue.apply(BaseDirective, arguments);
      return ObjectUtils.isString(value) || ObjectUtils.isArray(value) ? {
        "class": value
      } : value;
    };
    var _ref2 = ((_instance$binding = instance.binding) === null || _instance$binding === void 0 || (_instance$binding = _instance$binding.value) === null || _instance$binding === void 0 ? void 0 : _instance$binding.ptOptions) || ((_instance$$primevueCo = instance.$primevueConfig) === null || _instance$$primevueCo === void 0 ? void 0 : _instance$$primevueCo.ptOptions) || {}, _ref2$mergeSections = _ref2.mergeSections, mergeSections = _ref2$mergeSections === void 0 ? true : _ref2$mergeSections, _ref2$mergeProps = _ref2.mergeProps, useMergeProps = _ref2$mergeProps === void 0 ? false : _ref2$mergeProps;
    var global = searchInDefaultPT ? BaseDirective._useDefaultPT(instance, instance.defaultPT(), getValue, key, params) : void 0;
    var self = BaseDirective._usePT(instance, BaseDirective._getPT(obj, instance.$name), getValue, key, _objectSpread(_objectSpread({}, params), {}, {
      global: global || {}
    }));
    var datasets = BaseDirective._getPTDatasets(instance, key);
    return mergeSections || !mergeSections && self ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, global, self, datasets) : _objectSpread(_objectSpread(_objectSpread({}, global), self), datasets) : _objectSpread(_objectSpread({}, self), datasets);
  },
  _getPTDatasets: function _getPTDatasets() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var datasetPrefix = "data-pc-";
    return _objectSpread(_objectSpread({}, key === "root" && _defineProperty({}, "".concat(datasetPrefix, "name"), ObjectUtils.toFlatCase(instance.$name))), {}, _defineProperty({}, "".concat(datasetPrefix, "section"), ObjectUtils.toFlatCase(key)));
  },
  _getPT: function _getPT(pt) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var getValue = function getValue2(value) {
      var _computedValue$_key;
      var computedValue = callback ? callback(value) : value;
      var _key = ObjectUtils.toFlatCase(key);
      return (_computedValue$_key = computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _computedValue$_key !== void 0 ? _computedValue$_key : computedValue;
    };
    return pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept") ? {
      _usept: pt["_usept"],
      originalValue: getValue(pt.originalValue),
      value: getValue(pt.value)
    } : getValue(pt);
  },
  _usePT: function _usePT() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var pt = arguments.length > 1 ? arguments[1] : void 0;
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    var fn = function fn2(value2) {
      return callback(value2, key, params);
    };
    if (pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept")) {
      var _instance$$primevueCo2;
      var _ref4 = pt["_usept"] || ((_instance$$primevueCo2 = instance.$primevueConfig) === null || _instance$$primevueCo2 === void 0 ? void 0 : _instance$$primevueCo2.ptOptions) || {}, _ref4$mergeSections = _ref4.mergeSections, mergeSections = _ref4$mergeSections === void 0 ? true : _ref4$mergeSections, _ref4$mergeProps = _ref4.mergeProps, useMergeProps = _ref4$mergeProps === void 0 ? false : _ref4$mergeProps;
      var originalValue = fn(pt.originalValue);
      var value = fn(pt.value);
      if (originalValue === void 0 && value === void 0) return void 0;
      else if (ObjectUtils.isString(value)) return value;
      else if (ObjectUtils.isString(originalValue)) return originalValue;
      return mergeSections || !mergeSections && value ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, originalValue, value) : _objectSpread(_objectSpread({}, originalValue), value) : value;
    }
    return fn(pt);
  },
  _useDefaultPT: function _useDefaultPT() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var defaultPT = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    return BaseDirective._usePT(instance, defaultPT, callback, key, params);
  },
  _hook: function _hook(directiveName, hookName, el, binding, vnode, prevVnode) {
    var _binding$value, _config$pt;
    var name = "on".concat(ObjectUtils.toCapitalCase(hookName));
    var config = BaseDirective._getConfig(binding, vnode);
    var instance = el === null || el === void 0 ? void 0 : el.$instance;
    var selfHook = BaseDirective._usePT(instance, BaseDirective._getPT(binding === null || binding === void 0 || (_binding$value = binding.value) === null || _binding$value === void 0 ? void 0 : _binding$value.pt, directiveName), BaseDirective._getOptionValue, "hooks.".concat(name));
    var defaultHook = BaseDirective._useDefaultPT(instance, config === null || config === void 0 || (_config$pt = config.pt) === null || _config$pt === void 0 || (_config$pt = _config$pt.directives) === null || _config$pt === void 0 ? void 0 : _config$pt[directiveName], BaseDirective._getOptionValue, "hooks.".concat(name));
    var options = {
      el,
      binding,
      vnode,
      prevVnode
    };
    selfHook === null || selfHook === void 0 || selfHook(instance, options);
    defaultHook === null || defaultHook === void 0 || defaultHook(instance, options);
  },
  _mergeProps: function _mergeProps() {
    var fn = arguments.length > 1 ? arguments[1] : void 0;
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }
    return ObjectUtils.isFunction(fn) ? fn.apply(void 0, args) : mergeProps.apply(void 0, args);
  },
  _extend: function _extend(name) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var handleHook = function handleHook2(hook, el, binding, vnode, prevVnode) {
      var _el$$instance$hook, _el$$instance7;
      el._$instances = el._$instances || {};
      var config = BaseDirective._getConfig(binding, vnode);
      var $prevInstance = el._$instances[name] || {};
      var $options = ObjectUtils.isEmpty($prevInstance) ? _objectSpread(_objectSpread({}, options), options === null || options === void 0 ? void 0 : options.methods) : {};
      el._$instances[name] = _objectSpread(_objectSpread({}, $prevInstance), {}, {
        /* new instance variables to pass in directive methods */
        $name: name,
        $host: el,
        $binding: binding,
        $modifiers: binding === null || binding === void 0 ? void 0 : binding.modifiers,
        $value: binding === null || binding === void 0 ? void 0 : binding.value,
        $el: $prevInstance["$el"] || el || void 0,
        $style: _objectSpread({
          classes: void 0,
          inlineStyles: void 0,
          loadStyle: function loadStyle2() {
          }
        }, options === null || options === void 0 ? void 0 : options.style),
        $primevueConfig: config,
        /* computed instance variables */
        defaultPT: function defaultPT() {
          return BaseDirective._getPT(config === null || config === void 0 ? void 0 : config.pt, void 0, function(value) {
            var _value$directives;
            return value === null || value === void 0 || (_value$directives = value.directives) === null || _value$directives === void 0 ? void 0 : _value$directives[name];
          });
        },
        isUnstyled: function isUnstyled() {
          var _el$$instance, _el$$instance2;
          return ((_el$$instance = el.$instance) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.$binding) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.value) === null || _el$$instance === void 0 ? void 0 : _el$$instance.unstyled) !== void 0 ? (_el$$instance2 = el.$instance) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.$binding) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.value) === null || _el$$instance2 === void 0 ? void 0 : _el$$instance2.unstyled : config === null || config === void 0 ? void 0 : config.unstyled;
        },
        /* instance's methods */
        ptm: function ptm() {
          var _el$$instance3;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return BaseDirective._getPTValue(el.$instance, (_el$$instance3 = el.$instance) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.$binding) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.value) === null || _el$$instance3 === void 0 ? void 0 : _el$$instance3.pt, key, _objectSpread({}, params));
        },
        ptmo: function ptmo() {
          var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return BaseDirective._getPTValue(el.$instance, obj, key, params, false);
        },
        cx: function cx() {
          var _el$$instance4, _el$$instance5;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return !((_el$$instance4 = el.$instance) !== null && _el$$instance4 !== void 0 && _el$$instance4.isUnstyled()) ? BaseDirective._getOptionValue((_el$$instance5 = el.$instance) === null || _el$$instance5 === void 0 || (_el$$instance5 = _el$$instance5.$style) === null || _el$$instance5 === void 0 ? void 0 : _el$$instance5.classes, key, _objectSpread({}, params)) : void 0;
        },
        sx: function sx() {
          var _el$$instance6;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var when = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return when ? BaseDirective._getOptionValue((_el$$instance6 = el.$instance) === null || _el$$instance6 === void 0 || (_el$$instance6 = _el$$instance6.$style) === null || _el$$instance6 === void 0 ? void 0 : _el$$instance6.inlineStyles, key, _objectSpread({}, params)) : void 0;
        }
      }, $options);
      el.$instance = el._$instances[name];
      (_el$$instance$hook = (_el$$instance7 = el.$instance)[hook]) === null || _el$$instance$hook === void 0 || _el$$instance$hook.call(_el$$instance7, el, binding, vnode, prevVnode);
      el["$".concat(name)] = el.$instance;
      BaseDirective._hook(name, hook, el, binding, vnode, prevVnode);
    };
    return {
      created: function created(el, binding, vnode, prevVnode) {
        handleHook("created", el, binding, vnode, prevVnode);
      },
      beforeMount: function beforeMount2(el, binding, vnode, prevVnode) {
        var _config$csp, _el$$instance8, _el$$instance9, _config$csp2;
        var config = BaseDirective._getConfig(binding, vnode);
        BaseStyle.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp = config.csp) === null || _config$csp === void 0 ? void 0 : _config$csp.nonce
        });
        !((_el$$instance8 = el.$instance) !== null && _el$$instance8 !== void 0 && _el$$instance8.isUnstyled()) && ((_el$$instance9 = el.$instance) === null || _el$$instance9 === void 0 || (_el$$instance9 = _el$$instance9.$style) === null || _el$$instance9 === void 0 ? void 0 : _el$$instance9.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp2 = config.csp) === null || _config$csp2 === void 0 ? void 0 : _config$csp2.nonce
        }));
        handleHook("beforeMount", el, binding, vnode, prevVnode);
      },
      mounted: function mounted(el, binding, vnode, prevVnode) {
        var _config$csp3, _el$$instance10, _el$$instance11, _config$csp4;
        var config = BaseDirective._getConfig(binding, vnode);
        BaseStyle.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp3 = config.csp) === null || _config$csp3 === void 0 ? void 0 : _config$csp3.nonce
        });
        !((_el$$instance10 = el.$instance) !== null && _el$$instance10 !== void 0 && _el$$instance10.isUnstyled()) && ((_el$$instance11 = el.$instance) === null || _el$$instance11 === void 0 || (_el$$instance11 = _el$$instance11.$style) === null || _el$$instance11 === void 0 ? void 0 : _el$$instance11.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp4 = config.csp) === null || _config$csp4 === void 0 ? void 0 : _config$csp4.nonce
        }));
        handleHook("mounted", el, binding, vnode, prevVnode);
      },
      beforeUpdate: function beforeUpdate(el, binding, vnode, prevVnode) {
        handleHook("beforeUpdate", el, binding, vnode, prevVnode);
      },
      updated: function updated2(el, binding, vnode, prevVnode) {
        handleHook("updated", el, binding, vnode, prevVnode);
      },
      beforeUnmount: function beforeUnmount(el, binding, vnode, prevVnode) {
        handleHook("beforeUnmount", el, binding, vnode, prevVnode);
      },
      unmounted: function unmounted2(el, binding, vnode, prevVnode) {
        handleHook("unmounted", el, binding, vnode, prevVnode);
      }
    };
  },
  extend: function extend2() {
    var _BaseDirective$_getMe = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe2 = _slicedToArray$1(_BaseDirective$_getMe, 2), name = _BaseDirective$_getMe2[0], options = _BaseDirective$_getMe2[1];
    return _objectSpread({
      extend: function extend3() {
        var _BaseDirective$_getMe3 = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe4 = _slicedToArray$1(_BaseDirective$_getMe3, 2), _name = _BaseDirective$_getMe4[0], _options = _BaseDirective$_getMe4[1];
        return BaseDirective.extend(_name, _objectSpread(_objectSpread(_objectSpread({}, options), options === null || options === void 0 ? void 0 : options.methods), _options));
      }
    }, BaseDirective._extend(name, options));
  }
};
var classes = {
  root: "p-tooltip p-component",
  arrow: "p-tooltip-arrow",
  text: "p-tooltip-text"
};
var TooltipStyle = BaseStyle.extend({
  name: "tooltip",
  classes
});
var BaseTooltip = BaseDirective.extend({
  style: TooltipStyle
});
function _slicedToArray(arr, i2) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2) return;
  if (typeof o2 === "string") return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray(o2, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
  return arr2;
}
function _iterableToArrayLimit(r2, l2) {
  var t4 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t4) {
    var e2, n2, i2, u2, a2 = [], f2 = true, o2 = false;
    try {
      if (i2 = (t4 = t4.call(r2)).next, 0 === l2) ;
      else for (; !(f2 = (e2 = i2.call(t4)).done) && (a2.push(e2.value), a2.length !== l2); f2 = true) ;
    } catch (r3) {
      o2 = true, n2 = r3;
    } finally {
      try {
        if (!f2 && null != t4["return"] && (u2 = t4["return"](), Object(u2) !== u2)) return;
      } finally {
        if (o2) throw n2;
      }
    }
    return a2;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}
var Tooltip = BaseTooltip.extend("tooltip", {
  beforeMount: function beforeMount(el, options) {
    var _options$instance$$pr;
    var target = this.getTarget(el);
    target.$_ptooltipModifiers = this.getModifiers(options);
    if (!options.value) return;
    else if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = true;
      target.$_ptooltipClass = null;
      target.$_ptooltipFitContent = true;
      target.$_ptooltipIdAttr = UniqueComponentId() + "_tooltip";
      target.$_ptooltipShowDelay = 0;
      target.$_ptooltipHideDelay = 0;
      target.$_ptooltipAutoHide = true;
    } else if (_typeof(options.value) === "object" && options.value) {
      if (ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === "") return;
      else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : true;
        target.$_ptooltipClass = options.value["class"] || "";
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || UniqueComponentId() + "_tooltip";
        target.$_ptooltipShowDelay = options.value.showDelay || 0;
        target.$_ptooltipHideDelay = options.value.hideDelay || 0;
        target.$_ptooltipAutoHide = !!options.value.autoHide === options.value.autoHide ? options.value.autoHide : true;
      }
    }
    target.$_ptooltipZIndex = (_options$instance$$pr = options.instance.$primevue) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.config) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.zIndex) === null || _options$instance$$pr === void 0 ? void 0 : _options$instance$$pr.tooltip;
    this.bindEvents(target, options);
    el.setAttribute("data-pd-tooltip", true);
  },
  updated: function updated(el, options) {
    var target = this.getTarget(el);
    target.$_ptooltipModifiers = this.getModifiers(options);
    this.unbindEvents(target);
    if (!options.value) {
      return;
    }
    if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = true;
      target.$_ptooltipClass = null;
      target.$_ptooltipIdAttr = target.$_ptooltipIdAttr || UniqueComponentId() + "_tooltip";
      target.$_ptooltipShowDelay = 0;
      target.$_ptooltipHideDelay = 0;
      target.$_ptooltipAutoHide = true;
      this.bindEvents(target, options);
    } else if (_typeof(options.value) === "object" && options.value) {
      if (ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === "") {
        this.unbindEvents(target, options);
        return;
      } else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : true;
        target.$_ptooltipClass = options.value["class"] || "";
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || target.$_ptooltipIdAttr || UniqueComponentId() + "_tooltip";
        target.$_ptooltipShowDelay = options.value.showDelay || 0;
        target.$_ptooltipHideDelay = options.value.hideDelay || 0;
        target.$_ptooltipAutoHide = !!options.value.autoHide === options.value.autoHide ? options.value.autoHide : true;
        this.bindEvents(target, options);
      }
    }
  },
  unmounted: function unmounted(el, options) {
    var target = this.getTarget(el);
    this.remove(target);
    this.unbindEvents(target, options);
    if (target.$_ptooltipScrollHandler) {
      target.$_ptooltipScrollHandler.destroy();
      target.$_ptooltipScrollHandler = null;
    }
  },
  timer: void 0,
  methods: {
    bindEvents: function bindEvents(el, options) {
      var _this = this;
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.focus) {
        el.$_focusevent = function(event) {
          return _this.onFocus(event, options);
        };
        el.addEventListener("focus", el.$_focusevent);
        el.addEventListener("blur", this.onBlur.bind(this));
      } else {
        el.$_mouseenterevent = function(event) {
          return _this.onMouseEnter(event, options);
        };
        el.addEventListener("mouseenter", el.$_mouseenterevent);
        el.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        el.addEventListener("click", this.onClick.bind(this));
      }
      el.addEventListener("keydown", this.onKeydown.bind(this));
    },
    unbindEvents: function unbindEvents(el) {
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.focus) {
        el.removeEventListener("focus", el.$_focusevent);
        el.$_focusevent = null;
        el.removeEventListener("blur", this.onBlur.bind(this));
      } else {
        el.removeEventListener("mouseenter", el.$_mouseenterevent);
        el.$_mouseenterevent = null;
        el.removeEventListener("mouseleave", this.onMouseLeave.bind(this));
        el.removeEventListener("click", this.onClick.bind(this));
      }
      el.removeEventListener("keydown", this.onKeydown.bind(this));
    },
    bindScrollListener: function bindScrollListener(el) {
      var _this2 = this;
      if (!el.$_ptooltipScrollHandler) {
        el.$_ptooltipScrollHandler = new ConnectedOverlayScrollHandler(el, function() {
          _this2.hide(el);
        });
      }
      el.$_ptooltipScrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener(el) {
      if (el.$_ptooltipScrollHandler) {
        el.$_ptooltipScrollHandler.unbindScrollListener();
      }
    },
    onMouseEnter: function onMouseEnter(event, options) {
      var el = event.currentTarget;
      var showDelay = el.$_ptooltipShowDelay;
      this.show(el, options, showDelay);
    },
    onMouseLeave: function onMouseLeave(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      var autoHide = el.$_ptooltipAutoHide;
      if (!autoHide) {
        var valid = DomHandler.getAttribute(event.target, "data-pc-name") === "tooltip" || DomHandler.getAttribute(event.target, "data-pc-section") === "arrow" || DomHandler.getAttribute(event.target, "data-pc-section") === "text" || DomHandler.getAttribute(event.relatedTarget, "data-pc-name") === "tooltip" || DomHandler.getAttribute(event.relatedTarget, "data-pc-section") === "arrow" || DomHandler.getAttribute(event.relatedTarget, "data-pc-section") === "text";
        !valid && this.hide(el, hideDelay);
      } else {
        this.hide(el, hideDelay);
      }
    },
    onFocus: function onFocus(event, options) {
      var el = event.currentTarget;
      var showDelay = el.$_ptooltipShowDelay;
      this.show(el, options, showDelay);
    },
    onBlur: function onBlur(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      this.hide(el, hideDelay);
    },
    onClick: function onClick(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      this.hide(el, hideDelay);
    },
    onKeydown: function onKeydown(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      event.code === "Escape" && this.hide(event.currentTarget, hideDelay);
    },
    tooltipActions: function tooltipActions(el, options) {
      if (el.$_ptooltipDisabled || !DomHandler.isExist(el)) {
        return;
      }
      var tooltipElement = this.create(el, options);
      this.align(el);
      !this.isUnstyled() && DomHandler.fadeIn(tooltipElement, 250);
      var $this = this;
      window.addEventListener("resize", function onWindowResize() {
        if (!DomHandler.isTouchDevice()) {
          $this.hide(el);
        }
        window.removeEventListener("resize", onWindowResize);
      });
      tooltipElement.addEventListener("mouseleave", function onTooltipLeave() {
        $this.hide(el);
        tooltipElement.removeEventListener("mouseleave", onTooltipLeave);
      });
      this.bindScrollListener(el);
      ZIndexUtils.set("tooltip", tooltipElement, el.$_ptooltipZIndex);
    },
    show: function show(el, options, showDelay) {
      var _this3 = this;
      if (showDelay !== void 0) {
        this.timer = setTimeout(function() {
          return _this3.tooltipActions(el, options);
        }, showDelay);
      } else {
        this.tooltipActions(el, options);
      }
    },
    tooltipRemoval: function tooltipRemoval(el) {
      this.remove(el);
      this.unbindScrollListener(el);
    },
    hide: function hide(el, hideDelay) {
      var _this4 = this;
      clearTimeout(this.timer);
      if (hideDelay !== void 0) {
        setTimeout(function() {
          return _this4.tooltipRemoval(el);
        }, hideDelay);
      } else {
        this.tooltipRemoval(el);
      }
    },
    getTooltipElement: function getTooltipElement(el) {
      return document.getElementById(el.$_ptooltipId);
    },
    create: function create(el) {
      var modifiers = el.$_ptooltipModifiers;
      var tooltipArrow = DomHandler.createElement("div", {
        "class": !this.isUnstyled() && this.cx("arrow"),
        "p-bind": this.ptm("arrow", {
          context: modifiers
        })
      });
      var tooltipText = DomHandler.createElement("div", {
        "class": !this.isUnstyled() && this.cx("text"),
        "p-bind": this.ptm("text", {
          context: modifiers
        })
      });
      if (!el.$_ptooltipEscape) {
        tooltipText.innerHTML = el.$_ptooltipValue;
      } else {
        tooltipText.innerHTML = "";
        tooltipText.appendChild(document.createTextNode(el.$_ptooltipValue));
      }
      var container = DomHandler.createElement("div", {
        id: el.$_ptooltipIdAttr,
        role: "tooltip",
        style: {
          display: "inline-block",
          width: el.$_ptooltipFitContent ? "fit-content" : void 0,
          pointerEvents: !this.isUnstyled() && el.$_ptooltipAutoHide && "none"
        },
        "class": [!this.isUnstyled() && this.cx("root"), el.$_ptooltipClass],
        "p-bind": this.ptm("root", {
          context: modifiers
        })
      }, tooltipArrow, tooltipText);
      document.body.appendChild(container);
      el.$_ptooltipId = container.id;
      this.$el = container;
      return container;
    },
    remove: function remove(el) {
      if (el) {
        var tooltipElement = this.getTooltipElement(el);
        if (tooltipElement && tooltipElement.parentElement) {
          ZIndexUtils.clear(tooltipElement);
          document.body.removeChild(tooltipElement);
        }
        el.$_ptooltipId = null;
      }
    },
    align: function align(el) {
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.top) {
        this.alignTop(el);
        if (this.isOutOfBounds(el)) {
          this.alignBottom(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
          }
        }
      } else if (modifiers.left) {
        this.alignLeft(el);
        if (this.isOutOfBounds(el)) {
          this.alignRight(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
            if (this.isOutOfBounds(el)) {
              this.alignBottom(el);
              if (this.isOutOfBounds(el)) {
                this.alignLeft(el);
              }
            }
          }
        }
      } else if (modifiers.bottom) {
        this.alignBottom(el);
        if (this.isOutOfBounds(el)) {
          this.alignTop(el);
          if (this.isOutOfBounds(el)) {
            this.alignBottom(el);
          }
        }
      } else {
        this.alignRight(el);
        if (this.isOutOfBounds(el)) {
          this.alignLeft(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
            if (this.isOutOfBounds(el)) {
              this.alignBottom(el);
              if (this.isOutOfBounds(el)) {
                this.alignRight(el);
              }
            }
          }
        }
      }
    },
    getHostOffset: function getHostOffset(el) {
      var offset = el.getBoundingClientRect();
      var targetLeft = offset.left + DomHandler.getWindowScrollLeft();
      var targetTop = offset.top + DomHandler.getWindowScrollTop();
      return {
        left: targetLeft,
        top: targetTop
      };
    },
    alignRight: function alignRight(el) {
      this.preAlign(el, "right");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + DomHandler.getOuterWidth(el);
      var top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignLeft: function alignLeft(el) {
      this.preAlign(el, "left");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left - DomHandler.getOuterWidth(tooltipElement);
      var top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignTop: function alignTop(el) {
      this.preAlign(el, "top");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
      var top = hostOffset.top - DomHandler.getOuterHeight(tooltipElement);
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignBottom: function alignBottom(el) {
      this.preAlign(el, "bottom");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
      var top = hostOffset.top + DomHandler.getOuterHeight(el);
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    preAlign: function preAlign(el, position) {
      var tooltipElement = this.getTooltipElement(el);
      tooltipElement.style.left = "-999px";
      tooltipElement.style.top = "-999px";
      DomHandler.removeClass(tooltipElement, "p-tooltip-".concat(tooltipElement.$_ptooltipPosition));
      !this.isUnstyled() && DomHandler.addClass(tooltipElement, "p-tooltip-".concat(position));
      tooltipElement.$_ptooltipPosition = position;
      tooltipElement.setAttribute("data-p-position", position);
      var arrowElement = DomHandler.findSingle(tooltipElement, '[data-pc-section="arrow"]');
      arrowElement.style.top = position === "bottom" ? "0" : position === "right" || position === "left" || position !== "right" && position !== "left" && position !== "top" && position !== "bottom" ? "50%" : null;
      arrowElement.style.bottom = position === "top" ? "0" : null;
      arrowElement.style.left = position === "right" || position !== "right" && position !== "left" && position !== "top" && position !== "bottom" ? "0" : position === "top" || position === "bottom" ? "50%" : null;
      arrowElement.style.right = position === "left" ? "0" : null;
    },
    isOutOfBounds: function isOutOfBounds(el) {
      var tooltipElement = this.getTooltipElement(el);
      var offset = tooltipElement.getBoundingClientRect();
      var targetTop = offset.top;
      var targetLeft = offset.left;
      var width2 = DomHandler.getOuterWidth(tooltipElement);
      var height = DomHandler.getOuterHeight(tooltipElement);
      var viewport = DomHandler.getViewport();
      return targetLeft + width2 > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
    },
    getTarget: function getTarget(el) {
      return DomHandler.hasClass(el, "p-inputwrapper") ? DomHandler.findSingle(el, "input") : el;
    },
    getModifiers: function getModifiers(options) {
      if (options.modifiers && Object.keys(options.modifiers).length) {
        return options.modifiers;
      }
      if (options.arg && _typeof(options.arg) === "object") {
        return Object.entries(options.arg).reduce(function(acc, _ref) {
          var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], val = _ref2[1];
          if (key === "event" || key === "position") acc[val] = true;
          return acc;
        }, {});
      }
      return {};
    }
  }
});
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) ({}).hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(null, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = "RFC3986", o = { default: n, formatters: { RFC1738: function(t4) {
  return e.call(t4, r, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738", RFC3986: n }, i = Object.prototype.hasOwnProperty, u = Array.isArray, a = function() {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2) t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
}(), s = function(t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2) void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, f = { arrayToObject: s, assign: function(t4, e2) {
  return Object.keys(e2).reduce(function(t5, r2) {
    return t5[r2] = e2[r2], t5;
  }, t4);
}, combine: function(t4, e2) {
  return [].concat(t4, e2);
}, compact: function(t4) {
  for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2) for (var o2 = e2[n2], i2 = o2.obj[o2.prop], a2 = Object.keys(i2), s2 = 0; s2 < a2.length; ++s2) {
    var f2 = a2[s2], c2 = i2[f2];
    "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: i2, prop: f2 }), r2.push(c2));
  }
  return function(t5) {
    for (; t5.length > 1; ) {
      var e3 = t5.pop(), r3 = e3.obj[e3.prop];
      if (u(r3)) {
        for (var n3 = [], o3 = 0; o3 < r3.length; ++o3) void 0 !== r3[o3] && n3.push(r3[o3]);
        e3.obj[e3.prop] = n3;
      }
    }
  }(e2), t4;
}, decode: function(t4, e2, r2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === r2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, e2, r2, n2, i2) {
  if (0 === t4.length) return t4;
  var u2 = t4;
  if ("symbol" == typeof t4 ? u2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (u2 = String(t4)), "iso-8859-1" === r2) return escape(u2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
    return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
  });
  for (var s2 = "", f2 = 0; f2 < u2.length; ++f2) {
    var c2 = u2.charCodeAt(f2);
    45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === o.RFC1738 && (40 === c2 || 41 === c2) ? s2 += u2.charAt(f2) : c2 < 128 ? s2 += a[c2] : c2 < 2048 ? s2 += a[192 | c2 >> 6] + a[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += a[224 | c2 >> 12] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & u2.charCodeAt(f2 += 1)), s2 += a[240 | c2 >> 18] + a[128 | c2 >> 12 & 63] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2]);
  }
  return s2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, e2) {
  if (u(t4)) {
    for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1) r2.push(e2(t4[n2]));
    return r2;
  }
  return e2(t4);
}, merge: function t2(e2, r2, n2) {
  if (!r2) return e2;
  if ("object" != typeof r2) {
    if (u(e2)) e2.push(r2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, r2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) return [e2].concat(r2);
  var o2 = e2;
  return u(e2) && !u(r2) && (o2 = s(e2, n2)), u(e2) && u(r2) ? (r2.forEach(function(r3, o3) {
    if (i.call(e2, o3)) {
      var u2 = e2[o3];
      u2 && "object" == typeof u2 && r3 && "object" == typeof r3 ? e2[o3] = t2(u2, r3, n2) : e2.push(r3);
    } else e2[o3] = r3;
  }), e2) : Object.keys(r2).reduce(function(e3, o3) {
    var u2 = r2[o3];
    return e3[o3] = i.call(e3, o3) ? t2(e3[o3], u2, n2) : u2, e3;
  }, o2);
} }, c = Object.prototype.hasOwnProperty, l = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, e2) {
  return t4 + "[" + e2 + "]";
}, repeat: function(t4) {
  return t4;
} }, p = Array.isArray, h = String.prototype.split, y = Array.prototype.push, d = function(t4, e2) {
  y.apply(t4, p(e2) ? e2 : [e2]);
}, g = Date.prototype.toISOString, b = o.default, v = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: f.encode, encodeValuesOnly: false, format: b, formatter: o.formatters[b], indices: false, serializeDate: function(t4) {
  return g.call(t4);
}, skipNulls: false, strictNullHandling: false }, m = function t3(e2, r2, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = l2(w2) : "comma" === n2 && p(w2) && (w2 = f.maybeMap(w2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === w2) {
    if (o2) return u2 && !b2 ? u2(r2, v.encoder, m2, "key", y2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || f.isBuffer(w2)) {
    if (u2) {
      var $2 = b2 ? r2 : u2(r2, v.encoder, m2, "key", y2);
      if ("comma" === n2 && b2) {
        for (var O2 = h.call(String(w2), ","), E2 = "", R2 = 0; R2 < O2.length; ++R2) E2 += (0 === R2 ? "" : ",") + g2(u2(O2[R2], v.encoder, m2, "value", y2));
        return [g2($2) + "=" + E2];
      }
      return [g2($2) + "=" + g2(u2(w2, v.encoder, m2, "value", y2))];
    }
    return [g2(r2) + "=" + g2(String(w2))];
  }
  var S2, x2 = [];
  if (void 0 === w2) return x2;
  if ("comma" === n2 && p(w2)) S2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (p(a2)) S2 = a2;
  else {
    var N2 = Object.keys(w2);
    S2 = s2 ? N2.sort(s2) : N2;
  }
  for (var T2 = 0; T2 < S2.length; ++T2) {
    var k2 = S2[T2], C = "object" == typeof k2 && void 0 !== k2.value ? k2.value : w2[k2];
    if (!i2 || null !== C) {
      var _ = p(w2) ? "function" == typeof n2 ? n2(r2, k2) : r2 : r2 + (c2 ? "." + k2 : "[" + k2 + "]");
      d(x2, t3(C, _, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2));
    }
  }
  return x2;
}, j = Object.prototype.hasOwnProperty, w = Array.isArray, $ = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: f.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, E = function(t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, R = function(t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && j.call(Object.prototype, a2) && !r2.allowPrototypes) return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth; ) {
      if (f2 += 1, !r2.plainObjects && j.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes) return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), function(t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : E(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(s2, e2, r2, n2);
  }
}, S = function(t4, e2) {
  var r2 = /* @__PURE__ */ function(t5) {
    return $;
  }();
  if ("" === t4 || null == t4) return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < o3.length; ++r3) 0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3) if (r3 !== i3) {
      var a3, s3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === p2 ? (a3 = e3.decoder(c2, $.decoder, u3, "key"), s3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), $.decoder, u3, "key"), s3 = f.maybeMap(E(c2.slice(p2 + 1), e3), function(t6) {
        return e3.decoder(t6, $.decoder, u3, "value");
      })), s3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (s3 = O(s3)), c2.indexOf("[]=") > -1 && (s3 = w(s3) ? [s3] : s3), n3[a3] = j.call(n3, a3) ? f.combine(n3[a3], s3) : s3;
    }
    return n3;
  }(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], s2 = R(a2, n2[a2], r2, "string" == typeof t4);
    o2 = f.merge(o2, s2, r2);
  }
  return f.compact(o2);
};
class x {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    const t4 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t4 ? "/" : t4;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const r2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i3 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, o2] = t4.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${r2}/?$`).exec(n2)) ? e2 : new RegExp(`^${r2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t5 in i2.groups) i2.groups[t5] = "string" == typeof i2.groups[t5] ? decodeURIComponent(i2.groups[t5]) : i2.groups[t5];
      return { params: i2.groups, query: S(o2) };
    }
    return false;
  }
  compile(t4) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, r2, n2) => {
      var o2, i2;
      if (!n2 && [null, void 0].includes(t4[r2])) throw new Error(`Ziggy error: '${r2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r2] && !new RegExp(`^${n2 ? `(${this.wheres[r2]})?` : this.wheres[r2]}$`).test(null != (i2 = t4[r2]) ? i2 : "")) throw new Error(`Ziggy error: '${r2}' parameter '${t4[r2]}' does not match required format '${this.wheres[r2]}' for route '${this.name}'.`);
      return encodeURI(null != (o2 = t4[r2]) ? o2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class N extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + function(t4, e3) {
      var r2, n2 = t4, i2 = function(t5) {
        if (!t5) return v;
        if (null != t5.encoder && "function" != typeof t5.encoder) throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = o.default;
        if (void 0 !== t5.format) {
          if (!c.call(o.formatters, t5.format)) throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var n3 = o.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || p(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: n3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      }(e3);
      "function" == typeof i2.filter ? n2 = (0, i2.filter)("", n2) : p(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof n2 || null === n2) return "";
      var a2 = l[e3 && e3.arrayFormat in l ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(n2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var f2 = r2[s2];
        i2.skipNulls && null === n2[f2] || d(u2, m(n2[f2], f2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? y2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new x(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2) return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2) return a2;
    const s2 = new x(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    if (Object.values(r2).every((t4) => !t4) && !Object.values(f2).some((t4) => void 0 !== t4)) return true;
    const c2 = (t4, e3) => Object.entries(t4).every(([t5, r3]) => Array.isArray(r3) && Array.isArray(e3[t5]) ? r3.every((r4) => e3[t5].includes(r4)) : "object" == typeof r3 && "object" == typeof e3[t5] && null !== r3 && null !== e3[t5] ? c2(r3, e3[t5]) : e3[t5] == r3);
    return c2(r2, f2);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t4) {
    return this.t.routes.hasOwnProperty(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.j(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  j(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2)) return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t4, e2, r2, n2) {
  const o2 = new N(t4, e2, r2, n2);
  return t4 ? o2.toString() : o2;
}
const k = { install(t4, e2) {
  const r2 = (t5, r3, n2, o2 = e2) => T(t5, r3, n2, o2);
  parseInt(t4.version) > 2 ? (t4.config.globalProperties.route = r2, t4.provide("route", r2)) : t4.mixin({ methods: { route: r2 } });
} };
const vfm = zo();
const pinia = createPinia();
const appName = "Laravel";
createServer(
  (page) => j$2({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/catalog.vue": __vite_glob_0_0, "./Pages/category.vue": __vite_glob_0_1, "./Pages/contact.vue": __vite_glob_0_2, "./Pages/main.vue": __vite_glob_0_3, "./Pages/product.vue": __vite_glob_0_4, "./Pages/products.vue": __vite_glob_0_5 });
      return pages[`./Pages/${name}.vue`];
    },
    setup({ App, props, plugin }) {
      const app = createSSRApp({
        render: () => h$1(App, props)
      });
      app.use(plugin).use(vfm).use(pinia).use(k).use(PrimeVue).directive("tooltip", Tooltip);
      return app;
    }
  })
);
