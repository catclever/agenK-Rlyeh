var Gf = Object.defineProperty;
var Yf = (e, t, r) => t in e ? Gf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Kr = (e, t, r) => Yf(e, typeof t != "symbol" ? t + "" : t, r);
import { useState as Vr, useEffect as bc } from "react";
import { jsx as Tt, Fragment as _c, jsxs as bu } from "react/jsx-runtime";
var pe;
(function(e) {
  e.assertEqual = (i) => {
  };
  function t(i) {
  }
  e.assertIs = t;
  function r(i) {
    throw new Error();
  }
  e.assertNever = r, e.arrayToEnum = (i) => {
    const s = {};
    for (const u of i)
      s[u] = u;
    return s;
  }, e.getValidEnumValues = (i) => {
    const s = e.objectKeys(i).filter((l) => typeof i[i[l]] != "number"), u = {};
    for (const l of s)
      u[l] = i[l];
    return e.objectValues(u);
  }, e.objectValues = (i) => e.objectKeys(i).map(function(s) {
    return i[s];
  }), e.objectKeys = typeof Object.keys == "function" ? (i) => Object.keys(i) : (i) => {
    const s = [];
    for (const u in i)
      Object.prototype.hasOwnProperty.call(i, u) && s.push(u);
    return s;
  }, e.find = (i, s) => {
    for (const u of i)
      if (s(u))
        return u;
  }, e.isInteger = typeof Number.isInteger == "function" ? (i) => Number.isInteger(i) : (i) => typeof i == "number" && Number.isFinite(i) && Math.floor(i) === i;
  function n(i, s = " | ") {
    return i.map((u) => typeof u == "string" ? `'${u}'` : u).join(s);
  }
  e.joinValues = n, e.jsonStringifyReplacer = (i, s) => typeof s == "bigint" ? s.toString() : s;
})(pe || (pe = {}));
var Ps;
(function(e) {
  e.mergeShapes = (t, r) => ({
    ...t,
    ...r
    // second overwrites first
  });
})(Ps || (Ps = {}));
const H = pe.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), Dt = (e) => {
  switch (typeof e) {
    case "undefined":
      return H.undefined;
    case "string":
      return H.string;
    case "number":
      return Number.isNaN(e) ? H.nan : H.number;
    case "boolean":
      return H.boolean;
    case "function":
      return H.function;
    case "bigint":
      return H.bigint;
    case "symbol":
      return H.symbol;
    case "object":
      return Array.isArray(e) ? H.array : e === null ? H.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? H.promise : typeof Map < "u" && e instanceof Map ? H.map : typeof Set < "u" && e instanceof Set ? H.set : typeof Date < "u" && e instanceof Date ? H.date : H.object;
    default:
      return H.unknown;
  }
}, j = pe.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), Jf = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
class Ge extends Error {
  get errors() {
    return this.issues;
  }
  constructor(t) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = t;
  }
  format(t) {
    const r = t || function(s) {
      return s.message;
    }, n = { _errors: [] }, i = (s) => {
      for (const u of s.issues)
        if (u.code === "invalid_union")
          u.unionErrors.map(i);
        else if (u.code === "invalid_return_type")
          i(u.returnTypeError);
        else if (u.code === "invalid_arguments")
          i(u.argumentsError);
        else if (u.path.length === 0)
          n._errors.push(r(u));
        else {
          let l = n, d = 0;
          for (; d < u.path.length; ) {
            const m = u.path[d];
            d === u.path.length - 1 ? (l[m] = l[m] || { _errors: [] }, l[m]._errors.push(r(u))) : l[m] = l[m] || { _errors: [] }, l = l[m], d++;
          }
        }
    };
    return i(this), n;
  }
  static assert(t) {
    if (!(t instanceof Ge))
      throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, pe.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (r) => r.message) {
    const r = {}, n = [];
    for (const i of this.issues)
      if (i.path.length > 0) {
        const s = i.path[0];
        r[s] = r[s] || [], r[s].push(t(i));
      } else
        n.push(t(i));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
Ge.create = (e) => new Ge(e);
const Xr = (e, t) => {
  let r;
  switch (e.code) {
    case j.invalid_type:
      e.received === H.undefined ? r = "Required" : r = `Expected ${e.expected}, received ${e.received}`;
      break;
    case j.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(e.expected, pe.jsonStringifyReplacer)}`;
      break;
    case j.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${pe.joinValues(e.keys, ", ")}`;
      break;
    case j.invalid_union:
      r = "Invalid input";
      break;
    case j.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${pe.joinValues(e.options)}`;
      break;
    case j.invalid_enum_value:
      r = `Invalid enum value. Expected ${pe.joinValues(e.options)}, received '${e.received}'`;
      break;
    case j.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case j.invalid_return_type:
      r = "Invalid function return type";
      break;
    case j.invalid_date:
      r = "Invalid date";
      break;
    case j.invalid_string:
      typeof e.validation == "object" ? "includes" in e.validation ? (r = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? r = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? r = `Invalid input: must end with "${e.validation.endsWith}"` : pe.assertNever(e.validation) : e.validation !== "regex" ? r = `Invalid ${e.validation}` : r = "Invalid";
      break;
    case j.too_small:
      e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "bigint" ? r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : r = "Invalid input";
      break;
    case j.too_big:
      e.type === "array" ? r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? r = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? r = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? r = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : r = "Invalid input";
      break;
    case j.custom:
      r = "Invalid input";
      break;
    case j.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case j.not_multiple_of:
      r = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case j.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = t.defaultError, pe.assertNever(e);
  }
  return { message: r };
};
let wc = Xr;
function Xf(e) {
  wc = e;
}
function Qi() {
  return wc;
}
const Gi = (e) => {
  const { data: t, path: r, errorMaps: n, issueData: i } = e, s = [...r, ...i.path || []], u = {
    ...i,
    path: s
  };
  if (i.message !== void 0)
    return {
      ...i,
      path: s,
      message: i.message
    };
  let l = "";
  const d = n.filter((m) => !!m).slice().reverse();
  for (const m of d)
    l = m(u, { data: t, defaultError: l }).message;
  return {
    ...i,
    path: s,
    message: l
  };
}, ed = [];
function z(e, t) {
  const r = Qi(), n = Gi({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [
      e.common.contextualErrorMap,
      // contextual error map is first priority
      e.schemaErrorMap,
      // then schema-bound map if available
      r,
      // then global override map
      r === Xr ? void 0 : Xr
      // then global default map
    ].filter((i) => !!i)
  });
  e.common.issues.push(n);
}
class je {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, r) {
    const n = [];
    for (const i of r) {
      if (i.status === "aborted")
        return re;
      i.status === "dirty" && t.dirty(), n.push(i.value);
    }
    return { status: t.value, value: n };
  }
  static async mergeObjectAsync(t, r) {
    const n = [];
    for (const i of r) {
      const s = await i.key, u = await i.value;
      n.push({
        key: s,
        value: u
      });
    }
    return je.mergeObjectSync(t, n);
  }
  static mergeObjectSync(t, r) {
    const n = {};
    for (const i of r) {
      const { key: s, value: u } = i;
      if (s.status === "aborted" || u.status === "aborted")
        return re;
      s.status === "dirty" && t.dirty(), u.status === "dirty" && t.dirty(), s.value !== "__proto__" && (typeof u.value < "u" || i.alwaysSet) && (n[s.value] = u.value);
    }
    return { status: t.value, value: n };
  }
}
const re = Object.freeze({
  status: "aborted"
}), Wr = (e) => ({ status: "dirty", value: e }), Ke = (e) => ({ status: "valid", value: e }), Ts = (e) => e.status === "aborted", As = (e) => e.status === "dirty", Er = (e) => e.status === "valid", jn = (e) => typeof Promise < "u" && e instanceof Promise;
var Y;
(function(e) {
  e.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, e.toString = (t) => typeof t == "string" ? t : t == null ? void 0 : t.message;
})(Y || (Y = {}));
class wt {
  constructor(t, r, n, i) {
    this._cachedPath = [], this.parent = t, this.data = r, this._path = n, this._key = i;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const _u = (e, t) => {
  if (Er(t))
    return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new Ge(e.common.issues);
      return this._error = r, this._error;
    }
  };
};
function oe(e) {
  if (!e)
    return {};
  const { errorMap: t, invalid_type_error: r, required_error: n, description: i } = e;
  if (t && (r || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? { errorMap: t, description: i } : { errorMap: (u, l) => {
    const { message: d } = e;
    return u.code === "invalid_enum_value" ? { message: d ?? l.defaultError } : typeof l.data > "u" ? { message: d ?? n ?? l.defaultError } : u.code !== "invalid_type" ? { message: l.defaultError } : { message: d ?? r ?? l.defaultError };
  }, description: i };
}
class ue {
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return Dt(t.data);
  }
  _getOrReturnCtx(t, r) {
    return r || {
      common: t.parent.common,
      data: t.data,
      parsedType: Dt(t.data),
      schemaErrorMap: this._def.errorMap,
      path: t.path,
      parent: t.parent
    };
  }
  _processInputParams(t) {
    return {
      status: new je(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: Dt(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      }
    };
  }
  _parseSync(t) {
    const r = this._parse(t);
    if (jn(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(t) {
    const r = this._parse(t);
    return Promise.resolve(r);
  }
  parse(t, r) {
    const n = this.safeParse(t, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  safeParse(t, r) {
    const n = {
      common: {
        issues: [],
        async: (r == null ? void 0 : r.async) ?? !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Dt(t)
    }, i = this._parseSync({ data: t, path: n.path, parent: n });
    return _u(n, i);
  }
  "~validate"(t) {
    var n, i;
    const r = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Dt(t)
    };
    if (!this["~standard"].async)
      try {
        const s = this._parseSync({ data: t, path: [], parent: r });
        return Er(s) ? {
          value: s.value
        } : {
          issues: r.common.issues
        };
      } catch (s) {
        (i = (n = s == null ? void 0 : s.message) == null ? void 0 : n.toLowerCase()) != null && i.includes("encountered") && (this["~standard"].async = !0), r.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: t, path: [], parent: r }).then((s) => Er(s) ? {
      value: s.value
    } : {
      issues: r.common.issues
    });
  }
  async parseAsync(t, r) {
    const n = await this.safeParseAsync(t, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  async safeParseAsync(t, r) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: r == null ? void 0 : r.errorMap,
        async: !0
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: Dt(t)
    }, i = this._parse({ data: t, path: n.path, parent: n }), s = await (jn(i) ? i : Promise.resolve(i));
    return _u(n, s);
  }
  refine(t, r) {
    const n = (i) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(i) : r;
    return this._refinement((i, s) => {
      const u = t(i), l = () => s.addIssue({
        code: j.custom,
        ...n(i)
      });
      return typeof Promise < "u" && u instanceof Promise ? u.then((d) => d ? !0 : (l(), !1)) : u ? !0 : (l(), !1);
    });
  }
  refinement(t, r) {
    return this._refinement((n, i) => t(n) ? !0 : (i.addIssue(typeof r == "function" ? r(n, i) : r), !1));
  }
  _refinement(t) {
    return new lt({
      schema: this,
      typeName: ne.ZodEffects,
      effect: { type: "refinement", refinement: t }
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  constructor(t) {
    this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (r) => this["~validate"](r)
    };
  }
  optional() {
    return _t.create(this, this._def);
  }
  nullable() {
    return tr.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ct.create(this);
  }
  promise() {
    return rn.create(this, this._def);
  }
  or(t) {
    return Fn.create([this, t], this._def);
  }
  and(t) {
    return Kn.create(this, t, this._def);
  }
  transform(t) {
    return new lt({
      ...oe(this._def),
      schema: this,
      typeName: ne.ZodEffects,
      effect: { type: "transform", transform: t }
    });
  }
  default(t) {
    const r = typeof t == "function" ? t : () => t;
    return new Hn({
      ...oe(this._def),
      innerType: this,
      defaultValue: r,
      typeName: ne.ZodDefault
    });
  }
  brand() {
    return new io({
      typeName: ne.ZodBranded,
      type: this,
      ...oe(this._def)
    });
  }
  catch(t) {
    const r = typeof t == "function" ? t : () => t;
    return new Zn({
      ...oe(this._def),
      innerType: this,
      catchValue: r,
      typeName: ne.ZodCatch
    });
  }
  describe(t) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: t
    });
  }
  pipe(t) {
    return si.create(this, t);
  }
  readonly() {
    return Qn.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const td = /^c[^\s-]{8,}$/i, rd = /^[0-9a-z]+$/, nd = /^[0-9A-HJKMNP-TV-Z]{26}$/i, id = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, ad = /^[a-z0-9_-]{21}$/i, sd = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, od = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, ud = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, cd = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let ls;
const ld = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, fd = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, dd = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, hd = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, pd = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, md = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, xc = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", vd = new RegExp(`^${xc}$`);
function kc(e) {
  let t = "[0-5]\\d";
  e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision == null && (t = `${t}(\\.\\d+)?`);
  const r = e.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${r}`;
}
function yd(e) {
  return new RegExp(`^${kc(e)}$`);
}
function Oc(e) {
  let t = `${xc}T${kc(e)}`;
  const r = [];
  return r.push(e.local ? "Z?" : "Z"), e.offset && r.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${r.join("|")})`, new RegExp(`^${t}$`);
}
function gd(e, t) {
  return !!((t === "v4" || !t) && ld.test(e) || (t === "v6" || !t) && dd.test(e));
}
function bd(e, t) {
  if (!sd.test(e))
    return !1;
  try {
    const [r] = e.split(".");
    if (!r)
      return !1;
    const n = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), i = JSON.parse(atob(n));
    return !(typeof i != "object" || i === null || "typ" in i && (i == null ? void 0 : i.typ) !== "JWT" || !i.alg || t && i.alg !== t);
  } catch {
    return !1;
  }
}
function _d(e, t) {
  return !!((t === "v4" || !t) && fd.test(e) || (t === "v6" || !t) && hd.test(e));
}
class tt extends ue {
  _parse(t) {
    if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== H.string) {
      const s = this._getOrReturnCtx(t);
      return z(s, {
        code: j.invalid_type,
        expected: H.string,
        received: s.parsedType
      }), re;
    }
    const n = new je();
    let i;
    for (const s of this._def.checks)
      if (s.kind === "min")
        t.data.length < s.value && (i = this._getOrReturnCtx(t, i), z(i, {
          code: j.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "max")
        t.data.length > s.value && (i = this._getOrReturnCtx(t, i), z(i, {
          code: j.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: s.message
        }), n.dirty());
      else if (s.kind === "length") {
        const u = t.data.length > s.value, l = t.data.length < s.value;
        (u || l) && (i = this._getOrReturnCtx(t, i), u ? z(i, {
          code: j.too_big,
          maximum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }) : l && z(i, {
          code: j.too_small,
          minimum: s.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: s.message
        }), n.dirty());
      } else if (s.kind === "email")
        ud.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
          validation: "email",
          code: j.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "emoji")
        ls || (ls = new RegExp(cd, "u")), ls.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
          validation: "emoji",
          code: j.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "uuid")
        id.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
          validation: "uuid",
          code: j.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "nanoid")
        ad.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
          validation: "nanoid",
          code: j.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid")
        td.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
          validation: "cuid",
          code: j.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "cuid2")
        rd.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
          validation: "cuid2",
          code: j.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "ulid")
        nd.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
          validation: "ulid",
          code: j.invalid_string,
          message: s.message
        }), n.dirty());
      else if (s.kind === "url")
        try {
          new URL(t.data);
        } catch {
          i = this._getOrReturnCtx(t, i), z(i, {
            validation: "url",
            code: j.invalid_string,
            message: s.message
          }), n.dirty();
        }
      else s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
        validation: "regex",
        code: j.invalid_string,
        message: s.message
      }), n.dirty())) : s.kind === "trim" ? t.data = t.data.trim() : s.kind === "includes" ? t.data.includes(s.value, s.position) || (i = this._getOrReturnCtx(t, i), z(i, {
        code: j.invalid_string,
        validation: { includes: s.value, position: s.position },
        message: s.message
      }), n.dirty()) : s.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : s.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : s.kind === "startsWith" ? t.data.startsWith(s.value) || (i = this._getOrReturnCtx(t, i), z(i, {
        code: j.invalid_string,
        validation: { startsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "endsWith" ? t.data.endsWith(s.value) || (i = this._getOrReturnCtx(t, i), z(i, {
        code: j.invalid_string,
        validation: { endsWith: s.value },
        message: s.message
      }), n.dirty()) : s.kind === "datetime" ? Oc(s).test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
        code: j.invalid_string,
        validation: "datetime",
        message: s.message
      }), n.dirty()) : s.kind === "date" ? vd.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
        code: j.invalid_string,
        validation: "date",
        message: s.message
      }), n.dirty()) : s.kind === "time" ? yd(s).test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
        code: j.invalid_string,
        validation: "time",
        message: s.message
      }), n.dirty()) : s.kind === "duration" ? od.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
        validation: "duration",
        code: j.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "ip" ? gd(t.data, s.version) || (i = this._getOrReturnCtx(t, i), z(i, {
        validation: "ip",
        code: j.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "jwt" ? bd(t.data, s.alg) || (i = this._getOrReturnCtx(t, i), z(i, {
        validation: "jwt",
        code: j.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "cidr" ? _d(t.data, s.version) || (i = this._getOrReturnCtx(t, i), z(i, {
        validation: "cidr",
        code: j.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64" ? pd.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
        validation: "base64",
        code: j.invalid_string,
        message: s.message
      }), n.dirty()) : s.kind === "base64url" ? md.test(t.data) || (i = this._getOrReturnCtx(t, i), z(i, {
        validation: "base64url",
        code: j.invalid_string,
        message: s.message
      }), n.dirty()) : pe.assertNever(s);
    return { status: n.value, value: t.data };
  }
  _regex(t, r, n) {
    return this.refinement((i) => t.test(i), {
      validation: r,
      code: j.invalid_string,
      ...Y.errToObj(n)
    });
  }
  _addCheck(t) {
    return new tt({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...Y.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...Y.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ...Y.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...Y.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: "nanoid", ...Y.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...Y.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...Y.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ...Y.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: "base64", ...Y.errToObj(t) });
  }
  base64url(t) {
    return this._addCheck({
      kind: "base64url",
      ...Y.errToObj(t)
    });
  }
  jwt(t) {
    return this._addCheck({ kind: "jwt", ...Y.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ...Y.errToObj(t) });
  }
  cidr(t) {
    return this._addCheck({ kind: "cidr", ...Y.errToObj(t) });
  }
  datetime(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: t
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      offset: (t == null ? void 0 : t.offset) ?? !1,
      local: (t == null ? void 0 : t.local) ?? !1,
      ...Y.errToObj(t == null ? void 0 : t.message)
    });
  }
  date(t) {
    return this._addCheck({ kind: "date", message: t });
  }
  time(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: t
    }) : this._addCheck({
      kind: "time",
      precision: typeof (t == null ? void 0 : t.precision) > "u" ? null : t == null ? void 0 : t.precision,
      ...Y.errToObj(t == null ? void 0 : t.message)
    });
  }
  duration(t) {
    return this._addCheck({ kind: "duration", ...Y.errToObj(t) });
  }
  regex(t, r) {
    return this._addCheck({
      kind: "regex",
      regex: t,
      ...Y.errToObj(r)
    });
  }
  includes(t, r) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: r == null ? void 0 : r.position,
      ...Y.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(t, r) {
    return this._addCheck({
      kind: "startsWith",
      value: t,
      ...Y.errToObj(r)
    });
  }
  endsWith(t, r) {
    return this._addCheck({
      kind: "endsWith",
      value: t,
      ...Y.errToObj(r)
    });
  }
  min(t, r) {
    return this._addCheck({
      kind: "min",
      value: t,
      ...Y.errToObj(r)
    });
  }
  max(t, r) {
    return this._addCheck({
      kind: "max",
      value: t,
      ...Y.errToObj(r)
    });
  }
  length(t, r) {
    return this._addCheck({
      kind: "length",
      value: t,
      ...Y.errToObj(r)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(t) {
    return this.min(1, Y.errToObj(t));
  }
  trim() {
    return new tt({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new tt({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new tt({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((t) => t.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((t) => t.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((t) => t.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((t) => t.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((t) => t.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((t) => t.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((t) => t.kind === "base64url");
  }
  get minLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
}
tt.create = (e) => new tt({
  checks: [],
  typeName: ne.ZodString,
  coerce: (e == null ? void 0 : e.coerce) ?? !1,
  ...oe(e)
});
function wd(e, t) {
  const r = (e.toString().split(".")[1] || "").length, n = (t.toString().split(".")[1] || "").length, i = r > n ? r : n, s = Number.parseInt(e.toFixed(i).replace(".", "")), u = Number.parseInt(t.toFixed(i).replace(".", ""));
  return s % u / 10 ** i;
}
class Mt extends ue {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== H.number) {
      const s = this._getOrReturnCtx(t);
      return z(s, {
        code: j.invalid_type,
        expected: H.number,
        received: s.parsedType
      }), re;
    }
    let n;
    const i = new je();
    for (const s of this._def.checks)
      s.kind === "int" ? pe.isInteger(t.data) || (n = this._getOrReturnCtx(t, n), z(n, {
        code: j.invalid_type,
        expected: "integer",
        received: "float",
        message: s.message
      }), i.dirty()) : s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (n = this._getOrReturnCtx(t, n), z(n, {
        code: j.too_small,
        minimum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), i.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (n = this._getOrReturnCtx(t, n), z(n, {
        code: j.too_big,
        maximum: s.value,
        type: "number",
        inclusive: s.inclusive,
        exact: !1,
        message: s.message
      }), i.dirty()) : s.kind === "multipleOf" ? wd(t.data, s.value) !== 0 && (n = this._getOrReturnCtx(t, n), z(n, {
        code: j.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), i.dirty()) : s.kind === "finite" ? Number.isFinite(t.data) || (n = this._getOrReturnCtx(t, n), z(n, {
        code: j.not_finite,
        message: s.message
      }), i.dirty()) : pe.assertNever(s);
    return { status: i.value, value: t.data };
  }
  gte(t, r) {
    return this.setLimit("min", t, !0, Y.toString(r));
  }
  gt(t, r) {
    return this.setLimit("min", t, !1, Y.toString(r));
  }
  lte(t, r) {
    return this.setLimit("max", t, !0, Y.toString(r));
  }
  lt(t, r) {
    return this.setLimit("max", t, !1, Y.toString(r));
  }
  setLimit(t, r, n, i) {
    return new Mt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: r,
          inclusive: n,
          message: Y.toString(i)
        }
      ]
    });
  }
  _addCheck(t) {
    return new Mt({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(t) {
    return this._addCheck({
      kind: "int",
      message: Y.toString(t)
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: Y.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: Y.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: Y.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: Y.toString(t)
    });
  }
  multipleOf(t, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: Y.toString(r)
    });
  }
  finite(t) {
    return this._addCheck({
      kind: "finite",
      message: Y.toString(t)
    });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: Y.toString(t)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: Y.toString(t)
    });
  }
  get minValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && pe.isInteger(t.value));
  }
  get isFinite() {
    let t = null, r = null;
    for (const n of this._def.checks) {
      if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
        return !0;
      n.kind === "min" ? (r === null || n.value > r) && (r = n.value) : n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    }
    return Number.isFinite(r) && Number.isFinite(t);
  }
}
Mt.create = (e) => new Mt({
  checks: [],
  typeName: ne.ZodNumber,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...oe(e)
});
class Xt extends ue {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(t) {
    if (this._def.coerce)
      try {
        t.data = BigInt(t.data);
      } catch {
        return this._getInvalidInput(t);
      }
    if (this._getType(t) !== H.bigint)
      return this._getInvalidInput(t);
    let n;
    const i = new je();
    for (const s of this._def.checks)
      s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (n = this._getOrReturnCtx(t, n), z(n, {
        code: j.too_small,
        type: "bigint",
        minimum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), i.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (n = this._getOrReturnCtx(t, n), z(n, {
        code: j.too_big,
        type: "bigint",
        maximum: s.value,
        inclusive: s.inclusive,
        message: s.message
      }), i.dirty()) : s.kind === "multipleOf" ? t.data % s.value !== BigInt(0) && (n = this._getOrReturnCtx(t, n), z(n, {
        code: j.not_multiple_of,
        multipleOf: s.value,
        message: s.message
      }), i.dirty()) : pe.assertNever(s);
    return { status: i.value, value: t.data };
  }
  _getInvalidInput(t) {
    const r = this._getOrReturnCtx(t);
    return z(r, {
      code: j.invalid_type,
      expected: H.bigint,
      received: r.parsedType
    }), re;
  }
  gte(t, r) {
    return this.setLimit("min", t, !0, Y.toString(r));
  }
  gt(t, r) {
    return this.setLimit("min", t, !1, Y.toString(r));
  }
  lte(t, r) {
    return this.setLimit("max", t, !0, Y.toString(r));
  }
  lt(t, r) {
    return this.setLimit("max", t, !1, Y.toString(r));
  }
  setLimit(t, r, n, i) {
    return new Xt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: r,
          inclusive: n,
          message: Y.toString(i)
        }
      ]
    });
  }
  _addCheck(t) {
    return new Xt({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: Y.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: Y.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: Y.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: Y.toString(t)
    });
  }
  multipleOf(t, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: Y.toString(r)
    });
  }
  get minValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t;
  }
}
Xt.create = (e) => new Xt({
  checks: [],
  typeName: ne.ZodBigInt,
  coerce: (e == null ? void 0 : e.coerce) ?? !1,
  ...oe(e)
});
class en extends ue {
  _parse(t) {
    if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== H.boolean) {
      const n = this._getOrReturnCtx(t);
      return z(n, {
        code: j.invalid_type,
        expected: H.boolean,
        received: n.parsedType
      }), re;
    }
    return Ke(t.data);
  }
}
en.create = (e) => new en({
  typeName: ne.ZodBoolean,
  coerce: (e == null ? void 0 : e.coerce) || !1,
  ...oe(e)
});
class Cr extends ue {
  _parse(t) {
    if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== H.date) {
      const s = this._getOrReturnCtx(t);
      return z(s, {
        code: j.invalid_type,
        expected: H.date,
        received: s.parsedType
      }), re;
    }
    if (Number.isNaN(t.data.getTime())) {
      const s = this._getOrReturnCtx(t);
      return z(s, {
        code: j.invalid_date
      }), re;
    }
    const n = new je();
    let i;
    for (const s of this._def.checks)
      s.kind === "min" ? t.data.getTime() < s.value && (i = this._getOrReturnCtx(t, i), z(i, {
        code: j.too_small,
        message: s.message,
        inclusive: !0,
        exact: !1,
        minimum: s.value,
        type: "date"
      }), n.dirty()) : s.kind === "max" ? t.data.getTime() > s.value && (i = this._getOrReturnCtx(t, i), z(i, {
        code: j.too_big,
        message: s.message,
        inclusive: !0,
        exact: !1,
        maximum: s.value,
        type: "date"
      }), n.dirty()) : pe.assertNever(s);
    return {
      status: n.value,
      value: new Date(t.data.getTime())
    };
  }
  _addCheck(t) {
    return new Cr({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(t, r) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: Y.toString(r)
    });
  }
  max(t, r) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: Y.toString(r)
    });
  }
  get minDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "min" && (t === null || r.value > t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const r of this._def.checks)
      r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    return t != null ? new Date(t) : null;
  }
}
Cr.create = (e) => new Cr({
  checks: [],
  coerce: (e == null ? void 0 : e.coerce) || !1,
  typeName: ne.ZodDate,
  ...oe(e)
});
class Yi extends ue {
  _parse(t) {
    if (this._getType(t) !== H.symbol) {
      const n = this._getOrReturnCtx(t);
      return z(n, {
        code: j.invalid_type,
        expected: H.symbol,
        received: n.parsedType
      }), re;
    }
    return Ke(t.data);
  }
}
Yi.create = (e) => new Yi({
  typeName: ne.ZodSymbol,
  ...oe(e)
});
class Ln extends ue {
  _parse(t) {
    if (this._getType(t) !== H.undefined) {
      const n = this._getOrReturnCtx(t);
      return z(n, {
        code: j.invalid_type,
        expected: H.undefined,
        received: n.parsedType
      }), re;
    }
    return Ke(t.data);
  }
}
Ln.create = (e) => new Ln({
  typeName: ne.ZodUndefined,
  ...oe(e)
});
class qn extends ue {
  _parse(t) {
    if (this._getType(t) !== H.null) {
      const n = this._getOrReturnCtx(t);
      return z(n, {
        code: j.invalid_type,
        expected: H.null,
        received: n.parsedType
      }), re;
    }
    return Ke(t.data);
  }
}
qn.create = (e) => new qn({
  typeName: ne.ZodNull,
  ...oe(e)
});
class tn extends ue {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(t) {
    return Ke(t.data);
  }
}
tn.create = (e) => new tn({
  typeName: ne.ZodAny,
  ...oe(e)
});
class wr extends ue {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(t) {
    return Ke(t.data);
  }
}
wr.create = (e) => new wr({
  typeName: ne.ZodUnknown,
  ...oe(e)
});
class Nt extends ue {
  _parse(t) {
    const r = this._getOrReturnCtx(t);
    return z(r, {
      code: j.invalid_type,
      expected: H.never,
      received: r.parsedType
    }), re;
  }
}
Nt.create = (e) => new Nt({
  typeName: ne.ZodNever,
  ...oe(e)
});
class Ji extends ue {
  _parse(t) {
    if (this._getType(t) !== H.undefined) {
      const n = this._getOrReturnCtx(t);
      return z(n, {
        code: j.invalid_type,
        expected: H.void,
        received: n.parsedType
      }), re;
    }
    return Ke(t.data);
  }
}
Ji.create = (e) => new Ji({
  typeName: ne.ZodVoid,
  ...oe(e)
});
class ct extends ue {
  _parse(t) {
    const { ctx: r, status: n } = this._processInputParams(t), i = this._def;
    if (r.parsedType !== H.array)
      return z(r, {
        code: j.invalid_type,
        expected: H.array,
        received: r.parsedType
      }), re;
    if (i.exactLength !== null) {
      const u = r.data.length > i.exactLength.value, l = r.data.length < i.exactLength.value;
      (u || l) && (z(r, {
        code: u ? j.too_big : j.too_small,
        minimum: l ? i.exactLength.value : void 0,
        maximum: u ? i.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: i.exactLength.message
      }), n.dirty());
    }
    if (i.minLength !== null && r.data.length < i.minLength.value && (z(r, {
      code: j.too_small,
      minimum: i.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.minLength.message
    }), n.dirty()), i.maxLength !== null && r.data.length > i.maxLength.value && (z(r, {
      code: j.too_big,
      maximum: i.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: i.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((u, l) => i.type._parseAsync(new wt(r, u, r.path, l)))).then((u) => je.mergeArray(n, u));
    const s = [...r.data].map((u, l) => i.type._parseSync(new wt(r, u, r.path, l)));
    return je.mergeArray(n, s);
  }
  get element() {
    return this._def.type;
  }
  min(t, r) {
    return new ct({
      ...this._def,
      minLength: { value: t, message: Y.toString(r) }
    });
  }
  max(t, r) {
    return new ct({
      ...this._def,
      maxLength: { value: t, message: Y.toString(r) }
    });
  }
  length(t, r) {
    return new ct({
      ...this._def,
      exactLength: { value: t, message: Y.toString(r) }
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
ct.create = (e, t) => new ct({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: ne.ZodArray,
  ...oe(t)
});
function Ur(e) {
  if (e instanceof xe) {
    const t = {};
    for (const r in e.shape) {
      const n = e.shape[r];
      t[r] = _t.create(Ur(n));
    }
    return new xe({
      ...e._def,
      shape: () => t
    });
  } else return e instanceof ct ? new ct({
    ...e._def,
    type: Ur(e.element)
  }) : e instanceof _t ? _t.create(Ur(e.unwrap())) : e instanceof tr ? tr.create(Ur(e.unwrap())) : e instanceof xt ? xt.create(e.items.map((t) => Ur(t))) : e;
}
class xe extends ue {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const t = this._def.shape(), r = pe.objectKeys(t);
    return this._cached = { shape: t, keys: r }, this._cached;
  }
  _parse(t) {
    if (this._getType(t) !== H.object) {
      const m = this._getOrReturnCtx(t);
      return z(m, {
        code: j.invalid_type,
        expected: H.object,
        received: m.parsedType
      }), re;
    }
    const { status: n, ctx: i } = this._processInputParams(t), { shape: s, keys: u } = this._getCached(), l = [];
    if (!(this._def.catchall instanceof Nt && this._def.unknownKeys === "strip"))
      for (const m in i.data)
        u.includes(m) || l.push(m);
    const d = [];
    for (const m of u) {
      const v = s[m], _ = i.data[m];
      d.push({
        key: { status: "valid", value: m },
        value: v._parse(new wt(i, _, i.path, m)),
        alwaysSet: m in i.data
      });
    }
    if (this._def.catchall instanceof Nt) {
      const m = this._def.unknownKeys;
      if (m === "passthrough")
        for (const v of l)
          d.push({
            key: { status: "valid", value: v },
            value: { status: "valid", value: i.data[v] }
          });
      else if (m === "strict")
        l.length > 0 && (z(i, {
          code: j.unrecognized_keys,
          keys: l
        }), n.dirty());
      else if (m !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const m = this._def.catchall;
      for (const v of l) {
        const _ = i.data[v];
        d.push({
          key: { status: "valid", value: v },
          value: m._parse(
            new wt(i, _, i.path, v)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: v in i.data
        });
      }
    }
    return i.common.async ? Promise.resolve().then(async () => {
      const m = [];
      for (const v of d) {
        const _ = await v.key, C = await v.value;
        m.push({
          key: _,
          value: C,
          alwaysSet: v.alwaysSet
        });
      }
      return m;
    }).then((m) => je.mergeObjectSync(n, m)) : je.mergeObjectSync(n, d);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return Y.errToObj, new xe({
      ...this._def,
      unknownKeys: "strict",
      ...t !== void 0 ? {
        errorMap: (r, n) => {
          var s, u;
          const i = ((u = (s = this._def).errorMap) == null ? void 0 : u.call(s, r, n).message) ?? n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: Y.errToObj(t).message ?? i
          } : {
            message: i
          };
        }
      } : {}
    });
  }
  strip() {
    return new xe({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new xe({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(t) {
    return new xe({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...t
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(t) {
    return new xe({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...t._def.shape()
      }),
      typeName: ne.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(t, r) {
    return this.augment({ [t]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(t) {
    return new xe({
      ...this._def,
      catchall: t
    });
  }
  pick(t) {
    const r = {};
    for (const n of pe.objectKeys(t))
      t[n] && this.shape[n] && (r[n] = this.shape[n]);
    return new xe({
      ...this._def,
      shape: () => r
    });
  }
  omit(t) {
    const r = {};
    for (const n of pe.objectKeys(this.shape))
      t[n] || (r[n] = this.shape[n]);
    return new xe({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return Ur(this);
  }
  partial(t) {
    const r = {};
    for (const n of pe.objectKeys(this.shape)) {
      const i = this.shape[n];
      t && !t[n] ? r[n] = i : r[n] = i.optional();
    }
    return new xe({
      ...this._def,
      shape: () => r
    });
  }
  required(t) {
    const r = {};
    for (const n of pe.objectKeys(this.shape))
      if (t && !t[n])
        r[n] = this.shape[n];
      else {
        let s = this.shape[n];
        for (; s instanceof _t; )
          s = s._def.innerType;
        r[n] = s;
      }
    return new xe({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return Sc(pe.objectKeys(this.shape));
  }
}
xe.create = (e, t) => new xe({
  shape: () => e,
  unknownKeys: "strip",
  catchall: Nt.create(),
  typeName: ne.ZodObject,
  ...oe(t)
});
xe.strictCreate = (e, t) => new xe({
  shape: () => e,
  unknownKeys: "strict",
  catchall: Nt.create(),
  typeName: ne.ZodObject,
  ...oe(t)
});
xe.lazycreate = (e, t) => new xe({
  shape: e,
  unknownKeys: "strip",
  catchall: Nt.create(),
  typeName: ne.ZodObject,
  ...oe(t)
});
class Fn extends ue {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), n = this._def.options;
    function i(s) {
      for (const l of s)
        if (l.result.status === "valid")
          return l.result;
      for (const l of s)
        if (l.result.status === "dirty")
          return r.common.issues.push(...l.ctx.common.issues), l.result;
      const u = s.map((l) => new Ge(l.ctx.common.issues));
      return z(r, {
        code: j.invalid_union,
        unionErrors: u
      }), re;
    }
    if (r.common.async)
      return Promise.all(n.map(async (s) => {
        const u = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await s._parseAsync({
            data: r.data,
            path: r.path,
            parent: u
          }),
          ctx: u
        };
      })).then(i);
    {
      let s;
      const u = [];
      for (const d of n) {
        const m = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, v = d._parseSync({
          data: r.data,
          path: r.path,
          parent: m
        });
        if (v.status === "valid")
          return v;
        v.status === "dirty" && !s && (s = { result: v, ctx: m }), m.common.issues.length && u.push(m.common.issues);
      }
      if (s)
        return r.common.issues.push(...s.ctx.common.issues), s.result;
      const l = u.map((d) => new Ge(d));
      return z(r, {
        code: j.invalid_union,
        unionErrors: l
      }), re;
    }
  }
  get options() {
    return this._def.options;
  }
}
Fn.create = (e, t) => new Fn({
  options: e,
  typeName: ne.ZodUnion,
  ...oe(t)
});
const Rt = (e) => e instanceof Wn ? Rt(e.schema) : e instanceof lt ? Rt(e.innerType()) : e instanceof zn ? [e.value] : e instanceof er ? e.options : e instanceof Vn ? pe.objectValues(e.enum) : e instanceof Hn ? Rt(e._def.innerType) : e instanceof Ln ? [void 0] : e instanceof qn ? [null] : e instanceof _t ? [void 0, ...Rt(e.unwrap())] : e instanceof tr ? [null, ...Rt(e.unwrap())] : e instanceof io || e instanceof Qn ? Rt(e.unwrap()) : e instanceof Zn ? Rt(e._def.innerType) : [];
class da extends ue {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== H.object)
      return z(r, {
        code: j.invalid_type,
        expected: H.object,
        received: r.parsedType
      }), re;
    const n = this.discriminator, i = r.data[n], s = this.optionsMap.get(i);
    return s ? r.common.async ? s._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : s._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (z(r, {
      code: j.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [n]
    }), re);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(t, r, n) {
    const i = /* @__PURE__ */ new Map();
    for (const s of r) {
      const u = Rt(s.shape[t]);
      if (!u.length)
        throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
      for (const l of u) {
        if (i.has(l))
          throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(l)}`);
        i.set(l, s);
      }
    }
    return new da({
      typeName: ne.ZodDiscriminatedUnion,
      discriminator: t,
      options: r,
      optionsMap: i,
      ...oe(n)
    });
  }
}
function Ms(e, t) {
  const r = Dt(e), n = Dt(t);
  if (e === t)
    return { valid: !0, data: e };
  if (r === H.object && n === H.object) {
    const i = pe.objectKeys(t), s = pe.objectKeys(e).filter((l) => i.indexOf(l) !== -1), u = { ...e, ...t };
    for (const l of s) {
      const d = Ms(e[l], t[l]);
      if (!d.valid)
        return { valid: !1 };
      u[l] = d.data;
    }
    return { valid: !0, data: u };
  } else if (r === H.array && n === H.array) {
    if (e.length !== t.length)
      return { valid: !1 };
    const i = [];
    for (let s = 0; s < e.length; s++) {
      const u = e[s], l = t[s], d = Ms(u, l);
      if (!d.valid)
        return { valid: !1 };
      i.push(d.data);
    }
    return { valid: !0, data: i };
  } else return r === H.date && n === H.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
class Kn extends ue {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t), i = (s, u) => {
      if (Ts(s) || Ts(u))
        return re;
      const l = Ms(s.value, u.value);
      return l.valid ? ((As(s) || As(u)) && r.dirty(), { status: r.value, value: l.data }) : (z(n, {
        code: j.invalid_intersection_types
      }), re);
    };
    return n.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }),
      this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      })
    ]).then(([s, u]) => i(s, u)) : i(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}
Kn.create = (e, t, r) => new Kn({
  left: e,
  right: t,
  typeName: ne.ZodIntersection,
  ...oe(r)
});
class xt extends ue {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== H.array)
      return z(n, {
        code: j.invalid_type,
        expected: H.array,
        received: n.parsedType
      }), re;
    if (n.data.length < this._def.items.length)
      return z(n, {
        code: j.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), re;
    !this._def.rest && n.data.length > this._def.items.length && (z(n, {
      code: j.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const s = [...n.data].map((u, l) => {
      const d = this._def.items[l] || this._def.rest;
      return d ? d._parse(new wt(n, u, n.path, l)) : null;
    }).filter((u) => !!u);
    return n.common.async ? Promise.all(s).then((u) => je.mergeArray(r, u)) : je.mergeArray(r, s);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new xt({
      ...this._def,
      rest: t
    });
  }
}
xt.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new xt({
    items: e,
    typeName: ne.ZodTuple,
    rest: null,
    ...oe(t)
  });
};
class Un extends ue {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== H.object)
      return z(n, {
        code: j.invalid_type,
        expected: H.object,
        received: n.parsedType
      }), re;
    const i = [], s = this._def.keyType, u = this._def.valueType;
    for (const l in n.data)
      i.push({
        key: s._parse(new wt(n, l, n.path, l)),
        value: u._parse(new wt(n, n.data[l], n.path, l)),
        alwaysSet: l in n.data
      });
    return n.common.async ? je.mergeObjectAsync(r, i) : je.mergeObjectSync(r, i);
  }
  get element() {
    return this._def.valueType;
  }
  static create(t, r, n) {
    return r instanceof ue ? new Un({
      keyType: t,
      valueType: r,
      typeName: ne.ZodRecord,
      ...oe(n)
    }) : new Un({
      keyType: tt.create(),
      valueType: t,
      typeName: ne.ZodRecord,
      ...oe(r)
    });
  }
}
class Xi extends ue {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== H.map)
      return z(n, {
        code: j.invalid_type,
        expected: H.map,
        received: n.parsedType
      }), re;
    const i = this._def.keyType, s = this._def.valueType, u = [...n.data.entries()].map(([l, d], m) => ({
      key: i._parse(new wt(n, l, n.path, [m, "key"])),
      value: s._parse(new wt(n, d, n.path, [m, "value"]))
    }));
    if (n.common.async) {
      const l = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const d of u) {
          const m = await d.key, v = await d.value;
          if (m.status === "aborted" || v.status === "aborted")
            return re;
          (m.status === "dirty" || v.status === "dirty") && r.dirty(), l.set(m.value, v.value);
        }
        return { status: r.value, value: l };
      });
    } else {
      const l = /* @__PURE__ */ new Map();
      for (const d of u) {
        const m = d.key, v = d.value;
        if (m.status === "aborted" || v.status === "aborted")
          return re;
        (m.status === "dirty" || v.status === "dirty") && r.dirty(), l.set(m.value, v.value);
      }
      return { status: r.value, value: l };
    }
  }
}
Xi.create = (e, t, r) => new Xi({
  valueType: t,
  keyType: e,
  typeName: ne.ZodMap,
  ...oe(r)
});
class Rr extends ue {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.parsedType !== H.set)
      return z(n, {
        code: j.invalid_type,
        expected: H.set,
        received: n.parsedType
      }), re;
    const i = this._def;
    i.minSize !== null && n.data.size < i.minSize.value && (z(n, {
      code: j.too_small,
      minimum: i.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.minSize.message
    }), r.dirty()), i.maxSize !== null && n.data.size > i.maxSize.value && (z(n, {
      code: j.too_big,
      maximum: i.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: i.maxSize.message
    }), r.dirty());
    const s = this._def.valueType;
    function u(d) {
      const m = /* @__PURE__ */ new Set();
      for (const v of d) {
        if (v.status === "aborted")
          return re;
        v.status === "dirty" && r.dirty(), m.add(v.value);
      }
      return { status: r.value, value: m };
    }
    const l = [...n.data.values()].map((d, m) => s._parse(new wt(n, d, n.path, m)));
    return n.common.async ? Promise.all(l).then((d) => u(d)) : u(l);
  }
  min(t, r) {
    return new Rr({
      ...this._def,
      minSize: { value: t, message: Y.toString(r) }
    });
  }
  max(t, r) {
    return new Rr({
      ...this._def,
      maxSize: { value: t, message: Y.toString(r) }
    });
  }
  size(t, r) {
    return this.min(t, r).max(t, r);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Rr.create = (e, t) => new Rr({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: ne.ZodSet,
  ...oe(t)
});
class Hr extends ue {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== H.function)
      return z(r, {
        code: j.invalid_type,
        expected: H.function,
        received: r.parsedType
      }), re;
    function n(l, d) {
      return Gi({
        data: l,
        path: r.path,
        errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, Qi(), Xr].filter((m) => !!m),
        issueData: {
          code: j.invalid_arguments,
          argumentsError: d
        }
      });
    }
    function i(l, d) {
      return Gi({
        data: l,
        path: r.path,
        errorMaps: [r.common.contextualErrorMap, r.schemaErrorMap, Qi(), Xr].filter((m) => !!m),
        issueData: {
          code: j.invalid_return_type,
          returnTypeError: d
        }
      });
    }
    const s = { errorMap: r.common.contextualErrorMap }, u = r.data;
    if (this._def.returns instanceof rn) {
      const l = this;
      return Ke(async function(...d) {
        const m = new Ge([]), v = await l._def.args.parseAsync(d, s).catch((I) => {
          throw m.addIssue(n(d, I)), m;
        }), _ = await Reflect.apply(u, this, v);
        return await l._def.returns._def.type.parseAsync(_, s).catch((I) => {
          throw m.addIssue(i(_, I)), m;
        });
      });
    } else {
      const l = this;
      return Ke(function(...d) {
        const m = l._def.args.safeParse(d, s);
        if (!m.success)
          throw new Ge([n(d, m.error)]);
        const v = Reflect.apply(u, this, m.data), _ = l._def.returns.safeParse(v, s);
        if (!_.success)
          throw new Ge([i(v, _.error)]);
        return _.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...t) {
    return new Hr({
      ...this._def,
      args: xt.create(t).rest(wr.create())
    });
  }
  returns(t) {
    return new Hr({
      ...this._def,
      returns: t
    });
  }
  implement(t) {
    return this.parse(t);
  }
  strictImplement(t) {
    return this.parse(t);
  }
  static create(t, r, n) {
    return new Hr({
      args: t || xt.create([]).rest(wr.create()),
      returns: r || wr.create(),
      typeName: ne.ZodFunction,
      ...oe(n)
    });
  }
}
class Wn extends ue {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
Wn.create = (e, t) => new Wn({
  getter: e,
  typeName: ne.ZodLazy,
  ...oe(t)
});
class zn extends ue {
  _parse(t) {
    if (t.data !== this._def.value) {
      const r = this._getOrReturnCtx(t);
      return z(r, {
        received: r.data,
        code: j.invalid_literal,
        expected: this._def.value
      }), re;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
zn.create = (e, t) => new zn({
  value: e,
  typeName: ne.ZodLiteral,
  ...oe(t)
});
function Sc(e, t) {
  return new er({
    values: e,
    typeName: ne.ZodEnum,
    ...oe(t)
  });
}
class er extends ue {
  _parse(t) {
    if (typeof t.data != "string") {
      const r = this._getOrReturnCtx(t), n = this._def.values;
      return z(r, {
        expected: pe.joinValues(n),
        received: r.parsedType,
        code: j.invalid_type
      }), re;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(t.data)) {
      const r = this._getOrReturnCtx(t), n = this._def.values;
      return z(r, {
        received: r.data,
        code: j.invalid_enum_value,
        options: n
      }), re;
    }
    return Ke(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  get Values() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  get Enum() {
    const t = {};
    for (const r of this._def.values)
      t[r] = r;
    return t;
  }
  extract(t, r = this._def) {
    return er.create(t, {
      ...this._def,
      ...r
    });
  }
  exclude(t, r = this._def) {
    return er.create(this.options.filter((n) => !t.includes(n)), {
      ...this._def,
      ...r
    });
  }
}
er.create = Sc;
class Vn extends ue {
  _parse(t) {
    const r = pe.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(t);
    if (n.parsedType !== H.string && n.parsedType !== H.number) {
      const i = pe.objectValues(r);
      return z(n, {
        expected: pe.joinValues(i),
        received: n.parsedType,
        code: j.invalid_type
      }), re;
    }
    if (this._cache || (this._cache = new Set(pe.getValidEnumValues(this._def.values))), !this._cache.has(t.data)) {
      const i = pe.objectValues(r);
      return z(n, {
        received: n.data,
        code: j.invalid_enum_value,
        options: i
      }), re;
    }
    return Ke(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
Vn.create = (e, t) => new Vn({
  values: e,
  typeName: ne.ZodNativeEnum,
  ...oe(t)
});
class rn extends ue {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    if (r.parsedType !== H.promise && r.common.async === !1)
      return z(r, {
        code: j.invalid_type,
        expected: H.promise,
        received: r.parsedType
      }), re;
    const n = r.parsedType === H.promise ? r.data : Promise.resolve(r.data);
    return Ke(n.then((i) => this._def.type.parseAsync(i, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
rn.create = (e, t) => new rn({
  type: e,
  typeName: ne.ZodPromise,
  ...oe(t)
});
class lt extends ue {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ne.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t), i = this._def.effect || null, s = {
      addIssue: (u) => {
        z(n, u), u.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (s.addIssue = s.addIssue.bind(s), i.type === "preprocess") {
      const u = i.transform(n.data, s);
      if (n.common.async)
        return Promise.resolve(u).then(async (l) => {
          if (r.value === "aborted")
            return re;
          const d = await this._def.schema._parseAsync({
            data: l,
            path: n.path,
            parent: n
          });
          return d.status === "aborted" ? re : d.status === "dirty" || r.value === "dirty" ? Wr(d.value) : d;
        });
      {
        if (r.value === "aborted")
          return re;
        const l = this._def.schema._parseSync({
          data: u,
          path: n.path,
          parent: n
        });
        return l.status === "aborted" ? re : l.status === "dirty" || r.value === "dirty" ? Wr(l.value) : l;
      }
    }
    if (i.type === "refinement") {
      const u = (l) => {
        const d = i.refinement(l, s);
        if (n.common.async)
          return Promise.resolve(d);
        if (d instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return l;
      };
      if (n.common.async === !1) {
        const l = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return l.status === "aborted" ? re : (l.status === "dirty" && r.dirty(), u(l.value), { status: r.value, value: l.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((l) => l.status === "aborted" ? re : (l.status === "dirty" && r.dirty(), u(l.value).then(() => ({ status: r.value, value: l.value }))));
    }
    if (i.type === "transform")
      if (n.common.async === !1) {
        const u = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!Er(u))
          return re;
        const l = i.transform(u.value, s);
        if (l instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: l };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((u) => Er(u) ? Promise.resolve(i.transform(u.value, s)).then((l) => ({
          status: r.value,
          value: l
        })) : re);
    pe.assertNever(i);
  }
}
lt.create = (e, t, r) => new lt({
  schema: e,
  typeName: ne.ZodEffects,
  effect: t,
  ...oe(r)
});
lt.createWithPreprocess = (e, t, r) => new lt({
  schema: t,
  effect: { type: "preprocess", transform: e },
  typeName: ne.ZodEffects,
  ...oe(r)
});
class _t extends ue {
  _parse(t) {
    return this._getType(t) === H.undefined ? Ke(void 0) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
_t.create = (e, t) => new _t({
  innerType: e,
  typeName: ne.ZodOptional,
  ...oe(t)
});
class tr extends ue {
  _parse(t) {
    return this._getType(t) === H.null ? Ke(null) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
tr.create = (e, t) => new tr({
  innerType: e,
  typeName: ne.ZodNullable,
  ...oe(t)
});
class Hn extends ue {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t);
    let n = r.data;
    return r.parsedType === H.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Hn.create = (e, t) => new Hn({
  innerType: e,
  typeName: ne.ZodDefault,
  defaultValue: typeof t.default == "function" ? t.default : () => t.default,
  ...oe(t)
});
class Zn extends ue {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), n = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, i = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return jn(i) ? i.then((s) => ({
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Ge(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new Ge(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Zn.create = (e, t) => new Zn({
  innerType: e,
  typeName: ne.ZodCatch,
  catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
  ...oe(t)
});
class ea extends ue {
  _parse(t) {
    if (this._getType(t) !== H.nan) {
      const n = this._getOrReturnCtx(t);
      return z(n, {
        code: j.invalid_type,
        expected: H.nan,
        received: n.parsedType
      }), re;
    }
    return { status: "valid", value: t.data };
  }
}
ea.create = (e) => new ea({
  typeName: ne.ZodNaN,
  ...oe(e)
});
const xd = Symbol("zod_brand");
class io extends ue {
  _parse(t) {
    const { ctx: r } = this._processInputParams(t), n = r.data;
    return this._def.type._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class si extends ue {
  _parse(t) {
    const { status: r, ctx: n } = this._processInputParams(t);
    if (n.common.async)
      return (async () => {
        const s = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return s.status === "aborted" ? re : s.status === "dirty" ? (r.dirty(), Wr(s.value)) : this._def.out._parseAsync({
          data: s.value,
          path: n.path,
          parent: n
        });
      })();
    {
      const i = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return i.status === "aborted" ? re : i.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: i.value
      }) : this._def.out._parseSync({
        data: i.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(t, r) {
    return new si({
      in: t,
      out: r,
      typeName: ne.ZodPipeline
    });
  }
}
class Qn extends ue {
  _parse(t) {
    const r = this._def.innerType._parse(t), n = (i) => (Er(i) && (i.value = Object.freeze(i.value)), i);
    return jn(r) ? r.then((i) => n(i)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Qn.create = (e, t) => new Qn({
  innerType: e,
  typeName: ne.ZodReadonly,
  ...oe(t)
});
function wu(e, t) {
  const r = typeof e == "function" ? e(t) : typeof e == "string" ? { message: e } : e;
  return typeof r == "string" ? { message: r } : r;
}
function Ec(e, t = {}, r) {
  return e ? tn.create().superRefine((n, i) => {
    const s = e(n);
    if (s instanceof Promise)
      return s.then((u) => {
        if (!u) {
          const l = wu(t, n), d = l.fatal ?? r ?? !0;
          i.addIssue({ code: "custom", ...l, fatal: d });
        }
      });
    if (!s) {
      const u = wu(t, n), l = u.fatal ?? r ?? !0;
      i.addIssue({ code: "custom", ...u, fatal: l });
    }
  }) : tn.create();
}
const kd = {
  object: xe.lazycreate
};
var ne;
(function(e) {
  e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(ne || (ne = {}));
const Od = (e, t = {
  message: `Input not instance of ${e.name}`
}) => Ec((r) => r instanceof e, t), ze = tt.create, vt = Mt.create, Sd = ea.create, Ed = Xt.create, Cc = en.create, Cd = Cr.create, Rd = Yi.create, Dd = Ln.create, Id = qn.create, ao = tn.create, Pd = wr.create, Td = Nt.create, Ad = Ji.create, so = ct.create, Tr = xe.create, Md = xe.strictCreate, ta = Fn.create, Nd = da.create, Bd = Kn.create, $d = xt.create, oo = Un.create, jd = Xi.create, Ld = Rr.create, qd = Hr.create, Fd = Wn.create, Kd = zn.create, Rc = er.create, Ud = Vn.create, Wd = rn.create, xu = lt.create, zd = _t.create, Vd = tr.create, Hd = lt.createWithPreprocess, Zd = si.create, Qd = () => ze().optional(), Gd = () => vt().optional(), Yd = () => Cc().optional(), Jd = {
  string: (e) => tt.create({ ...e, coerce: !0 }),
  number: (e) => Mt.create({ ...e, coerce: !0 }),
  boolean: (e) => en.create({
    ...e,
    coerce: !0
  }),
  bigint: (e) => Xt.create({ ...e, coerce: !0 }),
  date: (e) => Cr.create({ ...e, coerce: !0 })
}, Xd = re, Bb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BRAND: xd,
  DIRTY: Wr,
  EMPTY_PATH: ed,
  INVALID: re,
  NEVER: Xd,
  OK: Ke,
  ParseStatus: je,
  Schema: ue,
  ZodAny: tn,
  ZodArray: ct,
  ZodBigInt: Xt,
  ZodBoolean: en,
  ZodBranded: io,
  ZodCatch: Zn,
  ZodDate: Cr,
  ZodDefault: Hn,
  ZodDiscriminatedUnion: da,
  ZodEffects: lt,
  ZodEnum: er,
  ZodError: Ge,
  get ZodFirstPartyTypeKind() {
    return ne;
  },
  ZodFunction: Hr,
  ZodIntersection: Kn,
  ZodIssueCode: j,
  ZodLazy: Wn,
  ZodLiteral: zn,
  ZodMap: Xi,
  ZodNaN: ea,
  ZodNativeEnum: Vn,
  ZodNever: Nt,
  ZodNull: qn,
  ZodNullable: tr,
  ZodNumber: Mt,
  ZodObject: xe,
  ZodOptional: _t,
  ZodParsedType: H,
  ZodPipeline: si,
  ZodPromise: rn,
  ZodReadonly: Qn,
  ZodRecord: Un,
  ZodSchema: ue,
  ZodSet: Rr,
  ZodString: tt,
  ZodSymbol: Yi,
  ZodTransformer: lt,
  ZodTuple: xt,
  ZodType: ue,
  ZodUndefined: Ln,
  ZodUnion: Fn,
  ZodUnknown: wr,
  ZodVoid: Ji,
  addIssueToContext: z,
  any: ao,
  array: so,
  bigint: Ed,
  boolean: Cc,
  coerce: Jd,
  custom: Ec,
  date: Cd,
  datetimeRegex: Oc,
  defaultErrorMap: Xr,
  discriminatedUnion: Nd,
  effect: xu,
  enum: Rc,
  function: qd,
  getErrorMap: Qi,
  getParsedType: Dt,
  instanceof: Od,
  intersection: Bd,
  isAborted: Ts,
  isAsync: jn,
  isDirty: As,
  isValid: Er,
  late: kd,
  lazy: Fd,
  literal: Kd,
  makeIssue: Gi,
  map: jd,
  nan: Sd,
  nativeEnum: Ud,
  never: Td,
  null: Id,
  nullable: Vd,
  number: vt,
  object: Tr,
  get objectUtil() {
    return Ps;
  },
  oboolean: Yd,
  onumber: Gd,
  optional: zd,
  ostring: Qd,
  pipeline: Zd,
  preprocess: Hd,
  promise: Wd,
  quotelessJson: Jf,
  record: oo,
  set: Ld,
  setErrorMap: Xf,
  strictObject: Md,
  string: ze,
  symbol: Rd,
  transformer: xu,
  tuple: $d,
  undefined: Dd,
  union: ta,
  unknown: Pd,
  get util() {
    return pe;
  },
  void: Ad
}, Symbol.toStringTag, { value: "Module" }));
function Gn(e) {
  "@babel/helpers - typeof";
  return Gn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Gn(e);
}
function eh(e, t) {
  if (Gn(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (Gn(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function th(e) {
  var t = eh(e, "string");
  return Gn(t) == "symbol" ? t : t + "";
}
function rh(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, th(n.key), n);
  }
}
function ar(e, t, r) {
  return t && rh(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function uo(e) {
  return Array.isArray(e) ? e.slice(0) : [e];
}
function Zr(e) {
  return Array.isArray(e);
}
function nh(e) {
  return e != null;
}
function fs(e, t) {
  var r = 0, n = -1;
  for (var i of e) {
    n = n + 1;
    var s = t(i, n);
    if (s)
      r = r + 1;
    else
      break;
  }
  return r;
}
function nn(e, t) {
  var r = t.length;
  if (r !== 0) {
    var n = e.length;
    e.length = n + t.length;
    for (var i = 0; i < r; ++i)
      e[n + i] = t[i];
  }
}
function ih(e) {
  return e.filter(function(t, r, n) {
    return n.indexOf(t) === r;
  });
}
function Yn(e) {
  for (var t = "", r = 0; r < e.length; r++) {
    var n = e[r];
    if (n === "-")
      return parseInt(t, 10);
    t += n;
  }
  throw new Error("malformatted revision: " + e);
}
function Ns(e, t) {
  var r = t ? Yn(t._rev) + 1 : 1;
  return r + "-" + e;
}
function Dc(e) {
  return Object.freeze(e), Object.getOwnPropertyNames(e).forEach(function(t) {
    Object.prototype.hasOwnProperty.call(e, t) && e[t] !== null && (typeof e[t] == "object" || typeof e[t] == "function") && !Object.isFrozen(e[t]) && Dc(e[t]);
  }), e;
}
function ah(e) {
  var t = e.split("."), r = t.length;
  return r === 1 ? (n) => n[e] : (n) => {
    for (var i = n, s = 0; s < r; ++s) {
      var u = t[s];
      if (i = i[u], typeof i > "u")
        return i;
    }
    return i;
  };
}
function Bs(e) {
  var t = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r))
      if (typeof e[r] == "object") {
        var n = Bs(e[r]);
        for (var i in n)
          Object.prototype.hasOwnProperty.call(n, i) && (t[r + "." + i] = n[i]);
      } else
        t[r] = e[r];
  return t;
}
function Pe(e) {
  return Object.assign({}, e);
}
function sh(e) {
  return Object.keys(e)[0];
}
function ra(e, t = !1) {
  if (!e) return e;
  if (!t && Array.isArray(e))
    return e.sort((n, i) => typeof n == "string" && typeof i == "string" ? n.localeCompare(i) : typeof n == "object" ? 1 : -1).map((n) => ra(n, t));
  if (typeof e == "object" && !Array.isArray(e)) {
    var r = {};
    return Object.keys(e).sort((n, i) => n.localeCompare(i)).forEach((n) => {
      r[n] = ra(e[n], t);
    }), r;
  }
  return e;
}
function $s(e) {
  if (!e || e === null || typeof e != "object")
    return e;
  if (Array.isArray(e)) {
    for (var t = new Array(e.length), r = t.length; r--; )
      t[r] = $s(e[r]);
    return t;
  }
  var n = {};
  for (var i in e)
    n[i] = $s(e[i]);
  return n;
}
var Jn = $s;
function At(e, t, r) {
  return Object.defineProperty(e, t, {
    get: function() {
      return r;
    }
  }), r;
}
var Ic = 1;
function ha() {
  return {
    /**
     * Set this to 1 to not waste performance
     * while calling new Date()..
     * The storage wrappers will anyway update
     * the lastWrite time while calling transformDocumentDataFromRxDBToRxStorage()
     */
    lwt: Ic
  };
}
function pa() {
  return "";
}
function oh(e) {
  return Object.assign({}, e, {
    _meta: void 0,
    _deleted: void 0,
    _rev: void 0
  });
}
function uh(e, t, r) {
  if (t.length !== r.length)
    return !1;
  for (var n = 0, i = t.length; n < i; ) {
    var s = t[n], u = r[n];
    if (n++, s._rev !== u._rev || s[e] !== u[e])
      return !1;
  }
  return !0;
}
var ch = Object.defineProperty, lh = (e, t, r) => t in e ? ch(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, zr = (e, t, r) => (lh(e, typeof t != "symbol" ? t + "" : t, r), r);
class Yt {
  constructor(t, r) {
    zr(this, "words"), zr(this, "sigBytes"), t = this.words = t || [], this.sigBytes = r === void 0 ? t.length * 4 : r;
  }
  toString(t) {
    return (t || fh).stringify(this);
  }
  concat(t) {
    if (this.clamp(), this.sigBytes % 4)
      for (let r = 0; r < t.sigBytes; r++) {
        const n = t.words[r >>> 2] >>> 24 - r % 4 * 8 & 255;
        this.words[this.sigBytes + r >>> 2] |= n << 24 - (this.sigBytes + r) % 4 * 8;
      }
    else
      for (let r = 0; r < t.sigBytes; r += 4)
        this.words[this.sigBytes + r >>> 2] = t.words[r >>> 2];
    return this.sigBytes += t.sigBytes, this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8, this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new Yt([...this.words]);
  }
}
const fh = {
  stringify(e) {
    const t = [];
    for (let r = 0; r < e.sigBytes; r++) {
      const n = e.words[r >>> 2] >>> 24 - r % 4 * 8 & 255;
      t.push((n >>> 4).toString(16), (n & 15).toString(16));
    }
    return t.join("");
  }
}, dh = {
  parse(e) {
    const t = e.length, r = [];
    for (let n = 0; n < t; n++)
      r[n >>> 2] |= (e.charCodeAt(n) & 255) << 24 - n % 4 * 8;
    return new Yt(r, t);
  }
}, hh = {
  parse(e) {
    return dh.parse(unescape(encodeURIComponent(e)));
  }
};
class ph {
  constructor() {
    zr(this, "_data", new Yt()), zr(this, "_nDataBytes", 0), zr(this, "_minBufferSize", 0), zr(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new Yt(), this._nDataBytes = 0;
  }
  _append(t) {
    typeof t == "string" && (t = hh.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
  }
  _doProcessBlock(t, r) {
  }
  _process(t) {
    let r, n = this._data.sigBytes / (this.blockSize * 4);
    t ? n = Math.ceil(n) : n = Math.max((n | 0) - this._minBufferSize, 0);
    const i = n * this.blockSize, s = Math.min(i * 4, this._data.sigBytes);
    if (i) {
      for (let u = 0; u < i; u += this.blockSize)
        this._doProcessBlock(this._data.words, u);
      r = this._data.words.splice(0, i), this._data.sigBytes -= s;
    }
    return new Yt(r, s);
  }
}
class mh extends ph {
  update(t) {
    return this._append(t), this._process(), this;
  }
  finalize(t) {
    t && this._append(t);
  }
}
var vh = Object.defineProperty, yh = (e, t, r) => t in e ? vh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, gh = (e, t, r) => (yh(e, t + "", r), r);
const ku = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
], bh = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
], yr = [];
class _h extends mh {
  constructor() {
    super(...arguments), gh(this, "_hash", new Yt([...ku]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset(), this._hash = new Yt([...ku]);
  }
  _doProcessBlock(t, r) {
    const n = this._hash.words;
    let i = n[0], s = n[1], u = n[2], l = n[3], d = n[4], m = n[5], v = n[6], _ = n[7];
    for (let C = 0; C < 64; C++) {
      if (C < 16)
        yr[C] = t[r + C] | 0;
      else {
        const ee = yr[C - 15], ye = (ee << 25 | ee >>> 7) ^ (ee << 14 | ee >>> 18) ^ ee >>> 3, ae = yr[C - 2], ce = (ae << 15 | ae >>> 17) ^ (ae << 13 | ae >>> 19) ^ ae >>> 10;
        yr[C] = ye + yr[C - 7] + ce + yr[C - 16];
      }
      const I = d & m ^ ~d & v, M = i & s ^ i & u ^ s & u, B = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22), Q = (d << 26 | d >>> 6) ^ (d << 21 | d >>> 11) ^ (d << 7 | d >>> 25), G = _ + Q + I + bh[C] + yr[C], X = B + M;
      _ = v, v = m, m = d, d = l + G | 0, l = u, u = s, s = i, i = G + X | 0;
    }
    n[0] = n[0] + i | 0, n[1] = n[1] + s | 0, n[2] = n[2] + u | 0, n[3] = n[3] + l | 0, n[4] = n[4] + d | 0, n[5] = n[5] + m | 0, n[6] = n[6] + v | 0, n[7] = n[7] + _ | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(t) {
    super.finalize(t);
    const r = this._nDataBytes * 8, n = this._data.sigBytes * 8;
    return this._data.words[n >>> 5] |= 128 << 24 - n % 32, this._data.words[(n + 64 >>> 9 << 4) + 14] = Math.floor(
      r / 4294967296
    ), this._data.words[(n + 64 >>> 9 << 4) + 15] = r, this._data.sigBytes = this._data.words.length * 4, this._process(), this._hash;
  }
}
function wh(e) {
  return new _h().finalize(e).toString();
}
function xh(e) {
  return Promise.resolve(wh(e));
}
async function kh(e) {
  var t = new TextEncoder().encode(e), r = await crypto.subtle.digest("SHA-256", t), n = Array.prototype.map.call(new Uint8Array(r), (i) => ("00" + i.toString(16)).slice(-2)).join("");
  return n;
}
var Oh = typeof crypto < "u" && typeof crypto.subtle < "u" && typeof crypto.subtle.digest == "function", co = Oh ? kh : xh;
function Sh() {
  return new Promise((e) => setTimeout(e, 0));
}
function Eh(e = 0) {
  return new Promise((t) => setTimeout(t, e));
}
Promise.resolve(!0);
var _r = Promise.resolve(!1), Ch = Promise.resolve(null), Nn = Promise.resolve();
function ma(e = 1e4) {
  return typeof requestIdleCallback == "function" ? new Promise((t) => {
    requestIdleCallback(() => t(), {
      timeout: e
    });
  }) : Eh(0);
}
var ds = Nn;
function Rh(e = void 0) {
  return ds = ds.then(() => ma(e)), ds;
}
function Dh(e, t) {
  return e.reduce((r, n) => r.then(n), Promise.resolve(t));
}
var Ih = /\./g, Ou = "abcdefghijklmnopqrstuvwxyz";
function va(e = 10) {
  for (var t = "", r = 0; r < e; r++)
    t += Ou.charAt(Math.floor(Math.random() * Ou.length));
  return t;
}
function Pc(e) {
  e += "";
  var t = e.charAt(0).toUpperCase();
  return t + e.substr(1);
}
function Gt(e) {
  for (; e.charAt(0) === "."; )
    e = e.substr(1);
  for (; e.slice(-1) === "."; )
    e = e.slice(0, -1);
  return e;
}
function Tc(e) {
  return !!(e.includes("/") || // unix
  e.includes("\\"));
}
function Xn(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, n;
    if (Array.isArray(e)) {
      if (r = e.length, r !== t.length) return !1;
      for (n = r; n-- !== 0; ) if (!Xn(e[n], t[n])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
    var i = Object.keys(e);
    if (r = i.length, r !== Object.keys(t).length) return !1;
    for (n = r; n-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(t, i[n])) return !1;
    for (n = r; n-- !== 0; ) {
      var s = i[n];
      if (!Xn(e[s], t[s])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
var js = (e) => {
  var t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, hs = /* @__PURE__ */ new Set(["__proto__", "prototype", "constructor"]), Ph = new Set("0123456789");
function Ac(e) {
  var t = [], r = "", n = "start", i = !1;
  for (var s of e)
    switch (s) {
      case "\\": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        i && (r += s), n = "property", i = !i;
        break;
      }
      case ".": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (i) {
          i = !1, r += s;
          break;
        }
        if (hs.has(r))
          return [];
        t.push(r), r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (i) {
          i = !1, r += s;
          break;
        }
        if (n === "property") {
          if (hs.has(r))
            return [];
          t.push(r), r = "";
        }
        n = "index";
        break;
      }
      case "]": {
        if (n === "index") {
          t.push(Number.parseInt(r, 10)), r = "", n = "indexEnd";
          break;
        }
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (n === "index" && !Ph.has(s))
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        n === "start" && (n = "property"), i && (i = !1, r += "\\"), r += s;
      }
    }
  switch (i && (r += "\\"), n) {
    case "property": {
      if (hs.has(r))
        return [];
      t.push(r);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function Mc(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    var r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
function Th(e, t) {
  if (Mc(e, t))
    throw new Error("Cannot use string index");
}
function gt(e, t, r) {
  if (Array.isArray(t) && (t = t.join(".")), !t.includes(".") && !t.includes("["))
    return e[t];
  if (!js(e) || typeof t != "string")
    return r === void 0 ? e : r;
  var n = Ac(t);
  if (n.length === 0)
    return r;
  for (var i = 0; i < n.length; i++) {
    var s = n[i];
    if (Mc(e, s) ? e = i === n.length - 1 ? void 0 : null : e = e[s], e == null) {
      if (i !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function Nc(e, t, r) {
  if (Array.isArray(t) && (t = t.join(".")), !js(e) || typeof t != "string")
    return e;
  for (var n = e, i = Ac(t), s = 0; s < i.length; s++) {
    var u = i[s];
    Th(e, u), s === i.length - 1 ? e[u] = r : js(e[u]) || (e[u] = typeof i[s + 1] == "number" ? [] : {}), e = e[u];
  }
  return n;
}
function ei(e, t) {
  var r = e.get(t);
  if (typeof r > "u")
    throw new Error("missing value from map " + t);
  return r;
}
function Dr(e, t, r, n) {
  var i = e.get(t);
  return typeof i > "u" && (i = r(), e.set(t, i)), i;
}
function ge(e) {
  var t = e.split("-"), r = "RxDB";
  return t.forEach((n) => {
    r += Pc(n);
  }), r += "Plugin", new Error(`You are using a function which must be overwritten by a plugin.
        You should either prevent the usage of this function or add the plugin via:
            import { ` + r + " } from 'rxdb/plugins/" + e + `';
            addRxPlugin(` + r + `);
        `);
}
var ps = 0;
function rt() {
  var e = Date.now();
  e = e + 0.01, e <= ps && (e = ps + 0.01);
  var t = parseFloat(e.toFixed(2));
  return ps = t, t;
}
function ke(e, t) {
  if (!e)
    throw t || (t = ""), new Error("ensureNotFalsy() is falsy: " + t);
  return e;
}
var Bc = {
  bufferSize: 1,
  refCount: !0
}, lo = "15.39.0", Qr = {}, $c = "6da4936d1425ff3a5c44c02342c6daf791d266be3ae8479b8ec59e261df41b93";
function ti(e, t) {
  return ti = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, ti(e, t);
}
function jc(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ti(e, t);
}
function Ls(e) {
  return Ls = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Ls(e);
}
function Ah(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function Lc() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Lc = function() {
    return !!e;
  })();
}
function Mh(e, t, r) {
  if (Lc()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var i = new (e.bind.apply(e, n))();
  return r && ti(i, r.prototype), i;
}
function na(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return na = function(n) {
    if (n === null || !Ah(n)) return n;
    if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(n)) return t.get(n);
      t.set(n, i);
    }
    function i() {
      return Mh(n, arguments, Ls(this).constructor);
    }
    return i.prototype = Object.create(n.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), ti(i, n);
  }, na(e);
}
var Te = {
  /**
   * if this method is overwritten with one
   * that returns true, we do additional checks
   * which help the developer but have bad performance
   */
  isDevMode() {
    return !1;
  },
  /**
   * Deep freezes and object when in dev-mode.
   * Deep-Freezing has the same performance as deep-cloning, so we only do that in dev-mode.
   * Also, we can ensure the readonly state via typescript
   * @link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
   */
  deepFreezeWhenDevMode(e) {
    return e;
  },
  /**
   * overwritten to map error-codes to text-messages
   */
  tunnelErrorMessage(e) {
    return "RxDB Error-Code " + e + `.
        Error messages are not included in RxDB core to reduce build size.
        `;
  }
};
function Nh(e) {
  var t = "";
  return Object.keys(e).length === 0 || (t += `Given parameters: {
`, t += Object.keys(e).map((r) => {
    var n = "[object Object]";
    try {
      r === "errors" ? n = e[r].map((i) => JSON.stringify(i, Object.getOwnPropertyNames(i))) : n = JSON.stringify(e[r], function(i, s) {
        return s === void 0 ? null : s;
      }, 2);
    } catch {
    }
    return r + ":" + n;
  }).join(`
`), t += "}"), t;
}
function qc(e, t, r) {
  return "RxError (" + t + `):
` + e + `
` + Nh(r);
}
var Bh = /* @__PURE__ */ function(e) {
  function t(n, i, s = {}) {
    var u, l = qc(i, n, s);
    return u = e.call(this, l) || this, u.code = n, u.message = l, u.url = fo(n), u.parameters = s, u.rxdb = !0, u;
  }
  jc(t, e);
  var r = t.prototype;
  return r.toString = function() {
    return this.message;
  }, ar(t, [{
    key: "name",
    get: function() {
      return "RxError (" + this.code + ")";
    }
  }, {
    key: "typeError",
    get: function() {
      return !1;
    }
  }]);
}(/* @__PURE__ */ na(Error)), $h = /* @__PURE__ */ function(e) {
  function t(n, i, s = {}) {
    var u, l = qc(i, n, s);
    return u = e.call(this, l) || this, u.code = n, u.message = l, u.url = fo(n), u.parameters = s, u.rxdb = !0, u;
  }
  jc(t, e);
  var r = t.prototype;
  return r.toString = function() {
    return this.message;
  }, ar(t, [{
    key: "name",
    get: function() {
      return "RxTypeError (" + this.code + ")";
    }
  }, {
    key: "typeError",
    get: function() {
      return !0;
    }
  }]);
}(/* @__PURE__ */ na(TypeError));
function fo(e) {
  return "https://rxdb.info/errors.html?console=errors#" + e;
}
function Fc(e) {
  return `
 You can find out more about this error here: ` + fo(e) + " ";
}
function $(e, t) {
  return new Bh(e, Te.tunnelErrorMessage(e) + Fc(e), t);
}
function nt(e, t) {
  return new $h(e, Te.tunnelErrorMessage(e) + Fc(e), t);
}
function Kc(e) {
  return e && e.status === 409 ? e : !1;
}
var jh = {
  409: "document write conflict",
  422: "schema validation error",
  510: "attachment data missing"
};
function Lh(e) {
  return $("COL20", {
    name: jh[e.status],
    document: e.documentId,
    writeError: e
  });
}
var ri = {
  /**
   * Runs before a plugin is added.
   * Use this to block the usage of non-compatible plugins.
   */
  preAddRxPlugin: [],
  /**
   * functions that run before the database is created
   */
  preCreateRxDatabase: [],
  /**
   * runs after the database is created and prepared
   * but before the instance is returned to the user
   * @async
   */
  createRxDatabase: [],
  preCreateRxCollection: [],
  createRxCollection: [],
  createRxState: [],
  /**
  * runs at the end of the destroy-process of a collection
  * @async
  */
  postDestroyRxCollection: [],
  /**
   * Runs after a collection is removed.
   * @async
   */
  postRemoveRxCollection: [],
  /**
    * functions that get the json-schema as input
    * to do additionally checks/manipulation
    */
  preCreateRxSchema: [],
  /**
   * functions that run after the RxSchema is created
   * gets RxSchema as attribute
   */
  createRxSchema: [],
  preCreateRxQuery: [],
  /**
   * Runs before a query is send to the
   * prepareQuery function of the storage engine.
   */
  prePrepareQuery: [],
  createRxDocument: [],
  /**
   * runs after a RxDocument is created,
   * cannot be async
   */
  postCreateRxDocument: [],
  /**
   * Runs before a RxStorageInstance is created
   * gets the params of createStorageInstance()
   * as attribute so you can manipulate them.
   * Notice that you have to clone stuff before mutating the inputs.
   */
  preCreateRxStorageInstance: [],
  preStorageWrite: [],
  /**
   * runs on the document-data before the document is migrated
   * {
   *   doc: Object, // original doc-data
   *   migrated: // migrated doc-data after run through migration-strategies
   * }
   */
  preMigrateDocument: [],
  /**
   * runs after the migration of a document has been done
   */
  postMigrateDocument: [],
  /**
   * runs at the beginning of the destroy-process of a database
   */
  preDestroyRxDatabase: [],
  /**
   * runs after a database has been removed
   * @async
   */
  postRemoveRxDatabase: [],
  postCleanup: [],
  /**
   * runs before the replication writes the rows to master
   * but before the rows have been modified
   * @async
   */
  preReplicationMasterWrite: [],
  /**
   * runs after the replication has been sent to the server
   * but before the new documents have been handled
   * @async
   */
  preReplicationMasterWriteDocumentsHandle: []
};
function at(e, t) {
  ri[e].length > 0 && ri[e].forEach((r) => r(t));
}
function oi(e, t) {
  return Promise.all(ri[e].map((r) => r(t)));
}
function Bt(e, t) {
  var r = t;
  r = r.replace(Ih, ".properties."), r = "properties." + r, r = Gt(r);
  var n = gt(e, r);
  return n;
}
function Uc(e, t, r) {
  if (typeof t.primaryKey == "string")
    return r;
  var n = ho(t, r), i = r[e];
  if (i && i !== n)
    throw $("DOC19", {
      args: {
        documentData: r,
        existingPrimary: i,
        newPrimary: n
      },
      schema: t
    });
  return r[e] = n, r;
}
function kt(e) {
  return typeof e == "string" ? e : e.key;
}
function ho(e, t) {
  if (typeof e.primaryKey == "string")
    return t[e.primaryKey];
  var r = e.primaryKey;
  return r.fields.map((n) => {
    var i = gt(t, n);
    if (typeof i > "u")
      throw $("DOC18", {
        args: {
          field: n,
          documentData: t
        }
      });
    return i;
  }).join(r.separator);
}
function qh(e) {
  var t = ra(e, !0);
  return t;
}
function Fh(e) {
  return ["_deleted", e];
}
function Wc(e) {
  e = Pe(e);
  var t = kt(e.primaryKey);
  e.properties = Pe(e.properties), e.additionalProperties = !1, Object.prototype.hasOwnProperty.call(e, "keyCompression") || (e.keyCompression = !1), e.indexes = e.indexes ? e.indexes.slice(0) : [], e.required = e.required ? e.required.slice(0) : [], e.encrypted = e.encrypted ? e.encrypted.slice(0) : [], e.properties._rev = {
    type: "string",
    minLength: 1
  }, e.properties._attachments = {
    type: "object"
  }, e.properties._deleted = {
    type: "boolean"
  }, e.properties._meta = Kh, e.required = e.required ? e.required.slice(0) : [], e.required.push("_deleted"), e.required.push("_rev"), e.required.push("_meta"), e.required.push("_attachments");
  var r = zc(e);
  nn(e.required, r), e.required = e.required.filter((s) => !s.includes(".")).filter((s, u, l) => l.indexOf(s) === u), e.version = e.version || 0;
  var n = e.indexes.map((s) => {
    var u = Zr(s) ? s.slice(0) : [s];
    return u.includes(t) || u.push(t), u[0] !== "_deleted" && u.unshift("_deleted"), u;
  });
  n.length === 0 && n.push(Fh(t)), n.push(["_meta.lwt", t]), e.internalIndexes && e.internalIndexes.map((s) => {
    n.push(s);
  });
  var i = /* @__PURE__ */ new Set();
  return n.filter((s) => {
    var u = s.join(",");
    return i.has(u) ? !1 : (i.add(u), !0);
  }), e.indexes = n, e;
}
var Kh = {
  type: "object",
  properties: {
    /**
     * The last-write time.
     * Unix time in milliseconds.
     */
    lwt: {
      type: "number",
      /**
       * We use 1 as minimum so that the value is never falsy.
       */
      minimum: Ic,
      maximum: 1e15,
      multipleOf: 0.01
    }
  },
  /**
   * Additional properties are allowed
   * and can be used by plugins to set various flags.
   */
  additionalProperties: !0,
  required: ["lwt"]
};
function zc(e) {
  var t = Object.keys(e.properties).filter((n) => e.properties[n].final), r = kt(e.primaryKey);
  return t.push(r), typeof e.primaryKey != "string" && e.primaryKey.fields.forEach((n) => t.push(n)), t;
}
function Uh(e, t) {
  for (var r = Object.keys(e.defaultValues), n = 0; n < r.length; ++n) {
    var i = r[n];
    (!Object.prototype.hasOwnProperty.call(t, i) || typeof t[i] > "u") && (t[i] = e.defaultValues[i]);
  }
  return t;
}
var Vc = /* @__PURE__ */ function() {
  function e(r, n) {
    this.jsonSchema = r, this.hashFunction = n, this.indexes = Wh(this.jsonSchema), this.primaryPath = kt(this.jsonSchema.primaryKey), this.finalFields = zc(this.jsonSchema);
  }
  var t = e.prototype;
  return t.validateChange = function(n, i) {
    this.finalFields.forEach((s) => {
      if (!Xn(n[s], i[s]))
        throw $("DOC9", {
          dataBefore: n,
          dataAfter: i,
          fieldName: s,
          schema: this.jsonSchema
        });
    });
  }, t.getDocumentPrototype = function() {
    var n = {}, i = Bt(this.jsonSchema, "");
    return Object.keys(i).forEach((s) => {
      var u = s;
      n.__defineGetter__(s, function() {
        if (!(!this.get || typeof this.get != "function")) {
          var l = this.get(u);
          return l;
        }
      }), Object.defineProperty(n, s + "$", {
        get: function() {
          return this.get$(u);
        },
        enumerable: !1,
        configurable: !1
      }), Object.defineProperty(n, s + "$$", {
        get: function() {
          return this.get$$(u);
        },
        enumerable: !1,
        configurable: !1
      }), Object.defineProperty(n, s + "_", {
        get: function() {
          return this.populate(u);
        },
        enumerable: !1,
        configurable: !1
      });
    }), At(this, "getDocumentPrototype", () => n), n;
  }, t.getPrimaryOfDocumentData = function(n) {
    return ho(this.jsonSchema, n);
  }, ar(e, [{
    key: "version",
    get: function() {
      return this.jsonSchema.version;
    }
  }, {
    key: "defaultValues",
    get: function() {
      var r = {};
      return Object.entries(this.jsonSchema.properties).filter(([, n]) => Object.prototype.hasOwnProperty.call(n, "default")).forEach(([n, i]) => r[n] = i.default), At(this, "defaultValues", r);
    }
    /**
     * @overrides itself on the first call
     *
     * TODO this should be a pure function that
     * caches the hash in a WeakMap.
     */
  }, {
    key: "hash",
    get: function() {
      return At(this, "hash", this.hashFunction(JSON.stringify(this.jsonSchema)));
    }
  }]);
}();
function Wh(e) {
  return (e.indexes || []).map((t) => Zr(t) ? t : [t]);
}
function zh(e) {
  var t = e.version ? e.version : 0, r = 0;
  return new Array(t).fill(0).map(() => r++);
}
function Vh(e, t, r = !0) {
  r && at("preCreateRxSchema", e);
  var n = Wc(e);
  n = qh(n), Te.deepFreezeWhenDevMode(n);
  var i = new Vc(n, t);
  return at("createRxSchema", i), i;
}
function Ce(e) {
  return typeof e == "function";
}
function Hh(e) {
  return Ce(e == null ? void 0 : e.lift);
}
function Lt(e) {
  return function(t) {
    if (Hh(t))
      return t.lift(function(r) {
        try {
          return e(r, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
var qs = function(e, t) {
  return qs = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, qs(e, t);
};
function Ar(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  qs(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function Zh(e, t, r, n) {
  function i(s) {
    return s instanceof r ? s : new r(function(u) {
      u(s);
    });
  }
  return new (r || (r = Promise))(function(s, u) {
    function l(v) {
      try {
        m(n.next(v));
      } catch (_) {
        u(_);
      }
    }
    function d(v) {
      try {
        m(n.throw(v));
      } catch (_) {
        u(_);
      }
    }
    function m(v) {
      v.done ? s(v.value) : i(v.value).then(l, d);
    }
    m((n = n.apply(e, t || [])).next());
  });
}
function Hc(e, t) {
  var r = { label: 0, sent: function() {
    if (s[0] & 1) throw s[1];
    return s[1];
  }, trys: [], ops: [] }, n, i, s, u = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return u.next = l(0), u.throw = l(1), u.return = l(2), typeof Symbol == "function" && (u[Symbol.iterator] = function() {
    return this;
  }), u;
  function l(m) {
    return function(v) {
      return d([m, v]);
    };
  }
  function d(m) {
    if (n) throw new TypeError("Generator is already executing.");
    for (; u && (u = 0, m[0] && (r = 0)), r; ) try {
      if (n = 1, i && (s = m[0] & 2 ? i.return : m[0] ? i.throw || ((s = i.return) && s.call(i), 0) : i.next) && !(s = s.call(i, m[1])).done) return s;
      switch (i = 0, s && (m = [m[0] & 2, s.value]), m[0]) {
        case 0:
        case 1:
          s = m;
          break;
        case 4:
          return r.label++, { value: m[1], done: !1 };
        case 5:
          r.label++, i = m[1], m = [0];
          continue;
        case 7:
          m = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (s = r.trys, !(s = s.length > 0 && s[s.length - 1]) && (m[0] === 6 || m[0] === 2)) {
            r = 0;
            continue;
          }
          if (m[0] === 3 && (!s || m[1] > s[0] && m[1] < s[3])) {
            r.label = m[1];
            break;
          }
          if (m[0] === 6 && r.label < s[1]) {
            r.label = s[1], s = m;
            break;
          }
          if (s && r.label < s[2]) {
            r.label = s[2], r.ops.push(m);
            break;
          }
          s[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      m = t.call(e, r);
    } catch (v) {
      m = [6, v], i = 0;
    } finally {
      n = s = 0;
    }
    if (m[0] & 5) throw m[1];
    return { value: m[0] ? m[1] : void 0, done: !0 };
  }
}
function an(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function sn(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var n = r.call(e), i, s = [], u;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; ) s.push(i.value);
  } catch (l) {
    u = { error: l };
  } finally {
    try {
      i && !i.done && (r = n.return) && r.call(n);
    } finally {
      if (u) throw u.error;
    }
  }
  return s;
}
function on(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, i = t.length, s; n < i; n++)
    (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), s[n] = t[n]);
  return e.concat(s || Array.prototype.slice.call(t));
}
function Gr(e) {
  return this instanceof Gr ? (this.v = e, this) : new Gr(e);
}
function Qh(e, t, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = r.apply(e, t || []), i, s = [];
  return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), l("next"), l("throw"), l("return", u), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function u(I) {
    return function(M) {
      return Promise.resolve(M).then(I, _);
    };
  }
  function l(I, M) {
    n[I] && (i[I] = function(B) {
      return new Promise(function(Q, G) {
        s.push([I, B, Q, G]) > 1 || d(I, B);
      });
    }, M && (i[I] = M(i[I])));
  }
  function d(I, M) {
    try {
      m(n[I](M));
    } catch (B) {
      C(s[0][3], B);
    }
  }
  function m(I) {
    I.value instanceof Gr ? Promise.resolve(I.value.v).then(v, _) : C(s[0][2], I);
  }
  function v(I) {
    d("next", I);
  }
  function _(I) {
    d("throw", I);
  }
  function C(I, M) {
    I(M), s.shift(), s.length && d(s[0][0], s[0][1]);
  }
}
function Gh(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], r;
  return t ? t.call(e) : (e = typeof an == "function" ? an(e) : e[Symbol.iterator](), r = {}, n("next"), n("throw"), n("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r);
  function n(s) {
    r[s] = e[s] && function(u) {
      return new Promise(function(l, d) {
        u = e[s](u), i(l, d, u.done, u.value);
      });
    };
  }
  function i(s, u, l, d) {
    Promise.resolve(d).then(function(m) {
      s({ value: m, done: l });
    }, u);
  }
}
var Zc = function(e) {
  return e && typeof e.length == "number" && typeof e != "function";
};
function Qc(e) {
  return Ce(e == null ? void 0 : e.then);
}
function Gc(e) {
  var t = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = e(t);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var ms = Gc(function(e) {
  return function(r) {
    e(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(n, i) {
      return i + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function Fs(e, t) {
  if (e) {
    var r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var ya = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, r, n, i, s;
    if (!this.closed) {
      this.closed = !0;
      var u = this._parentage;
      if (u)
        if (this._parentage = null, Array.isArray(u))
          try {
            for (var l = an(u), d = l.next(); !d.done; d = l.next()) {
              var m = d.value;
              m.remove(this);
            }
          } catch (B) {
            t = { error: B };
          } finally {
            try {
              d && !d.done && (r = l.return) && r.call(l);
            } finally {
              if (t) throw t.error;
            }
          }
        else
          u.remove(this);
      var v = this.initialTeardown;
      if (Ce(v))
        try {
          v();
        } catch (B) {
          s = B instanceof ms ? B.errors : [B];
        }
      var _ = this._finalizers;
      if (_) {
        this._finalizers = null;
        try {
          for (var C = an(_), I = C.next(); !I.done; I = C.next()) {
            var M = I.value;
            try {
              Su(M);
            } catch (B) {
              s = s ?? [], B instanceof ms ? s = on(on([], sn(s)), sn(B.errors)) : s.push(B);
            }
          }
        } catch (B) {
          n = { error: B };
        } finally {
          try {
            I && !I.done && (i = C.return) && i.call(C);
          } finally {
            if (n) throw n.error;
          }
        }
      }
      if (s)
        throw new ms(s);
    }
  }, e.prototype.add = function(t) {
    var r;
    if (t && t !== this)
      if (this.closed)
        Su(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var r = this._parentage;
    return r === t || Array.isArray(r) && r.includes(t);
  }, e.prototype._addParent = function(t) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(t), r) : r ? [r, t] : t;
  }, e.prototype._removeParent = function(t) {
    var r = this._parentage;
    r === t ? this._parentage = null : Array.isArray(r) && Fs(r, t);
  }, e.prototype.remove = function(t) {
    var r = this._finalizers;
    r && Fs(r, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), Yc = ya.EMPTY;
function Jc(e) {
  return e instanceof ya || e && "closed" in e && Ce(e.remove) && Ce(e.add) && Ce(e.unsubscribe);
}
function Su(e) {
  Ce(e) ? e() : e.unsubscribe();
}
var Yh = {
  Promise: void 0
}, Jh = {
  setTimeout: function(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    return setTimeout.apply(void 0, on([e, t], sn(r)));
  },
  clearTimeout: function(e) {
    return clearTimeout(e);
  },
  delegate: void 0
};
function Xc(e) {
  Jh.setTimeout(function() {
    throw e;
  });
}
function Eu() {
}
function Wi(e) {
  e();
}
var po = function(e) {
  Ar(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, Jc(r) && r.add(n)) : n.destination = tp, n;
  }
  return t.create = function(r, n, i) {
    return new ni(r, n, i);
  }, t.prototype.next = function(r) {
    this.isStopped || this._next(r);
  }, t.prototype.error = function(r) {
    this.isStopped || (this.isStopped = !0, this._error(r));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(r) {
    this.destination.next(r);
  }, t.prototype._error = function(r) {
    try {
      this.destination.error(r);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(ya), Xh = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(t);
      } catch (n) {
        Fi(n);
      }
  }, e.prototype.error = function(t) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(t);
      } catch (n) {
        Fi(n);
      }
    else
      Fi(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (r) {
        Fi(r);
      }
  }, e;
}(), ni = function(e) {
  Ar(t, e);
  function t(r, n, i) {
    var s = e.call(this) || this, u;
    return Ce(r) || !r ? u = {
      next: r ?? void 0,
      error: n ?? void 0,
      complete: i ?? void 0
    } : u = r, s.destination = new Xh(u), s;
  }
  return t;
}(po);
function Fi(e) {
  Xc(e);
}
function ep(e) {
  throw e;
}
var tp = {
  closed: !0,
  next: Eu,
  error: ep,
  complete: Eu
}, mo = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function vo(e) {
  return e;
}
function rp(e) {
  return e.length === 0 ? vo : e.length === 1 ? e[0] : function(r) {
    return e.reduce(function(n, i) {
      return i(n);
    }, r);
  };
}
var st = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var r = new e();
    return r.source = this, r.operator = t, r;
  }, e.prototype.subscribe = function(t, r, n) {
    var i = this, s = ip(t) ? t : new ni(t, r, n);
    return Wi(function() {
      var u = i, l = u.operator, d = u.source;
      s.add(l ? l.call(s, d) : d ? i._subscribe(s) : i._trySubscribe(s));
    }), s;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (r) {
      t.error(r);
    }
  }, e.prototype.forEach = function(t, r) {
    var n = this;
    return r = Cu(r), new r(function(i, s) {
      var u = new ni({
        next: function(l) {
          try {
            t(l);
          } catch (d) {
            s(d), u.unsubscribe();
          }
        },
        error: s,
        complete: i
      });
      n.subscribe(u);
    });
  }, e.prototype._subscribe = function(t) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t);
  }, e.prototype[mo] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return rp(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = Cu(t), new t(function(n, i) {
      var s;
      r.subscribe(function(u) {
        return s = u;
      }, function(u) {
        return i(u);
      }, function() {
        return n(s);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function Cu(e) {
  var t;
  return (t = e ?? Yh.Promise) !== null && t !== void 0 ? t : Promise;
}
function np(e) {
  return e && Ce(e.next) && Ce(e.error) && Ce(e.complete);
}
function ip(e) {
  return e && e instanceof po || np(e) && Jc(e);
}
function el(e) {
  return Ce(e[mo]);
}
function tl(e) {
  return Symbol.asyncIterator && Ce(e == null ? void 0 : e[Symbol.asyncIterator]);
}
function rl(e) {
  return new TypeError("You provided " + (e !== null && typeof e == "object" ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function ap() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var nl = ap();
function il(e) {
  return Ce(e == null ? void 0 : e[nl]);
}
function al(e) {
  return Qh(this, arguments, function() {
    var r, n, i, s;
    return Hc(this, function(u) {
      switch (u.label) {
        case 0:
          r = e.getReader(), u.label = 1;
        case 1:
          u.trys.push([1, , 9, 10]), u.label = 2;
        case 2:
          return [4, Gr(r.read())];
        case 3:
          return n = u.sent(), i = n.value, s = n.done, s ? [4, Gr(void 0)] : [3, 5];
        case 4:
          return [2, u.sent()];
        case 5:
          return [4, Gr(i)];
        case 6:
          return [4, u.sent()];
        case 7:
          return u.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return r.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function sl(e) {
  return Ce(e == null ? void 0 : e.getReader);
}
function sr(e) {
  if (e instanceof st)
    return e;
  if (e != null) {
    if (el(e))
      return sp(e);
    if (Zc(e))
      return op(e);
    if (Qc(e))
      return up(e);
    if (tl(e))
      return ol(e);
    if (il(e))
      return cp(e);
    if (sl(e))
      return lp(e);
  }
  throw rl(e);
}
function sp(e) {
  return new st(function(t) {
    var r = e[mo]();
    if (Ce(r.subscribe))
      return r.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function op(e) {
  return new st(function(t) {
    for (var r = 0; r < e.length && !t.closed; r++)
      t.next(e[r]);
    t.complete();
  });
}
function up(e) {
  return new st(function(t) {
    e.then(function(r) {
      t.closed || (t.next(r), t.complete());
    }, function(r) {
      return t.error(r);
    }).then(null, Xc);
  });
}
function cp(e) {
  return new st(function(t) {
    var r, n;
    try {
      for (var i = an(e), s = i.next(); !s.done; s = i.next()) {
        var u = s.value;
        if (t.next(u), t.closed)
          return;
      }
    } catch (l) {
      r = { error: l };
    } finally {
      try {
        s && !s.done && (n = i.return) && n.call(i);
      } finally {
        if (r) throw r.error;
      }
    }
    t.complete();
  });
}
function ol(e) {
  return new st(function(t) {
    fp(e, t).catch(function(r) {
      return t.error(r);
    });
  });
}
function lp(e) {
  return ol(al(e));
}
function fp(e, t) {
  var r, n, i, s;
  return Zh(this, void 0, void 0, function() {
    var u, l;
    return Hc(this, function(d) {
      switch (d.label) {
        case 0:
          d.trys.push([0, 5, 6, 11]), r = Gh(e), d.label = 1;
        case 1:
          return [4, r.next()];
        case 2:
          if (n = d.sent(), !!n.done) return [3, 4];
          if (u = n.value, t.next(u), t.closed)
            return [2];
          d.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return l = d.sent(), i = { error: l }, [3, 11];
        case 6:
          return d.trys.push([6, , 9, 10]), n && !n.done && (s = r.return) ? [4, s.call(r)] : [3, 8];
        case 7:
          d.sent(), d.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (i) throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function un(e, t, r, n, i) {
  return new dp(e, t, r, n, i);
}
var dp = function(e) {
  Ar(t, e);
  function t(r, n, i, s, u, l) {
    var d = e.call(this, r) || this;
    return d.onFinalize = u, d.shouldUnsubscribe = l, d._next = n ? function(m) {
      try {
        n(m);
      } catch (v) {
        r.error(v);
      }
    } : e.prototype._next, d._error = s ? function(m) {
      try {
        s(m);
      } catch (v) {
        r.error(v);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, d._complete = i ? function() {
      try {
        i();
      } catch (m) {
        r.error(m);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, d;
  }
  return t.prototype.unsubscribe = function() {
    var r;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var n = this.closed;
      e.prototype.unsubscribe.call(this), !n && ((r = this.onFinalize) === null || r === void 0 || r.call(this));
    }
  }, t;
}(po), ul = {
  now: function() {
    return (ul.delegate || Date).now();
  },
  delegate: void 0
};
function hp(e) {
  return e && Ce(e.schedule);
}
function cl(e) {
  return e[e.length - 1];
}
function ga(e) {
  return hp(cl(e)) ? e.pop() : void 0;
}
function ll(e, t) {
  return typeof cl(e) == "number" ? e.pop() : t;
}
function xr(e, t, r, n, i) {
  n === void 0 && (n = 0), i === void 0 && (i = !1);
  var s = t.schedule(function() {
    r(), i ? e.add(this.schedule(null, n)) : this.unsubscribe();
  }, n);
  if (e.add(s), !i)
    return s;
}
function fl(e, t) {
  return t === void 0 && (t = 0), Lt(function(r, n) {
    r.subscribe(un(n, function(i) {
      return xr(n, e, function() {
        return n.next(i);
      }, t);
    }, function() {
      return xr(n, e, function() {
        return n.complete();
      }, t);
    }, function(i) {
      return xr(n, e, function() {
        return n.error(i);
      }, t);
    }));
  });
}
function dl(e, t) {
  return t === void 0 && (t = 0), Lt(function(r, n) {
    n.add(e.schedule(function() {
      return r.subscribe(n);
    }, t));
  });
}
function pp(e, t) {
  return sr(e).pipe(dl(t), fl(t));
}
function mp(e, t) {
  return sr(e).pipe(dl(t), fl(t));
}
function vp(e, t) {
  return new st(function(r) {
    var n = 0;
    return t.schedule(function() {
      n === e.length ? r.complete() : (r.next(e[n++]), r.closed || this.schedule());
    });
  });
}
function yp(e, t) {
  return new st(function(r) {
    var n;
    return xr(r, t, function() {
      n = e[nl](), xr(r, t, function() {
        var i, s, u;
        try {
          i = n.next(), s = i.value, u = i.done;
        } catch (l) {
          r.error(l);
          return;
        }
        u ? r.complete() : r.next(s);
      }, 0, !0);
    }), function() {
      return Ce(n == null ? void 0 : n.return) && n.return();
    };
  });
}
function hl(e, t) {
  if (!e)
    throw new Error("Iterable cannot be null");
  return new st(function(r) {
    xr(r, t, function() {
      var n = e[Symbol.asyncIterator]();
      xr(r, t, function() {
        n.next().then(function(i) {
          i.done ? r.complete() : r.next(i.value);
        });
      }, 0, !0);
    });
  });
}
function gp(e, t) {
  return hl(al(e), t);
}
function bp(e, t) {
  if (e != null) {
    if (el(e))
      return pp(e, t);
    if (Zc(e))
      return vp(e, t);
    if (Qc(e))
      return mp(e, t);
    if (tl(e))
      return hl(e, t);
    if (il(e))
      return yp(e, t);
    if (sl(e))
      return gp(e, t);
  }
  throw rl(e);
}
function yo(e, t) {
  return t ? bp(e, t) : sr(e);
}
function It(e, t) {
  return Lt(function(r, n) {
    var i = 0;
    r.subscribe(un(n, function(s) {
      n.next(e.call(t, s, i++));
    }));
  });
}
function _p(e, t, r, n, i, s, u, l) {
  var d = [], m = 0, v = 0, _ = !1, C = function() {
    _ && !d.length && !m && t.complete();
  }, I = function(B) {
    return m < n ? M(B) : d.push(B);
  }, M = function(B) {
    m++;
    var Q = !1;
    sr(r(B, v++)).subscribe(un(t, function(G) {
      t.next(G);
    }, function() {
      Q = !0;
    }, void 0, function() {
      if (Q)
        try {
          m--;
          for (var G = function() {
            var X = d.shift();
            u || M(X);
          }; d.length && m < n; )
            G();
          C();
        } catch (X) {
          t.error(X);
        }
    }));
  };
  return e.subscribe(un(t, I, function() {
    _ = !0, C();
  })), function() {
  };
}
function ui(e, t, r) {
  return r === void 0 && (r = 1 / 0), Ce(t) ? ui(function(n, i) {
    return It(function(s, u) {
      return t(n, s, i, u);
    })(sr(e(n, i)));
  }, r) : (typeof t == "number" && (r = t), Lt(function(n, i) {
    return _p(n, i, e, r);
  }));
}
function go(e) {
  return e === void 0 && (e = 1 / 0), ui(vo, e);
}
function wp() {
  return go(1);
}
var xp = Gc(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), rr = function(e) {
  Ar(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new Ru(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new xp();
  }, t.prototype.next = function(r) {
    var n = this;
    Wi(function() {
      var i, s;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var u = an(n.currentObservers), l = u.next(); !l.done; l = u.next()) {
            var d = l.value;
            d.next(r);
          }
        } catch (m) {
          i = { error: m };
        } finally {
          try {
            l && !l.done && (s = u.return) && s.call(u);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, t.prototype.error = function(r) {
    var n = this;
    Wi(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var i = n.observers; i.length; )
          i.shift().error(r);
      }
    });
  }, t.prototype.complete = function() {
    var r = this;
    Wi(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.isStopped = !0;
        for (var n = r.observers; n.length; )
          n.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var r;
      return ((r = this.observers) === null || r === void 0 ? void 0 : r.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(r) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, r);
  }, t.prototype._subscribe = function(r) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
  }, t.prototype._innerSubscribe = function(r) {
    var n = this, i = this, s = i.hasError, u = i.isStopped, l = i.observers;
    return s || u ? Yc : (this.currentObservers = null, l.push(r), new ya(function() {
      n.currentObservers = null, Fs(l, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, i = n.hasError, s = n.thrownError, u = n.isStopped;
    i ? r.error(s) : u && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new st();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new Ru(r, n);
  }, t;
}(st), Ru = function(e) {
  Ar(t, e);
  function t(r, n) {
    var i = e.call(this) || this;
    return i.destination = r, i.source = n, i;
  }
  return t.prototype.next = function(r) {
    var n, i;
    (i = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || i === void 0 || i.call(n, r);
  }, t.prototype.error = function(r) {
    var n, i;
    (i = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || i === void 0 || i.call(n, r);
  }, t.prototype.complete = function() {
    var r, n;
    (n = (r = this.destination) === null || r === void 0 ? void 0 : r.complete) === null || n === void 0 || n.call(r);
  }, t.prototype._subscribe = function(r) {
    var n, i;
    return (i = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && i !== void 0 ? i : Yc;
  }, t;
}(rr);
function Du() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  return wp()(yo(e, ga(e)));
}
var kp = new st(function(e) {
  return e.complete();
});
function Ks(e, t) {
  return t === void 0 && (t = vo), e = e ?? Op, Lt(function(r, n) {
    var i, s = !0;
    r.subscribe(un(n, function(u) {
      var l = t(u);
      (s || !e(i, l)) && (s = !1, i = l, n.next(u));
    }));
  });
}
function Op(e, t) {
  return e === t;
}
function Qe(e, t) {
  return Lt(function(r, n) {
    var i = 0;
    r.subscribe(un(n, function(s) {
      return e.call(t, s, i++) && n.next(s);
    }));
  });
}
function Sp() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  var r = ga(e), n = ll(e, 1 / 0);
  return Lt(function(i, s) {
    go(n)(yo(on([i], sn(e)), r)).subscribe(s);
  });
}
function Ep() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  return Sp.apply(void 0, on([], sn(e)));
}
var Cp = function(e) {
  Ar(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n._value = r, n;
  }
  return Object.defineProperty(t.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._subscribe = function(r) {
    var n = e.prototype._subscribe.call(this, r);
    return !n.closed && r.next(this._value), n;
  }, t.prototype.getValue = function() {
    var r = this, n = r.hasError, i = r.thrownError, s = r._value;
    if (n)
      throw i;
    return this._throwIfClosed(), s;
  }, t.prototype.next = function(r) {
    e.prototype.next.call(this, this._value = r);
  }, t;
}(rr), Rp = function(e) {
  Ar(t, e);
  function t(r, n, i) {
    r === void 0 && (r = 1 / 0), n === void 0 && (n = 1 / 0), i === void 0 && (i = ul);
    var s = e.call(this) || this;
    return s._bufferSize = r, s._windowTime = n, s._timestampProvider = i, s._buffer = [], s._infiniteTimeWindow = !0, s._infiniteTimeWindow = n === 1 / 0, s._bufferSize = Math.max(1, r), s._windowTime = Math.max(1, n), s;
  }
  return t.prototype.next = function(r) {
    var n = this, i = n.isStopped, s = n._buffer, u = n._infiniteTimeWindow, l = n._timestampProvider, d = n._windowTime;
    i || (s.push(r), !u && s.push(l.now() + d)), this._trimBuffer(), e.prototype.next.call(this, r);
  }, t.prototype._subscribe = function(r) {
    this._throwIfClosed(), this._trimBuffer();
    for (var n = this._innerSubscribe(r), i = this, s = i._infiniteTimeWindow, u = i._buffer, l = u.slice(), d = 0; d < l.length && !r.closed; d += s ? 1 : 2)
      r.next(l[d]);
    return this._checkFinalizedStatuses(r), n;
  }, t.prototype._trimBuffer = function() {
    var r = this, n = r._bufferSize, i = r._timestampProvider, s = r._buffer, u = r._infiniteTimeWindow, l = (u ? 1 : 2) * n;
    if (n < 1 / 0 && l < s.length && s.splice(0, s.length - l), !u) {
      for (var d = i.now(), m = 0, v = 1; v < s.length && s[v] <= d; v += 2)
        m = v;
      m && s.splice(0, m + 1);
    }
  }, t;
}(rr);
function Dp(e) {
  e === void 0 && (e = {});
  var t = e.connector, r = t === void 0 ? function() {
    return new rr();
  } : t, n = e.resetOnError, i = n === void 0 ? !0 : n, s = e.resetOnComplete, u = s === void 0 ? !0 : s, l = e.resetOnRefCountZero, d = l === void 0 ? !0 : l;
  return function(m) {
    var v, _, C, I = 0, M = !1, B = !1, Q = function() {
      _ == null || _.unsubscribe(), _ = void 0;
    }, G = function() {
      Q(), v = C = void 0, M = B = !1;
    }, X = function() {
      var ee = v;
      G(), ee == null || ee.unsubscribe();
    };
    return Lt(function(ee, ye) {
      I++, !B && !M && Q();
      var ae = C = C ?? r();
      ye.add(function() {
        I--, I === 0 && !B && !M && (_ = vs(X, d));
      }), ae.subscribe(ye), !v && I > 0 && (v = new ni({
        next: function(ce) {
          return ae.next(ce);
        },
        error: function(ce) {
          B = !0, Q(), _ = vs(G, i, ce), ae.error(ce);
        },
        complete: function() {
          M = !0, Q(), _ = vs(G, u), ae.complete();
        }
      }), sr(ee).subscribe(v));
    })(m);
  };
}
function vs(e, t) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  if (t === !0) {
    e();
    return;
  }
  if (t !== !1) {
    var i = new ni({
      next: function() {
        i.unsubscribe(), e();
      }
    });
    return sr(t.apply(void 0, on([], sn(r)))).subscribe(i);
  }
}
function pl(e, t, r) {
  var n, i, s, u, l = !1;
  return e && typeof e == "object" ? (n = e.bufferSize, u = n === void 0 ? 1 / 0 : n, i = e.windowTime, t = i === void 0 ? 1 / 0 : i, s = e.refCount, l = s === void 0 ? !1 : s, r = e.scheduler) : u = e ?? 1 / 0, Dp({
    connector: function() {
      return new Rp(u, t, r);
    },
    resetOnError: !0,
    resetOnComplete: !1,
    resetOnRefCountZero: l
  });
}
function ml() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  var r = ga(e);
  return Lt(function(n, i) {
    (r ? Du(e, n, r) : Du(e, n)).subscribe(i);
  });
}
function Ip(e) {
  return e.documentData ? e.documentData : e.previousDocumentData;
}
function Pp(e) {
  switch (e.operation) {
    case "INSERT":
      return {
        operation: e.operation,
        id: e.documentId,
        doc: e.documentData,
        previous: null
      };
    case "UPDATE":
      return {
        operation: e.operation,
        id: e.documentId,
        doc: Te.deepFreezeWhenDevMode(e.documentData),
        previous: e.previousDocumentData ? e.previousDocumentData : "UNKNOWN"
      };
    case "DELETE":
      return {
        operation: e.operation,
        id: e.documentId,
        doc: null,
        previous: e.previousDocumentData
      };
  }
}
function Tp() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  var r = ga(e), n = ll(e, 1 / 0), i = e;
  return i.length ? i.length === 1 ? sr(i[0]) : go(n)(yo(i, r)) : kp;
}
function bo(e) {
  return e[e.length - 1];
}
function Ap(e) {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}
function Iu(e, t, r) {
  if (Array.isArray(t) && (t = t.join(".")), !Ap(e) || typeof t != "string")
    return e;
  const n = t.split(".");
  if (n.length === 0)
    return r;
  for (let i = 0; i < n.length; i++) {
    const s = n[i];
    if (Mp(e, s) ? e = i === n.length - 1 ? void 0 : null : e = e[s], e == null) {
      if (i !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function Mp(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
const vl = (e) => !!e.queryParams.limit, Np = (e) => e.queryParams.limit === 1, Bp = (e) => !!(e.queryParams.skip && e.queryParams.skip > 0), $p = (e) => e.changeEvent.operation === "DELETE", jp = (e) => e.changeEvent.operation === "INSERT", Lp = (e) => e.changeEvent.operation === "UPDATE", qp = (e) => vl(e) && e.previousResults.length >= e.queryParams.limit, Fp = (e) => {
  const t = e.queryParams.sortFields, r = e.changeEvent.previous, n = e.changeEvent.doc;
  if (!n)
    return !1;
  if (!r)
    return !0;
  for (let i = 0; i < t.length; i++) {
    const s = t[i], u = Iu(r, s), l = Iu(n, s);
    if (u !== l)
      return !0;
  }
  return !1;
}, Kp = (e) => {
  const t = e.changeEvent.id;
  if (e.keyDocumentMap)
    return e.keyDocumentMap.has(t);
  {
    const r = e.queryParams.primaryKey, n = e.previousResults;
    for (let i = 0; i < n.length; i++)
      if (n[i][r] === t)
        return !0;
    return !1;
  }
}, Up = (e) => {
  const t = e.previousResults[0];
  return !!(t && t[e.queryParams.primaryKey] === e.changeEvent.id);
}, Wp = (e) => {
  const t = bo(e.previousResults);
  return !!(t && t[e.queryParams.primaryKey] === e.changeEvent.id);
}, zp = (e) => {
  const t = e.changeEvent.previous;
  if (!t)
    return !1;
  const r = e.previousResults[0];
  return r ? r[e.queryParams.primaryKey] === e.changeEvent.id ? !0 : e.queryParams.sortComparator(t, r) < 0 : !1;
}, Vp = (e) => {
  const t = e.changeEvent.previous;
  if (!t)
    return !1;
  const r = bo(e.previousResults);
  return r ? r[e.queryParams.primaryKey] === e.changeEvent.id ? !0 : e.queryParams.sortComparator(t, r) > 0 : !1;
}, Hp = (e) => {
  const t = e.changeEvent.doc;
  if (!t)
    return !1;
  const r = e.previousResults[0];
  return r ? r[e.queryParams.primaryKey] === e.changeEvent.id ? !0 : e.queryParams.sortComparator(t, r) < 0 : !1;
}, Zp = (e) => {
  const t = e.changeEvent.doc;
  if (!t)
    return !1;
  const r = bo(e.previousResults);
  return r ? r[e.queryParams.primaryKey] === e.changeEvent.id ? !0 : e.queryParams.sortComparator(t, r) > 0 : !1;
}, Qp = (e) => {
  const t = e.changeEvent.previous;
  return t ? e.queryParams.queryMatcher(t) : !1;
}, Gp = (e) => {
  const t = e.changeEvent.doc;
  return t ? e.queryParams.queryMatcher(t) : !1;
}, Yp = (e) => e.previousResults.length === 0, Jp = {
  0: jp,
  1: Lp,
  2: $p,
  3: vl,
  4: Np,
  5: Bp,
  6: Yp,
  7: qp,
  8: Up,
  9: Wp,
  10: Fp,
  11: Kp,
  12: zp,
  13: Vp,
  14: Hp,
  15: Zp,
  16: Qp,
  17: Gp
};
function Xp(e, t, r, n) {
  var i = e.length, s = i - 1, u = 0;
  if (i === 0)
    return e.push(t), 0;
  for (var l; n <= s; )
    u = n + (s - n >> 1), l = e[u], r(l, t) <= 0 ? n = u + 1 : s = u - 1;
  return r(l, t) <= 0 && u++, e.splice(u, 0, t), u;
}
const em = (e) => {
}, _o = (e) => {
  e.previousResults.unshift(e.changeEvent.doc), e.keyDocumentMap && e.keyDocumentMap.set(e.changeEvent.id, e.changeEvent.doc);
}, wo = (e) => {
  e.previousResults.push(e.changeEvent.doc), e.keyDocumentMap && e.keyDocumentMap.set(e.changeEvent.id, e.changeEvent.doc);
}, xo = (e) => {
  const t = e.previousResults.shift();
  e.keyDocumentMap && t && e.keyDocumentMap.delete(t[e.queryParams.primaryKey]);
}, ko = (e) => {
  const t = e.previousResults.pop();
  e.keyDocumentMap && t && e.keyDocumentMap.delete(t[e.queryParams.primaryKey]);
}, tm = (e) => {
  xo(e), wo(e);
}, rm = (e) => {
  ko(e), _o(e);
}, nm = (e) => {
  xo(e), _o(e);
}, im = (e) => {
  ko(e), wo(e);
}, yl = (e) => {
  e.keyDocumentMap && e.keyDocumentMap.delete(e.changeEvent.id);
  const t = e.queryParams.primaryKey, r = e.previousResults;
  for (let n = 0; n < r.length; n++)
    if (r[n][t] === e.changeEvent.id) {
      r.splice(n, 1);
      break;
    }
}, am = (e) => {
  const t = e.changeEvent.doc, r = e.queryParams.primaryKey, n = e.previousResults;
  for (let i = 0; i < n.length; i++)
    if (n[i][r] === e.changeEvent.id) {
      n[i] = t, e.keyDocumentMap && e.keyDocumentMap.set(e.changeEvent.id, t);
      break;
    }
}, sm = (e) => {
  const t = {
    _id: "wrongHuman" + (/* @__PURE__ */ new Date()).getTime()
  };
  e.previousResults.length = 0, e.previousResults.push(t), e.keyDocumentMap && (e.keyDocumentMap.clear(), e.keyDocumentMap.set(t._id, t));
}, gl = (e) => {
  const t = e.changeEvent.id, r = e.changeEvent.doc;
  if (e.keyDocumentMap) {
    if (e.keyDocumentMap.has(t))
      return;
    e.keyDocumentMap.set(t, r);
  } else if (e.previousResults.find((i) => i[e.queryParams.primaryKey] === t))
    return;
  Xp(e.previousResults, r, e.queryParams.sortComparator, 0);
}, om = (e) => {
  yl(e), gl(e);
}, um = (e) => {
  throw new Error("Action runFullQueryAgain must be implemented by yourself");
}, cm = (e) => {
  throw new Error("Action unknownAction should never be called");
}, lm = [
  "doNothing",
  "insertFirst",
  "insertLast",
  "removeFirstItem",
  "removeLastItem",
  "removeFirstInsertLast",
  "removeLastInsertFirst",
  "removeFirstInsertFirst",
  "removeLastInsertLast",
  "removeExisting",
  "replaceExisting",
  "alwaysWrong",
  "insertAtSortPosition",
  "removeExistingAndInsertAtSortPosition",
  "runFullQueryAgain",
  "unknownAction"
], fm = {
  doNothing: em,
  insertFirst: _o,
  insertLast: wo,
  removeFirstItem: xo,
  removeLastItem: ko,
  removeFirstInsertLast: tm,
  removeLastInsertFirst: rm,
  removeFirstInsertFirst: nm,
  removeLastInsertLast: im,
  removeExisting: yl,
  replaceExisting: am,
  alwaysWrong: sm,
  insertAtSortPosition: gl,
  removeExistingAndInsertAtSortPosition: om,
  runFullQueryAgain: um,
  unknownAction: cm
}, dm = 40;
function ys(e) {
  return e.charCodeAt(0) - dm;
}
function hm(e) {
  return e ? "1" : "0";
}
function Pu(e, t) {
  const r = [];
  for (let n = 0, i = e.length; n < i; n += t)
    r.push(e.substring(n, n + t));
  return r;
}
function pm(e) {
  const t = /* @__PURE__ */ new Map(), n = 2 + parseInt(e.charAt(0) + e.charAt(1), 10) * 2, i = e.substring(2, n), s = Pu(i, 2);
  for (let B = 0; B < s.length; B++) {
    const Q = s[B], G = Q.charAt(0), X = ys(Q.charAt(1));
    t.set(G, X);
  }
  const u = e.substring(n, e.length - 3), l = Pu(u, 4);
  for (let B = 0; B < l.length; B++) {
    const Q = l[B], G = Q.charAt(0), X = Q.charAt(1), ee = Q.charAt(2), ye = ys(Q.charAt(3));
    if (!t.has(X))
      throw new Error("missing node with id " + X);
    if (!t.has(ee))
      throw new Error("missing node with id " + ee);
    const ae = t.get(X), ce = t.get(ee), le = {
      l: ye,
      // level is first for prettier json output
      0: ae,
      1: ce
    };
    t.set(G, le);
  }
  const d = e.slice(-3), m = d.charAt(0), v = d.charAt(1), _ = ys(d.charAt(2)), C = t.get(m), I = t.get(v);
  return {
    l: _,
    0: C,
    1: I
  };
}
function mm(e, t, r) {
  let n = e, i = e.l;
  for (; ; ) {
    const s = t[i](r), u = hm(s);
    if (n = n[u], typeof n == "number" || typeof n == "string")
      return n;
    i = n.l;
  }
}
const vm = "14a1b,c+d2e5f0g/h.i4j*k-l)m(n6oeh6pnm6qen6ril6snh6tin6ubo9vce9wmh9xns9yne9zmi9{cm9|ad9}cp9~aq9ae9¡bf9¢bq9£cg9¤ck9¥cn9¦nd9§np9¨nq9©nf9ªng9«nm9¬nk9­mr9®ms9¯mt9°mj9±mk9²ml9³mn9´mc8µ³{8¶¯}8·°¤8¸³§8¹mn8º³«8»³m8¼m´4½z²4¾³w4¿zµ4À¯¶4Á°·4Â³º4Ã³¸4Äm¹4Åv¤7Æyn7ÇÀÁ7È~7É¥¤7ÊÃÄ7Ë¨n7Ìº¹7Í­°7Î®m7Ï¯°7Ð±m7Ñ³m7Ò¼m5ÓÄm5Ô¹m5Õ½°5Ö¾m5×¿°5ØÇÏ5ÙÂm5ÚÊÑ5Û±m5Üºm5ÝÌÑ5ÞÕÍ2ß|2à¡u2á£Å2âÖÎ2ã¦Æ2ä©x2åªÆ2æ×Ø2ç|È2è¡¢2é£É2ê¤¥2ëÙÚ2ì¦Ë2í©n2îªn2ïÛÐ2ðÜÝ2ñ¬n2òÒÓ/óan/ôbn/õcn/öÞâ/÷ßã/øàä/ùáå/úæë/ûçì/üèí/ýéî/þÍÎ/ÿÏÑ/ĀòÔ,ācn,Ăöï,ă¤ñ,Ąúð,ąêñ,ĆþÐ,ćÿÑ,Ĉac0ĉbc0Ċóõ0ċôā0Čßá0čà¤0Ďçé0ďèê0Đ÷ù0đøă0Ēûý0ēüą0ĔmÒ-ĕmĀ-ĖÞæ-ėČĎ-Ęčď-ęĂĄ-ĚĐĒ-ěđē-Ĝ²»-ĝÍÏ-ĞĆć-ğ²³-ĠĔĈ3ġĕĊ3ĢĖė3ģęĚ3ĤĢĝ(ĥĜğ(ĦģĞ(ħĠġ+Ĩĉċ+ĩĤĦ+ĪĘě+īħĨ1ĬĩĪ1ĭĬī*Įĥm*ĭĮ.";
let gs;
function ym() {
  return gs || (gs = pm(vm)), gs;
}
const gm = (e) => mm(ym(), Jp, e);
function bm(e) {
  const t = gm(e);
  return lm[t];
}
function _m(e, t, r, n, i) {
  const s = fm[e];
  return s({
    queryParams: t,
    changeEvent: r,
    previousResults: n,
    keyDocumentMap: i
  }), n;
}
var Yr = "￿", Jr = Number.MIN_SAFE_INTEGER;
function wm(e, t) {
  var r = t.selector, n = e.indexes ? e.indexes.slice(0) : [];
  t.index && (n = [t.index]);
  var i = !!t.sort.find((v) => Object.values(v)[0] === "desc"), s = /* @__PURE__ */ new Set();
  Object.keys(r).forEach((v) => {
    var _ = Bt(e, v);
    _ && _.type === "boolean" && Object.prototype.hasOwnProperty.call(r[v], "$eq") && s.add(v);
  });
  var u = t.sort.map((v) => Object.keys(v)[0]), l = u.filter((v) => !s.has(v)).join(","), d = -1, m;
  if (n.forEach((v) => {
    var _ = !0, C = !0, I = v.map((X) => {
      var ee = r[X], ye = ee ? Object.keys(ee) : [], ae = {};
      if (!ee || !ye.length) {
        var ce = C ? Jr : Yr;
        ae = {
          startKey: ce,
          endKey: _ ? Yr : Jr,
          inclusiveStart: !0,
          inclusiveEnd: !0
        };
      } else
        ye.forEach((le) => {
          if (Oo.has(le)) {
            var be = ee[le], Me = Sm(le, be);
            ae = Object.assign(ae, Me);
          }
        });
      return typeof ae.startKey > "u" && (ae.startKey = Jr), typeof ae.endKey > "u" && (ae.endKey = Yr), typeof ae.inclusiveStart > "u" && (ae.inclusiveStart = !0), typeof ae.inclusiveEnd > "u" && (ae.inclusiveEnd = !0), C && !ae.inclusiveStart && (C = !1), _ && !ae.inclusiveEnd && (_ = !1), ae;
    }), M = I.map((X) => X.startKey), B = I.map((X) => X.endKey), Q = {
      index: v,
      startKeys: M,
      endKeys: B,
      inclusiveEnd: _,
      inclusiveStart: C,
      sortSatisfiedByIndex: !i && l === v.filter((X) => !s.has(X)).join(","),
      selectorSatisfiedByIndex: Om(v, t.selector, M, B)
    }, G = Em(e, t, Q);
    (G >= d || t.index) && (d = G, m = Q);
  }), !m)
    throw $("SNH", {
      query: t
    });
  return m;
}
var Oo = /* @__PURE__ */ new Set(["$eq", "$gt", "$gte", "$lt", "$lte"]), xm = /* @__PURE__ */ new Set(["$eq", "$gt", "$gte"]), km = /* @__PURE__ */ new Set(["$eq", "$lt", "$lte"]);
function Om(e, t, r, n) {
  var i = Object.entries(t), s = i.find(([le, be]) => {
    if (!e.includes(le))
      return !0;
    var Me = Object.entries(be).find(([dt, Mr]) => !Oo.has(dt));
    return Me;
  });
  if (s || t.$and || t.$or)
    return !1;
  var u = [], l = /* @__PURE__ */ new Set();
  for (var [d, m] of Object.entries(t)) {
    if (!e.includes(d))
      return !1;
    var v = Object.keys(m).filter((le) => xm.has(le));
    if (v.length > 1)
      return !1;
    var _ = v[0];
    if (_ && l.add(d), _ !== "$eq") {
      if (u.length > 0)
        return !1;
      u.push(_);
    }
  }
  var C = [], I = /* @__PURE__ */ new Set();
  for (var [M, B] of Object.entries(t)) {
    if (!e.includes(M))
      return !1;
    var Q = Object.keys(B).filter((le) => km.has(le));
    if (Q.length > 1)
      return !1;
    var G = Q[0];
    if (G && I.add(M), G !== "$eq") {
      if (C.length > 0)
        return !1;
      C.push(G);
    }
  }
  var X = 0;
  for (var ee of e) {
    for (var ye of [l, I]) {
      if (!ye.has(ee) && ye.size > 0)
        return !1;
      ye.delete(ee);
    }
    var ae = r[X], ce = n[X];
    if (ae !== ce && l.size > 0 && I.size > 0)
      return !1;
    X++;
  }
  return !0;
}
function Sm(e, t) {
  switch (e) {
    case "$eq":
      return {
        startKey: t,
        endKey: t,
        inclusiveEnd: !0,
        inclusiveStart: !0
      };
    case "$lte":
      return {
        endKey: t,
        inclusiveEnd: !0
      };
    case "$gte":
      return {
        startKey: t,
        inclusiveStart: !0
      };
    case "$lt":
      return {
        endKey: t,
        inclusiveEnd: !1
      };
    case "$gt":
      return {
        startKey: t,
        inclusiveStart: !1
      };
    default:
      throw new Error("SNH");
  }
}
function Em(e, t, r) {
  var n = 0, i = (v) => {
    v > 0 && (n = n + v);
  }, s = 10, u = fs(r.startKeys, (v) => v !== Jr && v !== Yr);
  i(u * s);
  var l = fs(r.startKeys, (v) => v !== Yr && v !== Jr);
  i(l * s);
  var d = fs(r.startKeys, (v, _) => v === r.endKeys[_]);
  i(d * s * 1.5);
  var m = r.sortSatisfiedByIndex ? 5 : 0;
  return i(m), n;
}
class dn extends Error {
}
const Cm = 2147483647, Rm = -2147483648, Dm = Number.MAX_SAFE_INTEGER, Im = Number.MIN_SAFE_INTEGER, Ir = Symbol("missing"), bl = Object.freeze(
  new Error("mingo: cycle detected while processing object/array")
), Pm = "[object Object]", Tm = /^\[object ([a-zA-Z0-9]+)\]$/, ba = (e) => {
  const t = jm(e);
  let r = 0, n = t.length;
  for (; n; )
    r = (r << 5) - r ^ t.charCodeAt(--n);
  return r >>> 0;
}, _l = /* @__PURE__ */ new Set([
  "null",
  "undefined",
  "boolean",
  "number",
  "string",
  "date",
  "regexp"
]), Am = {
  null: 0,
  undefined: 0,
  number: 1,
  string: 2,
  object: 3,
  array: 4,
  boolean: 5,
  date: 6,
  regexp: 7,
  function: 8
}, ft = (e, t) => {
  e === Ir && (e = void 0), t === Ir && (t = void 0);
  const [r, n] = [e, t].map(
    (i) => Am[ii(i).toLowerCase()]
  );
  return r !== n ? r - n : r === 1 || r === 2 || r === 6 ? e < t ? -1 : e > t ? 1 : 0 : nr(e, t) ? 0 : e < t ? -1 : e > t ? 1 : 0;
};
function it(e, t) {
  if (!e)
    throw new dn(t);
}
const ii = (e) => Tm.exec(Object.prototype.toString.call(e))[1], bs = (e) => typeof e == "boolean", $t = (e) => typeof e == "string", Qt = (e) => !isNaN(e) && typeof e == "number", Le = Array.isArray, Re = (e) => {
  if (!e)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === Object.prototype || t === null) && Pm === Object.prototype.toString.call(e);
}, _a = (e) => e === Object(e), Us = (e) => e instanceof Date, Bn = (e) => e instanceof RegExp, wl = (e) => typeof e == "function", Ae = (e) => e == null, cn = (e, t) => e.includes(t), xl = (e, t) => !cn(e, t), Mm = (e, t = !0) => !!e || t && e === "", hn = (e) => Ae(e) || $t(e) && !e || e instanceof Array && e.length === 0 || Re(e) && Object.keys(e).length === 0, Tu = (e) => e === Ir, ci = (e) => e instanceof Array ? e : [e], Jt = (e, t) => !!e && Object.prototype.hasOwnProperty.call(e, t), So = (e) => typeof ArrayBuffer < "u" && ArrayBuffer.isView(e), Nm = [Us, Bn, So], Ws = (e, t) => {
  if (Ae(e))
    return e;
  if (t.has(e))
    throw bl;
  const r = e.constructor;
  if (Nm.some((n) => n(e)))
    return new r(e);
  try {
    if (t.add(e), Le(e))
      return e.map((n) => Ws(n, t));
    if (Re(e)) {
      const n = {};
      for (const i in e)
        n[i] = Ws(e[i], t);
      return n;
    }
  } finally {
    t.delete(e);
  }
  return e;
}, Au = (e) => Ws(e, /* @__PURE__ */ new Set()), Bm = (e, t) => Re(e) && Re(t) || Le(e) && Le(t);
function zs(e, t, r) {
  if (r = r || { flatten: !1 }, Tu(e) || Ae(e))
    return t;
  if (Tu(t) || Ae(t))
    return e;
  if (!Bm(e, t)) {
    if (r.skipValidation)
      return t || e;
    throw Error("mismatched types. must both be array or object");
  }
  if (r.skipValidation = !0, Le(e)) {
    const n = e, i = t;
    if (r.flatten) {
      let s = 0, u = 0;
      for (; s < n.length && u < i.length; )
        n[s] = zs(n[s++], i[u++], r);
      for (; u < i.length; )
        n.push(t[u++]);
    } else
      li(n, i);
  } else
    for (const n in t)
      e[n] = zs(
        e[n],
        t[n],
        r
      );
  return e;
}
function Mu(e, t = ba) {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((n, i) => {
    const s = Sl(n, t);
    r.has(s) ? r.get(s).some((u) => nr(e[u], n)) || r.get(s).push(i) : r.set(s, [i]);
  }), r;
}
function kl(e, t = ba) {
  if (e.some((l) => l.length == 0))
    return [];
  if (e.length === 1)
    return Array.from(e);
  const r = Lm(
    e.map((l, d) => [d, l.length]),
    (l) => l[1]
  ), n = e[r[0][0]], i = Mu(n, t), s = /* @__PURE__ */ new Map(), u = new Array();
  return i.forEach((l, d) => {
    const m = l.map((I) => n[I]), v = m.map((I) => 0), _ = m.map((I) => [r[0][0], 0]);
    let C = !1;
    for (let I = 1; I < e.length; I++) {
      const [M, B] = r[I], Q = e[M];
      if (s.has(I) || s.set(I, Mu(Q)), s.get(I).has(d)) {
        const G = s.get(I).get(d).map((X) => Q[X]);
        C = m.map(
          (X, ee) => G.some((ye, ae) => {
            const ce = v[ee];
            return nr(X, ye) && (v[ee]++, M < _[ee][0] && (_[ee] = [M, s.get(I).get(d)[ae]])), ce < v[ee];
          })
        ).some(Boolean);
      }
      if (!C)
        return;
    }
    C && li(
      u,
      v.map((I, M) => I === e.length - 1 ? [m[M], _[M]] : Ir).filter((I) => I !== Ir)
    );
  }), u.sort((l, d) => {
    const [m, [v, _]] = l, [C, [I, M]] = d, B = ft(v, I);
    return B !== 0 ? B : ft(_, M);
  }).map((l) => l[0]);
}
function Ol(e, t = 0) {
  const r = new Array();
  function n(i, s) {
    for (let u = 0, l = i.length; u < l; u++)
      Le(i[u]) && (s > 0 || s < 0) ? n(i[u], Math.max(-1, s - 1)) : r.push(i[u]);
  }
  return n(e, t), r;
}
const $m = (e) => {
  let [t, r] = [
    Object.getPrototypeOf(e),
    Object.getOwnPropertyNames(e)
  ], n = t;
  for (; !r.length && t !== Object.prototype && t !== Array.prototype; )
    n = t, r = Object.getOwnPropertyNames(t), t = Object.getPrototypeOf(t);
  const i = {};
  return r.forEach((s) => i[s] = e[s]), [i, n];
};
function nr(e, t) {
  if (e === t || Object.is(e, t))
    return !0;
  const r = !!e && e.constructor || e;
  if (e === null || t === null || e === void 0 || t === void 0 || r !== t.constructor || r === Function)
    return !1;
  if (r === Array || r === Object) {
    const s = Object.keys(e), u = Object.keys(t);
    if (s.length !== u.length || (/* @__PURE__ */ new Set([...s, ...u])).size != s.length)
      return !1;
    for (const l of s)
      if (!nr(e[l], t[l]))
        return !1;
    return !0;
  }
  const n = Object.getPrototypeOf(e);
  return (So(e) || n !== Object.prototype && n !== Array.prototype && Object.prototype.hasOwnProperty.call(n, "toString")) && e.toString() === t.toString();
}
const zi = (e, t) => {
  if (e === null)
    return "null";
  if (e === void 0)
    return "undefined";
  const r = e.constructor;
  switch (r) {
    case RegExp:
    case Number:
    case Boolean:
    case Function:
    case Symbol:
      return e.toString();
    case String:
      return JSON.stringify(e);
    case Date:
      return e.toISOString();
  }
  if (So(e))
    return r.name + "[" + e.toString() + "]";
  if (t.has(e))
    throw bl;
  try {
    if (t.add(e), Le(e))
      return "[" + e.map((u) => zi(u, t)).join(",") + "]";
    if (r === Object)
      return "{" + Object.keys(e).sort().map((u) => u + ":" + zi(e[u], t)).join(",") + "}";
    const n = Object.getPrototypeOf(e);
    if (n !== Object.prototype && n !== Array.prototype && Object.prototype.hasOwnProperty.call(n, "toString"))
      return r.name + "(" + JSON.stringify(e.toString()) + ")";
    const [i, s] = $m(e);
    return r.name + zi(i, t);
  } finally {
    t.delete(e);
  }
}, jm = (e) => zi(e, /* @__PURE__ */ new Set());
function Sl(e, t) {
  return t = t || ba, Ae(e) ? null : t(e).toString();
}
function Lm(e, t, r = ft) {
  if (hn(e))
    return e;
  const n = new Array(), i = new Array();
  for (let s = 0; s < e.length; s++) {
    const u = e[s], l = t(u, s);
    Ae(l) ? i.push(u) : n.push([l, u]);
  }
  return n.sort((s, u) => r(s[0], u[0])), li(
    i,
    n.map((s) => s[1])
  );
}
function qm(e, t, r = ba) {
  if (e.length < 1)
    return /* @__PURE__ */ new Map();
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let s = 0; s < e.length; s++) {
    const u = e[s], l = t(u, s), d = Sl(l, r);
    if (d === null)
      i.has(null) ? i.get(null).push(u) : i.set(null, [u]);
    else {
      const m = n.has(d) ? n.get(d).find((v) => nr(v, l)) : null;
      Ae(m) ? (i.set(l, [u]), n.has(d) ? n.get(d).push(l) : n.set(d, [l])) : i.get(m).push(u);
    }
  }
  return i;
}
const _s = 5e4;
function li(e, ...t) {
  return e instanceof Array ? t.reduce(
    (r, n) => {
      let i = Math.ceil(n.length / _s), s = 0;
      for (; i-- > 0; )
        Array.prototype.push.apply(
          r,
          n.slice(s, s + _s)
        ), s += _s;
      return r;
    },
    e
  ) : t.filter(_a).reduce((r, n) => (Object.assign(r, n), r), e);
}
function Vs(e, t) {
  return _a(e) ? e[t] : void 0;
}
function Fm(e, t) {
  if (t < 1)
    return e;
  for (; t-- && e.length === 1; )
    e = e[0];
  return e;
}
function Eo(e, t, r) {
  let n = 0;
  function i(u, l) {
    let d = u;
    for (let m = 0; m < l.length; m++) {
      const v = l[m];
      if (/^\d+$/.exec(v) === null && d instanceof Array) {
        if (m === 0 && n > 0)
          break;
        n += 1;
        const C = l.slice(m);
        d = d.reduce((I, M) => {
          const B = i(M, C);
          return B !== void 0 && I.push(B), I;
        }, []);
        break;
      } else
        d = Vs(d, v);
      if (d === void 0)
        break;
    }
    return d;
  }
  const s = _l.has(ii(e).toLowerCase()) ? e : i(e, t.split("."));
  return s instanceof Array && (r != null && r.unwrapArray) ? Fm(s, n) : s;
}
function Vi(e, t, r) {
  const n = t.split("."), i = n[0], s = n.slice(1).join("."), u = /^\d+$/.exec(i) !== null, l = n.length > 1;
  let d, m;
  if (e instanceof Array)
    if (u)
      d = Vs(e, Number(i)), l && (d = Vi(d, s, r)), d = [d];
    else {
      d = [];
      for (const v of e)
        m = Vi(v, t, r), r != null && r.preserveMissing ? (m === void 0 && (m = Ir), d.push(m)) : m !== void 0 && d.push(m);
    }
  else {
    if (m = Vs(e, i), l && (m = Vi(m, s, r)), m === void 0)
      return;
    d = r != null && r.preserveKeys ? { ...e } : {}, d[i] = m;
  }
  return d;
}
function Hs(e) {
  if (e instanceof Array)
    for (let t = e.length - 1; t >= 0; t--)
      e[t] === Ir ? e.splice(t, 1) : Hs(e[t]);
  else if (Re(e))
    for (const t in e)
      Jt(e, t) && Hs(e[t]);
}
const Nu = /^\d+$/;
function ia(e, t, r, n) {
  const i = t.split("."), s = i[0], u = i.slice(1).join(".");
  if (i.length === 1)
    (Re(e) || Le(e) && Nu.test(s)) && r(e, s);
  else {
    n != null && n.buildGraph && Ae(e[s]) && (e[s] = {});
    const l = e[s];
    if (!l)
      return;
    const d = !!(i.length > 1 && Nu.test(i[1]));
    l instanceof Array && (n != null && n.descendArray) && !d ? l.forEach((m) => ia(m, u, r, n)) : ia(l, u, r, n);
  }
}
function Km(e, t, r) {
  ia(
    e,
    t,
    (n, i) => {
      n[i] = wl(r) ? r(n[i]) : r;
    },
    { buildGraph: !0 }
  );
}
function Bu(e, t, r) {
  ia(
    e,
    t,
    (n, i) => {
      if (n instanceof Array) {
        if (/^\d+$/.test(i))
          n.splice(parseInt(i), 1);
        else if (r && r.descendArray)
          for (const s of n)
            Re(s) && delete s[i];
      } else Re(n) && delete n[i];
    },
    r
  );
}
const Um = /^\$[a-zA-Z0-9_]+$/;
function pn(e) {
  return Um.test(e);
}
function El(e) {
  if (_l.has(ii(e).toLowerCase()))
    return Bn(e) ? { $regex: e } : { $eq: e };
  if (_a(e)) {
    if (!Object.keys(e).some(pn))
      return { $eq: e };
    if (Jt(e, "$regex")) {
      const r = { ...e };
      return r.$regex = new RegExp(
        e.$regex,
        e.$options
      ), delete r.$options, r;
    }
  }
  return e;
}
var Mn = /* @__PURE__ */ ((e) => (e.CLONE_ALL = "CLONE_ALL", e.CLONE_INPUT = "CLONE_INPUT", e.CLONE_OUTPUT = "CLONE_OUTPUT", e.CLONE_OFF = "CLONE_OFF", e))(Mn || {});
class kr {
  constructor(t, r, n, i = Date.now()) {
    this._opts = t, this._root = r, this._local = n, this.timestamp = i, this.update(r, n);
  }
  /**
   * Initialize new ComputeOptions.
   *
   * @param options
   * @param root
   * @param local
   * @returns {ComputeOptions}
   */
  static init(t, r, n) {
    return t instanceof kr ? new kr(
      t._opts,
      Ae(t.root) ? r : t.root,
      Object.assign({}, t.local, n)
    ) : new kr(t, r, n);
  }
  /** Updates the internal mutable state. */
  update(t, r) {
    var n;
    return this._root = t, this._local = r && Object.assign({}, r, {
      variables: Object.assign({}, (n = this._local) == null ? void 0 : n.variables, r == null ? void 0 : r.variables)
    }), this;
  }
  getOptions() {
    return Object.freeze({
      ...this._opts,
      context: Pr.from(this._opts.context)
    });
  }
  get root() {
    return this._root;
  }
  get local() {
    return this._local;
  }
  get idKey() {
    return this._opts.idKey;
  }
  get collation() {
    var t;
    return (t = this._opts) == null ? void 0 : t.collation;
  }
  get processingMode() {
    var t;
    return ((t = this._opts) == null ? void 0 : t.processingMode) || "CLONE_OFF";
  }
  get useStrictMode() {
    var t;
    return (t = this._opts) == null ? void 0 : t.useStrictMode;
  }
  get scriptEnabled() {
    var t;
    return (t = this._opts) == null ? void 0 : t.scriptEnabled;
  }
  get useGlobalContext() {
    var t;
    return (t = this._opts) == null ? void 0 : t.useGlobalContext;
  }
  get hashFunction() {
    var t;
    return (t = this._opts) == null ? void 0 : t.hashFunction;
  }
  get collectionResolver() {
    var t;
    return (t = this._opts) == null ? void 0 : t.collectionResolver;
  }
  get jsonSchemaValidator() {
    var t;
    return (t = this._opts) == null ? void 0 : t.jsonSchemaValidator;
  }
  get variables() {
    var t;
    return (t = this._opts) == null ? void 0 : t.variables;
  }
  get context() {
    var t;
    return (t = this._opts) == null ? void 0 : t.context;
  }
}
function Cl(e) {
  return e instanceof kr ? e.getOptions() : Object.freeze({
    idKey: "_id",
    scriptEnabled: !0,
    useStrictMode: !0,
    useGlobalContext: !0,
    processingMode: "CLONE_OFF",
    ...e,
    context: e != null && e.context ? Pr.from(e == null ? void 0 : e.context) : Pr.init({})
  });
}
var ln = /* @__PURE__ */ ((e) => (e.ACCUMULATOR = "accumulator", e.EXPRESSION = "expression", e.PIPELINE = "pipeline", e.PROJECTION = "projection", e.QUERY = "query", e.WINDOW = "window", e))(ln || {});
class Pr {
  constructor(t) {
    this.operators = {
      accumulator: {},
      expression: {},
      pipeline: {},
      projection: {},
      query: {},
      window: {}
    };
    for (const [r, n] of Object.entries(t))
      this.addOperators(r, n);
  }
  static init(t = {}) {
    return new Pr(t);
  }
  static from(t) {
    return new Pr(t.operators);
  }
  addOperators(t, r) {
    for (const [n, i] of Object.entries(r))
      this.getOperator(t, n) || (this.operators[t][n] = i);
    return this;
  }
  // register
  addAccumulatorOps(t) {
    return this.addOperators("accumulator", t);
  }
  addExpressionOps(t) {
    return this.addOperators("expression", t);
  }
  addQueryOps(t) {
    return this.addOperators("query", t);
  }
  addPipelineOps(t) {
    return this.addOperators("pipeline", t);
  }
  addProjectionOps(t) {
    return this.addOperators("projection", t);
  }
  addWindowOps(t) {
    return this.addOperators("window", t);
  }
  // getters
  getOperator(t, r) {
    return t in this.operators && this.operators[t][r] || null;
  }
}
const br = Pr.init();
function $u(e, t) {
  for (const [r, n] of Object.entries(t)) {
    it(
      wl(n) && pn(r),
      `'${r}' is not a valid operator`
    );
    const i = Or(e, r, null);
    it(
      !i || n === i,
      `${r} already exists for '${e}' operators. Cannot change operator function once registered.`
    );
  }
  switch (e) {
    case "accumulator":
      br.addAccumulatorOps(t);
      break;
    case "expression":
      br.addExpressionOps(t);
      break;
    case "pipeline":
      br.addPipelineOps(t);
      break;
    case "projection":
      br.addProjectionOps(t);
      break;
    case "query":
      br.addQueryOps(t);
      break;
    case "window":
      br.addWindowOps(t);
      break;
  }
}
function Or(e, t, r) {
  const { context: n, useGlobalContext: i } = r || {}, s = n ? n.getOperator(e, t) : null;
  return !s && i ? br.getOperator(e, t) : s;
}
const ju = {
  $$ROOT(e, t, r) {
    return r.root;
  },
  $$CURRENT(e, t, r) {
    return e;
  },
  $$REMOVE(e, t, r) {
  },
  $$NOW(e, t, r) {
    return new Date(r.timestamp);
  }
}, Zs = {
  $$KEEP(e, t, r) {
    return e;
  },
  $$PRUNE(e, t, r) {
  },
  $$DESCEND(e, t, r) {
    if (!Jt(t, "$cond"))
      return e;
    let n;
    for (const [i, s] of Object.entries(e))
      if (_a(s)) {
        if (s instanceof Array) {
          const u = [];
          for (let l of s)
            Re(l) && (l = Lu(l, t, r.update(l))), Ae(l) || u.push(l);
          n = u;
        } else
          n = Lu(
            s,
            t,
            r.update(s)
          );
        Ae(n) ? delete e[i] : e[i] = n;
      }
    return e;
  }
};
function yt(e, t, r, n) {
  var s;
  const i = kr.init(n, e);
  if (r = r || "", pn(r)) {
    const u = Or(
      "expression",
      r,
      n
    );
    if (u)
      return u(e, t, i);
    const l = Or(
      "accumulator",
      r,
      n
    );
    if (l)
      return e instanceof Array || (e = yt(e, t, null, i), t = null), it(e instanceof Array, `'${r}' target must be an array.`), l(
        e,
        t,
        // reset the root object for accumulators.
        i.update(null, i.local)
      );
    throw new dn(`operator '${r}' is not registered`);
  }
  if ($t(t) && t.length > 0 && t[0] === "$") {
    if (Jt(Zs, t))
      return t;
    let u = i.root;
    const l = t.split(".");
    if (Jt(ju, l[0]))
      u = ju[l[0]](
        e,
        null,
        i
      ), t = t.slice(l[0].length + 1);
    else if (l[0].slice(0, 2) === "$$") {
      u = Object.assign(
        {},
        i.variables,
        // global vars
        // current item is added before local variables because the binding may be changed.
        { this: e },
        (s = i.local) == null ? void 0 : s.variables
        // local vars
      );
      const d = l[0].slice(2);
      it(
        Jt(u, d),
        `Use of undefined variable: ${d}`
      ), t = t.slice(2);
    } else
      t = t.slice(1);
    return t === "" ? u : Eo(u, t);
  }
  if (Le(t))
    return t.map((u) => yt(e, u, null, i));
  if (Re(t)) {
    const u = {};
    for (const [l, d] of Object.entries(t))
      if (u[l] = yt(e, d, l, i), [
        "expression",
        "accumulator"
        /* ACCUMULATOR */
      ].some(
        (m) => !!Or(m, l, n)
      ))
        return it(
          Object.keys(t).length === 1,
          "Invalid aggregation expression '" + JSON.stringify(t) + "'"
        ), u[l];
    return u;
  }
  return t;
}
function Lu(e, t, r) {
  const n = yt(e, t, null, r);
  return Jt(Zs, n) ? Zs[n](e, t, r) : n;
}
function fn(e) {
  return e instanceof qu ? e : new qu(e);
}
function Wm(...e) {
  let t = 0;
  return fn(() => {
    for (; t < e.length; ) {
      const r = e[t].next();
      if (!r.done)
        return r;
      t++;
    }
    return { done: !0 };
  });
}
function zm(e) {
  return !!e && typeof e == "object" && (e == null ? void 0 : e.next) instanceof Function;
}
function Vm(e, t) {
  const r = e.slice(t + 1);
  e.splice(t), Array.prototype.push.apply(e, r);
}
const Qs = new Error();
function Hm(e, t, r) {
  let n = !1, i = -1, s = 0;
  return function(u) {
    try {
      e:
        for (; !n; ) {
          let l = e();
          i++;
          let d = -1;
          const m = t.length;
          let v = !1;
          for (; ++d < m; ) {
            const _ = t[d];
            switch (_.action) {
              case 0:
                l = _.func(l, i);
                break;
              case 1:
                if (!_.func(l, i))
                  continue e;
                break;
              case 2:
                --_.count, _.count || (v = !0);
                break;
              case 3:
                --_.count, _.count || Vm(t, d);
                continue e;
              default:
                break e;
            }
          }
          if (n = v, u)
            r[s++] = l;
          else
            return { value: l, done: !1 };
        }
    } catch (l) {
      if (l !== Qs)
        throw l;
    }
    return n = !0, { done: n };
  };
}
let qu = class {
  /**
   * @param {*} source An iterable object or function.
   *    Array - return one element per cycle
   *    Object{next:Function} - call next() for the next value (this also handles generator functions)
   *    Function - call to return the next value
   * @param {Function} fn An optional transformation function
   */
  constructor(t) {
    this.iteratees = [], this.yieldedValues = [], this.isDone = !1;
    let r;
    if (t instanceof Function && (t = { next: t }), zm(t)) {
      const n = t;
      r = () => {
        const i = n.next();
        if (i.done)
          throw Qs;
        return i.value;
      };
    } else if (t instanceof Array) {
      const n = t, i = n.length;
      let s = 0;
      r = () => {
        if (s < i)
          return n[s++];
        throw Qs;
      };
    } else if (!(t instanceof Function))
      throw new dn(
        "Lazy must be initialized with an array, generator, or function."
      );
    this.getNext = Hm(r, this.iteratees, this.yieldedValues);
  }
  /**
   * Add an iteratee to this lazy sequence
   */
  push(t, r) {
    return typeof r == "function" ? this.iteratees.push({ action: t, func: r }) : typeof r == "number" && this.iteratees.push({ action: t, count: r }), this;
  }
  next() {
    return this.getNext();
  }
  // Iteratees methods
  /**
   * Transform each item in the sequence to a new value
   * @param {Function} f
   */
  map(t) {
    return this.push(0, t);
  }
  /**
   * Select only items matching the given predicate
   * @param {Function} pred
   */
  filter(t) {
    return this.push(1, t);
  }
  /**
   * Take given numbe for values from sequence
   * @param {Number} n A number greater than 0
   */
  take(t) {
    return t > 0 ? this.push(2, t) : this;
  }
  /**
   * Drop a number of values from the sequence
   * @param {Number} n Number of items to drop greater than 0
   */
  drop(t) {
    return t > 0 ? this.push(3, t) : this;
  }
  // Transformations
  /**
   * Returns a new lazy object with results of the transformation
   * The entire sequence is realized.
   *
   * @param {Callback<Source, RawArray>} fn Tranform function of type (Array) => (Any)
   */
  transform(t) {
    const r = this;
    let n;
    return fn(() => (n || (n = fn(t(r.value()))), n.next()));
  }
  // Terminal methods
  /**
   * Returns the fully realized values of the iterators.
   * The return value will be an array unless `lazy.first()` was used.
   * The realized values are cached for subsequent calls.
   */
  value() {
    return this.isDone || (this.isDone = this.getNext(!0).done), this.yieldedValues;
  }
  /**
   * Execute the funcion for each value. Will stop when an execution returns false.
   * @param {Function} f
   * @returns {Boolean} false iff `f` return false for AnyVal execution, otherwise true
   */
  each(t) {
    for (; ; ) {
      const r = this.next();
      if (r.done)
        break;
      if (t(r.value) === !1)
        return !1;
    }
    return !0;
  }
  /**
   * Returns the reduction of sequence according the reducing function
   *
   * @param {*} f a reducing function
   * @param {*} initialValue
   */
  reduce(t, r) {
    let n = this.next();
    for (r === void 0 && !n.done && (r = n.value, n = this.next()); !n.done; )
      r = t(r, n.value), n = this.next();
    return r;
  }
  /**
   * Returns the number of matched items in the sequence
   */
  size() {
    return this.reduce(
      (t, r) => ++t,
      0
    );
  }
  [Symbol.iterator]() {
    return this;
  }
};
class Zm {
  constructor(t, r) {
    this.pipeline = t, this.options = Cl(r);
  }
  /**
   * Returns an `Lazy` iterator for processing results of pipeline
   *
   * @param {*} collection An array or iterator object
   * @returns {Iterator} an iterator object
   */
  stream(t) {
    let r = fn(t);
    const n = this.options.processingMode;
    (n == Mn.CLONE_ALL || n == Mn.CLONE_INPUT) && r.map(Au);
    const i = new Array();
    if (!hn(this.pipeline))
      for (const s of this.pipeline) {
        const u = Object.keys(s), l = u[0], d = Or(
          ln.PIPELINE,
          l,
          this.options
        );
        it(
          u.length === 1 && !!d,
          `invalid pipeline operator ${l}`
        ), i.push(l), r = d(r, s[l], this.options);
      }
    return (n == Mn.CLONE_OUTPUT || n == Mn.CLONE_ALL && kl([["$group", "$unwind"], i]).length) && r.map(Au), r;
  }
  /**
   * Return the results of the aggregation as an array.
   *
   * @param {*} collection
   * @param {*} query
   */
  run(t) {
    return this.stream(t).value();
  }
}
class Qm {
  constructor(t, r, n, i) {
    this.source = t, this.predicate = r, this.projection = n, this.options = i, this.operators = [], this.result = null, this.buffer = [];
  }
  /** Returns the iterator from running the query */
  fetch() {
    return this.result ? this.result : (Re(this.projection) && this.operators.push({ $project: this.projection }), this.result = fn(this.source).filter(this.predicate), this.operators.length > 0 && (this.result = new Zm(this.operators, this.options).stream(
      this.result
    )), this.result);
  }
  /** Returns an iterator with the buffered data included */
  fetchAll() {
    const t = fn([...this.buffer]);
    return this.buffer = [], Wm(t, this.fetch());
  }
  /**
   * Return remaining objects in the cursor as an array. This method exhausts the cursor
   * @returns {Array}
   */
  all() {
    return this.fetchAll().value();
  }
  /**
   * Returns the number of objects return in the cursor. This method exhausts the cursor
   * @returns {Number}
   */
  count() {
    return this.all().length;
  }
  /**
   * Returns a cursor that begins returning results only after passing or skipping a number of documents.
   * @param {Number} n the number of results to skip.
   * @return {Cursor} Returns the cursor, so you can chain this call.
   */
  skip(t) {
    return this.operators.push({ $skip: t }), this;
  }
  /**
   * Constrains the size of a cursor's result set.
   * @param {Number} n the number of results to limit to.
   * @return {Cursor} Returns the cursor, so you can chain this call.
   */
  limit(t) {
    return this.operators.push({ $limit: t }), this;
  }
  /**
   * Returns results ordered according to a sort specification.
   * @param {Object} modifier an object of key and values specifying the sort order. 1 for ascending and -1 for descending
   * @return {Cursor} Returns the cursor, so you can chain this call.
   */
  sort(t) {
    return this.operators.push({ $sort: t }), this;
  }
  /**
   * Specifies the collation for the cursor returned by the `mingo.Query.find`
   * @param {*} spec
   */
  collation(t) {
    return this.options = { ...this.options, collation: t }, this;
  }
  /**
   * Returns the next document in a cursor.
   * @returns {Object | Boolean}
   */
  next() {
    if (this.buffer.length > 0)
      return this.buffer.pop();
    const t = this.fetch().next();
    if (!t.done)
      return t.value;
  }
  /**
   * Returns true if the cursor has documents and can be iterated.
   * @returns {boolean}
   */
  hasNext() {
    if (this.buffer.length > 0)
      return !0;
    const t = this.fetch().next();
    return t.done ? !1 : (this.buffer.push(t.value), !0);
  }
  /**
   * Applies a function to each document in a cursor and collects the return values in an array.
   * @param fn
   * @returns {Array}
   */
  map(t) {
    return this.all().map(t);
  }
  /**
   * Applies a JavaScript function for every document in a cursor.
   * @param fn
   */
  forEach(t) {
    this.all().forEach(t);
  }
  [Symbol.iterator]() {
    return this.fetchAll();
  }
}
class fi {
  constructor(t, r) {
    this.condition = t, this.options = Cl(r), this.compiled = [], this.compile();
  }
  compile() {
    it(
      Re(this.condition),
      `query criteria must be an object: ${JSON.stringify(this.condition)}`
    );
    const t = {};
    for (const [r, n] of Object.entries(this.condition)) {
      if (r === "$where")
        Object.assign(t, { field: r, expr: n });
      else if (cn(["$and", "$or", "$nor", "$expr", "$jsonSchema"], r))
        this.processOperator(r, r, n);
      else {
        it(!pn(r), `unknown top level operator: ${r}`);
        for (const [i, s] of Object.entries(
          El(n)
        ))
          this.processOperator(r, i, s);
      }
      t.field && this.processOperator(
        t.field,
        t.field,
        t.expr
      );
    }
  }
  processOperator(t, r, n) {
    const i = Or(
      ln.QUERY,
      r,
      this.options
    );
    if (!i)
      throw new dn(`unknown query operator ${r}`);
    const s = i(t, n, this.options);
    this.compiled.push(s);
  }
  /**
   * Checks if the object passes the query criteria. Returns true if so, false otherwise.
   *
   * @param obj The object to test
   * @returns {boolean} True or false
   */
  test(t) {
    for (let r = 0, n = this.compiled.length; r < n; r++)
      if (!this.compiled[r](t))
        return !1;
    return !0;
  }
  /**
   * Returns a cursor to select matching documents from the input source.
   *
   * @param source A source providing a sequence of documents
   * @param projection An optional projection criteria
   * @returns {Cursor} A Cursor for iterating over the results
   */
  find(t, r) {
    return new Qm(
      t,
      (n) => this.test(n),
      r || {},
      this.options
    );
  }
  /**
   * Remove matched documents from the collection returning the remainder
   *
   * @param collection An array of documents
   * @returns {Array} A new array with matching elements removed
   */
  remove(t) {
    return t.reduce((r, n) => (this.test(n) || r.push(n), r), []);
  }
}
const Gm = (e, t, r) => {
  if (hn(t) || !Re(t))
    return e;
  let n = ft;
  const i = r.collation;
  return Re(i) && $t(i.locale) && (n = Jm(i)), e.transform((s) => {
    const u = Object.keys(t);
    for (const l of u.reverse()) {
      const d = qm(
        s,
        (v) => Eo(v, l),
        r.hashFunction
      ), m = Array.from(d.keys()).sort(n);
      t[l] === -1 && m.reverse(), s = [], m.reduce(
        (v, _) => li(v, d.get(_)),
        s
      );
    }
    return s;
  });
}, Ym = {
  // Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.
  1: "base",
  //  Only strings that differ in base letters or accents and other diacritic marks compare as unequal.
  // Examples: a ≠ b, a ≠ á, a = A.
  2: "accent",
  // Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal.
  // Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A
  3: "variant"
  // case - Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.
};
function Jm(e) {
  const t = {
    sensitivity: Ym[e.strength || 3],
    caseFirst: e.caseFirst === "off" ? "false" : e.caseFirst || "false",
    numeric: e.numericOrdering || !1,
    ignorePunctuation: e.alternate === "shifted"
  };
  (e.caseLevel || !1) === !0 && (t.sensitivity === "base" && (t.sensitivity = "case"), t.sensitivity === "accent" && (t.sensitivity = "variant"));
  const r = new Intl.Collator(e.locale, t);
  return (n, i) => {
    if (!$t(n) || !$t(i))
      return ft(n, i);
    const s = r.compare(n, i);
    return s < 0 ? -1 : s > 0 ? 1 : 0;
  };
}
function Ue(e) {
  const t = (r, n, i) => {
    const s = { unwrapArray: !0 }, u = Math.max(1, r.split(".").length - 1);
    return (l) => {
      const d = Eo(l, r, s);
      return e(d, n, { ...i, depth: u });
    };
  };
  return t.op = "query", t;
}
function Rl(e, t, r) {
  if (nr(e, t) || Ae(e) && Ae(t))
    return !0;
  if (e instanceof Array) {
    const n = nr.bind(null, t);
    return e.some(n) || Ol(e, r == null ? void 0 : r.depth).some(n);
  }
  return !1;
}
function Xm(e, t, r) {
  return !Rl(e, t, r);
}
function Dl(e, t, r) {
  return Ae(e) ? t.some((n) => n === null) : kl([ci(e), t], r == null ? void 0 : r.hashFunction).length > 0;
}
function ev(e, t, r) {
  return !Dl(e, t, r);
}
function tv(e, t, r) {
  return wa(e, t, (n, i) => ft(n, i) < 0);
}
function rv(e, t, r) {
  return wa(e, t, (n, i) => ft(n, i) <= 0);
}
function nv(e, t, r) {
  return wa(e, t, (n, i) => ft(n, i) > 0);
}
function iv(e, t, r) {
  return wa(e, t, (n, i) => ft(n, i) >= 0);
}
function av(e, t, r) {
  return ci(e).some(
    (n) => t.length === 2 && n % t[0] === t[1]
  );
}
function sv(e, t, r) {
  const n = ci(e), i = (s) => $t(s) && Mm(t.exec(s), r == null ? void 0 : r.useStrictMode);
  return n.some(i) || Ol(n, 1).some(i);
}
function ov(e, t, r) {
  return (t === !1 || t === 0) && e === void 0 || (t === !0 || t === 1) && e !== void 0;
}
function uv(e, t, r) {
  if (!Le(e) || !Le(t) || !e.length || !t.length)
    return !1;
  let n = !0;
  for (const i of t) {
    if (!n)
      break;
    Re(i) && cn(Object.keys(i), "$elemMatch") ? n = Il(e, i.$elemMatch, r) : i instanceof RegExp ? n = e.some((s) => typeof s == "string" && i.test(s)) : n = e.some((s) => nr(i, s));
  }
  return n;
}
function cv(e, t, r) {
  return Array.isArray(e) && e.length === t;
}
function lv(e) {
  return pn(e) && ["$and", "$or", "$nor"].indexOf(e) === -1;
}
function Il(e, t, r) {
  if (Le(e) && !hn(e)) {
    let n = (u) => u, i = t;
    Object.keys(t).every(lv) && (i = { temp: t }, n = (u) => ({ temp: u }));
    const s = new fi(i, r);
    for (let u = 0, l = e.length; u < l; u++)
      if (s.test(n(e[u])))
        return !0;
  }
  return !1;
}
const Fu = (e) => e === null, Ku = (e) => Qt(e) && e >= Rm && e <= Cm && e.toString().indexOf(".") === -1, Uu = (e) => Qt(e) && e >= Im && e <= Dm && e.toString().indexOf(".") === -1, fv = {
  array: Le,
  bool: bs,
  boolean: bs,
  date: Us,
  decimal: Qt,
  double: Qt,
  int: Ku,
  long: Uu,
  number: Qt,
  null: Fu,
  object: Re,
  regex: Bn,
  regexp: Bn,
  string: $t,
  // added for completeness
  undefined: Ae,
  // deprecated
  function: (e) => {
    throw new dn("unsupported type key `function`.");
  },
  // Mongo identifiers
  1: Qt,
  //double
  2: $t,
  3: Re,
  4: Le,
  6: Ae,
  // deprecated
  8: bs,
  9: Us,
  10: Fu,
  11: Bn,
  16: Ku,
  18: Uu,
  19: Qt
  //decimal
};
function Wu(e, t, r) {
  const n = fv[t];
  return n ? n(e) : !1;
}
function dv(e, t, r) {
  return Array.isArray(t) ? t.findIndex((n) => Wu(e, n)) >= 0 : Wu(e, t);
}
function wa(e, t, r) {
  return ci(e).some((n) => ii(n) === ii(t) && r(n, t));
}
const zu = (e, t) => {
  const r = {};
  return e.split("").forEach((n, i) => r[n] = t * (i + 1)), r;
};
({
  ...zu("ABCDEFGHIKLM", 1),
  ...zu("NOPQRSTUVWXY", -1)
});
const Vu = {
  undefined: null,
  null: null,
  NaN: NaN,
  Infinity: new Error(),
  "-Infinity": new Error()
};
function Ye(e, t = Vu) {
  const r = Object.assign({}, Vu, t), n = new Set(Object.keys(r));
  return (i, s, u) => {
    const l = yt(i, s, null, u);
    if (n.has(`${l}`)) {
      const d = r[`${l}`];
      if (d instanceof Error)
        throw new dn(
          `cannot apply $${e.name} to -inf, value must in (-inf,inf)`
        );
      return d;
    }
    return e(l);
  };
}
Ye(Math.acos, {
  Infinity: 1 / 0,
  0: new Error()
});
Ye(Math.acosh, {
  Infinity: 1 / 0,
  0: new Error()
});
Ye(Math.asin);
Ye(Math.asinh, {
  Infinity: 1 / 0,
  "-Infinity": -1 / 0
});
Ye(Math.atan);
Ye(Math.atanh, {
  1: 1 / 0,
  "-1": -1 / 0
});
Ye(Math.cos);
Ye(Math.cosh, {
  "-Infinity": 1 / 0,
  Infinity: 1 / 0
  // [Math.PI]: -1,
});
const hv = Math.PI / 180;
Ye(
  (e) => e * hv,
  {
    Infinity: 1 / 0,
    "-Infinity": 1 / 0
  }
);
const pv = 180 / Math.PI;
Ye(
  (e) => e * pv,
  {
    Infinity: 1 / 0,
    "-Infinity": -1 / 0
  }
);
Ye(Math.sin);
Ye(Math.sinh, {
  "-Infinity": -1 / 0,
  Infinity: 1 / 0
});
Ye(Math.tan);
const mv = (e, t, r) => {
  if (hn(t))
    return e;
  let n = Object.keys(t), i = !1;
  Pl(t, r);
  const s = r.idKey;
  if (cn(n, s)) {
    const l = t[s];
    (l === 0 || l === !1) && (n = n.filter(
      xl.bind(null, [s])
    ), i = n.length == 0);
  } else
    n.push(s);
  const u = kr.init(r);
  return e.map((l) => Gs(
    l,
    t,
    u.update(l),
    n,
    i
  ));
};
function Gs(e, t, r, n, i) {
  let s = {}, u = !1, l = !1;
  const d = [];
  i && d.push(r.idKey);
  for (const m of n) {
    let v;
    const _ = t[m];
    if (m !== r.idKey && cn([0, !1], _) && (l = !0), m === r.idKey && hn(_))
      v = e[m];
    else if ($t(_))
      v = yt(e, _, m, r);
    else if (!cn([1, !0], _)) if (_ instanceof Array)
      v = _.map((I) => {
        const M = yt(e, I, null, r);
        return Ae(M) ? null : M;
      });
    else if (Re(_)) {
      const I = _, M = Object.keys(_), B = M.length == 1 ? M[0] : "", Q = Or(
        ln.PROJECTION,
        B,
        r
      );
      if (Q)
        B === "$slice" ? ci(I[B]).every(Qt) ? (v = Q(e, I[B], m, r), u = !0) : v = yt(e, I, m, r) : v = Q(e, I[B], m, r);
      else if (pn(B))
        v = yt(e, I[B], B, r);
      else if (Jt(e, m)) {
        Pl(I, r);
        let G = e[m];
        G instanceof Array ? v = G.map(
          (X) => Gs(X, I, r, M, !1)
        ) : (G = Re(G) ? G : e, v = Gs(
          G,
          I,
          r,
          M,
          !1
        ));
      } else
        v = yt(e, _, null, r);
    } else {
      d.push(m);
      continue;
    }
    const C = Vi(e, m, {
      preserveMissing: !0
    });
    C !== void 0 && zs(s, C, {
      flatten: !0
    }), xl([0, 1, !1, !0], _) && (v === void 0 ? Bu(s, m, { descendArray: !0 }) : Km(s, m, v));
  }
  if (Hs(s), (u || l || i) && (s = li({}, e, s), d.length > 0))
    for (const m of d)
      Bu(s, m, { descendArray: !0 });
  return s;
}
function Pl(e, t) {
  const r = [!1, !1];
  for (const [n, i] of Object.entries(e)) {
    if (n === (t == null ? void 0 : t.idKey))
      return;
    i === 0 || i === !1 ? r[0] = !0 : (i === 1 || i === !0) && (r[1] = !0), it(
      !(r[0] && r[1]),
      "Projection cannot have a mix of inclusion and exclusion."
    );
  }
}
const vv = (e, t, r) => {
  it(
    Le(t),
    "Invalid expression: $and expects value to be an Array."
  );
  const n = t.map((i) => new fi(i, r));
  return (i) => n.every((s) => s.test(i));
}, Tl = (e, t, r) => {
  it(Le(t), "Invalid expression. $or expects value to be an Array");
  const n = t.map((i) => new fi(i, r));
  return (i) => n.some((s) => s.test(i));
}, yv = (e, t, r) => {
  it(
    Le(t),
    "Invalid expression. $nor expects value to be an array."
  );
  const n = Tl("$or", t, r);
  return (i) => !n(i);
}, gv = (e, t, r) => {
  const n = {};
  n[e] = El(t);
  const i = new fi(n, r);
  return (s) => !i.test(s);
}, bv = Ue(Rl), _v = Ue(nv), wv = Ue(iv), xv = Ue(Dl), kv = Ue(tv), Ov = Ue(rv), Sv = Ue(Xm), Ev = Ue(ev), Cv = Ue(av), Rv = Ue(sv);
Ue(uv);
const Dv = Ue(Il), Iv = Ue(cv), Pv = Ue(ov), Tv = Ue(dv);
var Hu = !1;
function Av(e) {
  return Hu || ($u(ln.PIPELINE, {
    $sort: Gm,
    $project: mv
  }), $u(ln.QUERY, {
    $and: vv,
    $eq: bv,
    $elemMatch: Dv,
    $exists: Pv,
    $gt: _v,
    $gte: wv,
    $in: xv,
    $lt: kv,
    $lte: Ov,
    $ne: Sv,
    $nin: Ev,
    $mod: Cv,
    $nor: yv,
    $not: gv,
    $or: Tl,
    $regex: Rv,
    $size: Iv,
    $type: Tv
  }), Hu = !0), new fi(e);
}
function Ys(e, t) {
  var r = kt(e.primaryKey);
  t = Pe(t);
  var n = Jn(t);
  if (typeof n.skip != "number" && (n.skip = 0), n.selector ? (n.selector = n.selector, Object.entries(n.selector).forEach(([m, v]) => {
    (typeof v != "object" || v === null) && (n.selector[m] = {
      $eq: v
    });
  })) : n.selector = {}, n.index) {
    var i = uo(n.index);
    i.includes(r) || i.push(r), n.index = i;
  }
  if (n.sort) {
    var d = n.sort.find((m) => sh(m) === r);
    d || (n.sort = n.sort.slice(0), n.sort.push({
      [r]: "asc"
    }));
  } else if (n.index)
    n.sort = n.index.map((m) => ({
      [m]: "asc"
    }));
  else {
    if (e.indexes) {
      var s = /* @__PURE__ */ new Set();
      Object.entries(n.selector).forEach(([m, v]) => {
        var _ = !1;
        typeof v == "object" && v !== null ? _ = !!Object.keys(v).find((C) => Oo.has(C)) : _ = !0, _ && s.add(m);
      });
      var u = -1, l;
      e.indexes.forEach((m) => {
        var v = Zr(m) ? m : [m], _ = v.findIndex((C) => !s.has(C));
        _ > 0 && _ > u && (u = _, l = v);
      }), l && (n.sort = l.map((m) => ({
        [m]: "asc"
      })));
    }
    n.sort || (n.sort = [{
      [r]: "asc"
    }]);
  }
  return n;
}
function Al(e, t) {
  if (!t.sort)
    throw $("SNH", {
      query: t
    });
  var r = [];
  t.sort.forEach((i) => {
    var s = Object.keys(i)[0], u = Object.values(i)[0];
    r.push({
      key: s,
      direction: u,
      getValueFn: ah(s)
    });
  });
  var n = (i, s) => {
    for (var u = 0; u < r.length; ++u) {
      var l = r[u], d = l.getValueFn(i), m = l.getValueFn(s);
      if (d !== m) {
        var v = l.direction === "asc" ? ft(d, m) : ft(m, d);
        return v;
      }
    }
  };
  return n;
}
function Co(e, t) {
  if (!t.sort)
    throw $("SNH", {
      query: t
    });
  var r = Av(t.selector), n = (i) => r.test(i);
  return n;
}
async function Tn(e, t) {
  var r = await e.exec();
  if (!r)
    return null;
  if (Array.isArray(r))
    return Promise.all(r.map((i) => t(i)));
  if (r instanceof Map)
    return Promise.all([...r.values()].map((i) => t(i)));
  var n = await t(r);
  return n;
}
function Mv(e, t) {
  return !t.sort || t.sort.length === 0 ? [e] : t.sort.map((r) => Object.keys(r)[0]);
}
var Nv = /* @__PURE__ */ new WeakMap();
function Bv(e) {
  return Dr(Nv, e, () => {
    var t = e.collection, r = Ys(t.storageInstance.schema, Jn(e.mangoQuery)), n = t.schema.primaryPath, i = Al(t.schema.jsonSchema, r), s = (m, v) => {
      var _ = {
        docA: m,
        docB: v
      };
      return i(_.docA, _.docB);
    }, u = Co(t.schema.jsonSchema, r), l = (m) => {
      var v = {
        doc: m
      };
      return u(v.doc);
    }, d = {
      primaryKey: e.collection.schema.primaryPath,
      skip: r.skip,
      limit: r.limit,
      sortFields: Mv(n, r),
      sortComparator: s,
      queryMatcher: l
    };
    return d;
  });
}
function $v(e, t) {
  if (!e.collection.database.eventReduce)
    return {
      runFullQueryAgain: !0
    };
  var r = Bv(e), n = ke(e._result).docsData.slice(0), i = ke(e._result).docsDataMap, s = !1, u = t.map((d) => Pp(d)).filter(nh), l = u.find((d) => {
    var m = {
      queryParams: r,
      changeEvent: d,
      previousResults: n,
      keyDocumentMap: i
    }, v = bm(m);
    if (v === "runFullQueryAgain")
      return !0;
    if (v !== "doNothing")
      return s = !0, _m(v, r, d, n, i), !1;
  });
  return l ? {
    runFullQueryAgain: !0
  } : {
    runFullQueryAgain: !1,
    changed: s,
    newResults: n
  };
}
var jv = /* @__PURE__ */ function() {
  function e() {
    this._map = /* @__PURE__ */ new Map();
  }
  var t = e.prototype;
  return t.getByQuery = function(n) {
    var i = n.toString();
    return Dr(this._map, i, () => n);
  }, e;
}();
function Lv() {
  return new jv();
}
function Zu(e, t) {
  t.uncached = !0;
  var r = t.toString();
  e._map.delete(r);
}
function qv(e) {
  return e.refCount$.observers.length;
}
var Fv = 100, Kv = 30 * 1e3, Uv = (e, t) => (r, n) => {
  if (!(n._map.size < e)) {
    var i = rt() - t, s = [], u = Array.from(n._map.values());
    for (var l of u)
      if (!(qv(l) > 0)) {
        if (l._lastEnsureEqual === 0 && l._creationTime < i) {
          Zu(n, l);
          continue;
        }
        s.push(l);
      }
    var d = s.length - e;
    if (!(d <= 0)) {
      var m = s.sort((_, C) => _._lastEnsureEqual - C._lastEnsureEqual), v = m.slice(0, d);
      v.forEach((_) => Zu(n, _));
    }
  }
}, Ml = Uv(Fv, Kv), ws = /* @__PURE__ */ new WeakSet();
function Wv(e) {
  ws.has(e) || (ws.add(e), Sh().then(() => Rh(200)).then(() => {
    e.destroyed || e.cacheReplacementPolicy(e, e._queryCache), ws.delete(e);
  }));
}
var zv = /* @__PURE__ */ function() {
  function e(r, n, i) {
    this.cacheItemByDocId = /* @__PURE__ */ new Map(), this.tasks = /* @__PURE__ */ new Set(), this.registry = typeof FinalizationRegistry == "function" ? new FinalizationRegistry((s) => {
      var u = s.docId, l = this.cacheItemByDocId.get(u);
      l && (l[0].delete(s.revisionHeight), l[0].size === 0 && this.cacheItemByDocId.delete(u));
    }) : void 0, this.primaryPath = r, this.changes$ = n, this.documentCreator = i, n.subscribe((s) => {
      this.tasks.add(() => {
        for (var u = this.cacheItemByDocId, l = 0; l < s.length; l++) {
          var d = s[l], m = u.get(d.documentId);
          if (m) {
            var v = d.documentData;
            v || (v = d.previousDocumentData), m[1] = v;
          }
        }
      }), this.tasks.size <= 1 && ma().then(() => {
        this.processTasks();
      });
    });
  }
  var t = e.prototype;
  return t.processTasks = function() {
    if (this.tasks.size !== 0) {
      var n = Array.from(this.tasks);
      n.forEach((i) => i()), this.tasks.clear();
    }
  }, t.getLatestDocumentData = function(n) {
    this.processTasks();
    var i = ei(this.cacheItemByDocId, n);
    return i[1];
  }, t.getLatestDocumentDataIfExists = function(n) {
    this.processTasks();
    var i = this.cacheItemByDocId.get(n);
    if (i)
      return i[1];
  }, ar(e, [{
    key: "getCachedRxDocuments",
    get: function() {
      var r = Qu(this);
      return At(this, "getCachedRxDocuments", r);
    }
  }, {
    key: "getCachedRxDocument",
    get: function() {
      var r = Qu(this);
      return At(this, "getCachedRxDocument", (n) => r([n])[0]);
    }
  }]);
}();
function Qu(e) {
  var t = e.primaryPath, r = e.cacheItemByDocId, n = e.registry, i = Te.deepFreezeWhenDevMode, s = e.documentCreator, u = (l) => {
    for (var d = new Array(l.length), m = [], v = 0; v < l.length; v++) {
      var _ = l[v], C = _[t], I = Yn(_._rev), M = void 0, B = void 0, Q = r.get(C);
      Q ? (M = Q[0], B = M.get(I)) : (M = /* @__PURE__ */ new Map(), Q = [M, _], r.set(C, Q));
      var G = B ? B.deref() : void 0;
      G || (_ = i(_), G = s(_), M.set(I, Hv(G)), n && m.push(G)), d[v] = G;
    }
    return m.length > 0 && n && (e.tasks.add(() => {
      for (var X = 0; X < m.length; X++) {
        var ee = m[X];
        n.register(ee, {
          docId: ee.primary,
          revisionHeight: Yn(ee.revision)
        });
      }
    }), e.tasks.size <= 1 && ma().then(() => {
      e.processTasks();
    })), d;
  };
  return u;
}
function Nl(e, t) {
  var r = e.getCachedRxDocuments;
  return r(t);
}
var Vv = typeof WeakRef == "function", Hv = Vv ? Zv : Qv;
function Zv(e) {
  return new WeakRef(e);
}
function Qv(e) {
  return {
    deref() {
      return e;
    }
  };
}
var Gu = /* @__PURE__ */ function() {
  function e(r, n, i) {
    this.time = rt(), this.query = r, this.count = i, this.documents = Nl(this.query.collection._docCache, n);
  }
  var t = e.prototype;
  return t.getValue = function(n) {
    var i = this.query.op;
    if (i === "count")
      return this.count;
    if (i === "findOne") {
      var s = this.documents.length === 0 ? null : this.documents[0];
      if (!s && n)
        throw $("QU10", {
          collection: this.query.collection.name,
          query: this.query.mangoQuery,
          op: i
        });
      return s;
    } else return i === "findByIds" ? this.docsMap : this.documents.slice(0);
  }, ar(e, [{
    key: "docsData",
    get: function() {
      return At(this, "docsData", this.documents.map((r) => r._data));
    }
    // A key->document map, used in the event reduce optimization.
  }, {
    key: "docsDataMap",
    get: function() {
      var r = /* @__PURE__ */ new Map();
      return this.documents.forEach((n) => {
        r.set(n.primary, n._data);
      }), At(this, "docsDataMap", r);
    }
  }, {
    key: "docsMap",
    get: function() {
      for (var r = /* @__PURE__ */ new Map(), n = this.documents, i = 0; i < n.length; i++) {
        var s = n[i];
        r.set(s.primary, s);
      }
      return At(this, "docsMap", r);
    }
  }]);
}(), Gv = 0, Yv = function() {
  return ++Gv;
}, Bl = /* @__PURE__ */ function() {
  function e(r, n, i, s = {}) {
    this.id = Yv(), this._execOverDatabaseCount = 0, this._creationTime = rt(), this._lastEnsureEqual = 0, this.uncached = !1, this.refCount$ = new Cp(null), this._result = null, this._latestChangeEvent = -1, this._lastExecStart = 0, this._lastExecEnd = 0, this._ensureEqualQueue = _r, this.op = r, this.mangoQuery = n, this.collection = i, this.other = s, n || (this.mangoQuery = Hi()), this.isFindOneByIdQuery = ty(this.collection.schema.primaryPath, n);
  }
  var t = e.prototype;
  return t._setResultData = function(n) {
    if (typeof n > "u")
      throw $("QU18", {
        database: this.collection.database.name,
        collection: this.collection.name
      });
    if (typeof n == "number") {
      this._result = new Gu(this, [], n);
      return;
    } else n instanceof Map && (n = Array.from(n.values()));
    var i = new Gu(this, n, n.length);
    this._result = i;
  }, t._execOverDatabase = async function() {
    if (this._execOverDatabaseCount = this._execOverDatabaseCount + 1, this._lastExecStart = rt(), this.op === "count") {
      var n = this.getPreparedQuery(), i = await this.collection.storageInstance.count(n);
      if (i.mode === "slow" && !this.collection.database.allowSlowCount)
        throw $("QU14", {
          collection: this.collection,
          queryObj: this.mangoQuery
        });
      return i.count;
    }
    if (this.op === "findByIds") {
      var s = ke(this.mangoQuery.selector)[this.collection.schema.primaryPath].$in, u = /* @__PURE__ */ new Map(), l = [];
      if (s.forEach((v) => {
        var _ = this.collection._docCache.getLatestDocumentDataIfExists(v);
        if (_) {
          if (!_._deleted) {
            var C = this.collection._docCache.getCachedRxDocument(_);
            u.set(v, C);
          }
        } else
          l.push(v);
      }), l.length > 0) {
        var d = await this.collection.storageInstance.findDocumentsById(l, !1);
        d.forEach((v) => {
          var _ = this.collection._docCache.getCachedRxDocument(v);
          u.set(_.primary, _);
        });
      }
      return u;
    }
    var m = ey(this);
    return m.then((v) => (this._lastExecEnd = rt(), v));
  }, t.exec = async function(n) {
    if (n && this.op !== "findOne")
      throw $("QU9", {
        collection: this.collection.name,
        query: this.mangoQuery,
        op: this.op
      });
    await Yu(this);
    var i = ke(this._result);
    return i.getValue(n);
  }, t.toString = function() {
    var n = ra({
      op: this.op,
      query: this.mangoQuery,
      other: this.other
    }, !0), i = JSON.stringify(n);
    return this.toString = () => i, i;
  }, t.getPreparedQuery = function() {
    var n = {
      rxQuery: this,
      // can be mutated by the hooks so we have to deep clone first.
      mangoQuery: Ys(this.collection.schema.jsonSchema, this.mangoQuery)
    };
    n.mangoQuery.selector._deleted = {
      $eq: !1
    }, n.mangoQuery.index && n.mangoQuery.index.unshift("_deleted"), at("prePrepareQuery", n);
    var i = Ro(this.collection.schema.jsonSchema, n.mangoQuery);
    return this.getPreparedQuery = () => i, i;
  }, t.doesDocumentDataMatch = function(n) {
    return n._deleted ? !1 : this.queryMatcher(n);
  }, t.remove = function() {
    return this.exec().then((n) => Array.isArray(n) ? Promise.all(n.map((i) => i.remove())) : n.remove());
  }, t.incrementalRemove = function() {
    return Tn(this.asRxQuery, (n) => n.incrementalRemove());
  }, t.update = function(n) {
    throw ge("update");
  }, t.patch = function(n) {
    return Tn(this.asRxQuery, (i) => i.patch(n));
  }, t.incrementalPatch = function(n) {
    return Tn(this.asRxQuery, (i) => i.incrementalPatch(n));
  }, t.modify = function(n) {
    return Tn(this.asRxQuery, (i) => i.modify(n));
  }, t.incrementalModify = function(n) {
    return Tn(this.asRxQuery, (i) => i.incrementalModify(n));
  }, t.where = function(n) {
    throw ge("query-builder");
  }, t.sort = function(n) {
    throw ge("query-builder");
  }, t.skip = function(n) {
    throw ge("query-builder");
  }, t.limit = function(n) {
    throw ge("query-builder");
  }, ar(e, [{
    key: "$",
    get: function() {
      if (!this._$) {
        var r = this.collection.$.pipe(
          /**
           * Performance shortcut.
           * Changes to local documents are not relevant for the query.
           */
          Qe((n) => !n.isLocal),
          /**
           * Start once to ensure the querying also starts
           * when there where no changes.
           */
          ml(null),
          // ensure query results are up to date.
          ui(() => Yu(this)),
          // use the current result set, written by _ensureEqual().
          It(() => this._result),
          // do not run stuff above for each new subscriber, only once.
          pl(Bc),
          // do not proceed if result set has not changed.
          Ks((n, i) => !!(n && n.time === ke(i).time)),
          Qe((n) => !!n),
          /**
           * Map the result set to a single RxDocument or an array,
           * depending on query type
           */
          It((n) => ke(n).getValue())
        );
        this._$ = Tp(
          r,
          /**
           * Also add the refCount$ to the query observable
           * to allow us to count the amount of subscribers.
           */
          this.refCount$.pipe(Qe(() => !1))
        );
      }
      return this._$;
    }
  }, {
    key: "$$",
    get: function() {
      var r = this.collection.database.getReactivityFactory();
      return r.fromObservable(this.$, void 0, this.collection.database);
    }
    // stores the changeEvent-number of the last handled change-event
    // time stamps on when the last full exec over the database has run
    // used to properly handle events that happen while the find-query is running
    // TODO do we still need these properties?
    /**
     * ensures that the exec-runs
     * are not run in parallel
     */
  }, {
    key: "queryMatcher",
    get: function() {
      var r = this.collection.schema.jsonSchema, n = Ys(this.collection.schema.jsonSchema, this.mangoQuery);
      return At(this, "queryMatcher", Co(r, n));
    }
  }, {
    key: "asRxQuery",
    get: function() {
      return this;
    }
  }]);
}();
function Hi() {
  return {
    selector: {}
  };
}
function Jv(e) {
  return e.collection._queryCache.getByQuery(e);
}
function An(e, t, r, n) {
  at("preCreateRxQuery", {
    op: e,
    queryObj: t,
    collection: r,
    other: n
  });
  var i = new Bl(e, t, r, n);
  return i = Jv(i), Wv(r), i;
}
function $l(e) {
  var t = e.asRxQuery.collection._changeEventBuffer.getCounter();
  return e._latestChangeEvent >= t;
}
async function Yu(e) {
  return e.collection.awaitBeforeReads.size > 0 && await Promise.all(Array.from(e.collection.awaitBeforeReads).map((t) => t())), e.collection.database.destroyed || $l(e) ? !1 : (e._ensureEqualQueue = e._ensureEqualQueue.then(() => Xv(e)), e._ensureEqualQueue);
}
function Xv(e) {
  if (e._lastEnsureEqual = rt(), // db is closed
  e.collection.database.destroyed || // nothing happened since last run
  $l(e))
    return _r;
  var t = !1, r = !1;
  if (e._latestChangeEvent === -1 && (r = !0), !r) {
    var n = e.asRxQuery.collection._changeEventBuffer.getFrom(e._latestChangeEvent + 1);
    if (n === null)
      r = !0;
    else {
      e._latestChangeEvent = e.asRxQuery.collection._changeEventBuffer.getCounter();
      var i = e.asRxQuery.collection._changeEventBuffer.reduceByLastOfDoc(n);
      if (e.op === "count") {
        var s = ke(e._result).count, u = s;
        i.forEach((d) => {
          var m = d.previousDocumentData && e.doesDocumentDataMatch(d.previousDocumentData), v = e.doesDocumentDataMatch(d.documentData);
          !m && v && u++, m && !v && u--;
        }), u !== s && (t = !0, e._setResultData(u));
      } else {
        var l = $v(e, i);
        l.runFullQueryAgain ? r = !0 : l.changed && (t = !0, e._setResultData(l.newResults));
      }
    }
  }
  return r ? e._execOverDatabase().then((d) => (e._latestChangeEvent = e.collection._changeEventBuffer.getCounter(), typeof d == "number" ? ((!e._result || d !== e._result.count) && (t = !0, e._setResultData(d)), t) : ((!e._result || !uh(e.collection.schema.primaryPath, d, e._result.docsData)) && (t = !0, e._setResultData(d)), t))) : Promise.resolve(t);
}
function Ro(e, t) {
  if (!t.sort)
    throw $("SNH", {
      query: t
    });
  var r = wm(e, t);
  return {
    query: t,
    queryPlan: r
  };
}
async function ey(e) {
  var t = [], r = e.collection;
  if (e.isFindOneByIdQuery)
    if (Array.isArray(e.isFindOneByIdQuery)) {
      var n = e.isFindOneByIdQuery;
      if (n = n.filter((v) => {
        var _ = e.collection._docCache.getLatestDocumentDataIfExists(v);
        return _ ? (_._deleted || t.push(_), !1) : !0;
      }), n.length > 0) {
        var i = await r.storageInstance.findDocumentsById(n, !1);
        nn(t, i);
      }
    } else {
      var s = e.isFindOneByIdQuery, u = e.collection._docCache.getLatestDocumentDataIfExists(s);
      if (!u) {
        var l = await r.storageInstance.findDocumentsById([s], !1);
        l[0] && (u = l[0]);
      }
      u && !u._deleted && t.push(u);
    }
  else {
    var d = e.getPreparedQuery(), m = await r.storageInstance.query(d);
    t = m.documents;
  }
  return t;
}
function ty(e, t) {
  if (!t.skip && t.selector && Object.keys(t.selector).length === 1 && t.selector[e]) {
    var r = t.selector[e];
    if (typeof r == "string")
      return r;
    if (Object.keys(r).length === 1 && typeof r.$eq == "string" || Object.keys(r).length === 1 && Array.isArray(r.$eq) && // must only contain strings
    !r.$eq.find((n) => typeof n != "string"))
      return r.$eq;
  }
  return !1;
}
var ry = "_rxdb_internal";
async function ny(e, t) {
  var r = await e.findDocumentsById([t], !1), n = r[0];
  if (n)
    return n;
}
function aa(e, t, r, n) {
  if (n)
    throw n.status === 409 ? $("CONFLICT", {
      collection: e.name,
      id: t,
      writeError: n,
      data: r
    }) : n.status === 422 ? $("VD2", {
      collection: e.name,
      id: t,
      writeError: n,
      data: r
    }) : n;
}
function iy(e, t, r, n, i, s, u) {
  for (var l = !!e.schema.attachments, d = [], m = [], v = [], _ = va(10), C = {
    id: _,
    events: [],
    checkpoint: null,
    context: i,
    startTime: rt(),
    endTime: 0
  }, I = C.events, M = [], B = [], Q = [], G = r.size > 0, X, ee = n.length, ye = function() {
    var ce = n[ae], le = ce.document, be = ce.previous, Me = le[t], dt = le._deleted, Mr = be && be._deleted, ot = void 0;
    G && (ot = r.get(Me));
    var qe;
    if (ot) {
      var yn = ot._rev;
      if (!be || be && yn !== be._rev) {
        var Sa = {
          isError: !0,
          status: 409,
          documentId: Me,
          writeRow: ce,
          documentInDb: ot
        };
        return v.push(Sa), 1;
      }
      var Je = l ? xs(ce) : ce;
      l && (dt ? be && Object.keys(be._attachments).forEach((Ee) => {
        B.push({
          documentId: Me,
          attachmentId: Ee,
          digest: ke(be)._attachments[Ee].digest
        });
      }) : (Object.entries(le._attachments).find(([Ee, We]) => {
        var Ot = be ? be._attachments[Ee] : void 0;
        return !Ot && !We.data && (qe = {
          documentId: Me,
          documentInDb: ot,
          isError: !0,
          status: 510,
          writeRow: ce,
          attachmentId: Ee
        }), !0;
      }), qe || Object.entries(le._attachments).forEach(([Ee, We]) => {
        var Ot = be ? be._attachments[Ee] : void 0;
        if (!Ot)
          M.push({
            documentId: Me,
            attachmentId: Ee,
            attachmentData: We,
            digest: We.digest
          });
        else {
          var Ft = Je.document._attachments[Ee].digest;
          We.data && /**
           * Performance shortcut,
           * do not update the attachment data if it did not change.
           */
          Ot.digest !== Ft && Q.push({
            documentId: Me,
            attachmentId: Ee,
            attachmentData: We,
            digest: We.digest
          });
        }
      }))), qe ? v.push(qe) : (l ? m.push(xs(Je)) : m.push(Je), X = Je);
      var ut = null, Ve = null, qt = null;
      if (Mr && !dt)
        qt = "INSERT", ut = l ? Pt(le) : le;
      else if (be && !Mr && !dt)
        qt = "UPDATE", ut = l ? Pt(le) : le, Ve = be;
      else if (dt)
        qt = "DELETE", ut = ke(le), Ve = be;
      else
        throw $("SNH", {
          args: {
            writeRow: ce
          }
        });
      var Ea = {
        documentId: Me,
        documentData: ut,
        previousDocumentData: Ve,
        operation: qt
      };
      I.push(Ea);
    } else {
      var Oa = !!dt;
      if (l && Object.entries(le._attachments).forEach(([Ee, We]) => {
        We.data ? M.push({
          documentId: Me,
          attachmentId: Ee,
          attachmentData: We,
          digest: We.digest
        }) : (qe = {
          documentId: Me,
          isError: !0,
          status: 510,
          writeRow: ce,
          attachmentId: Ee
        }, v.push(qe));
      }), qe || (l ? d.push(xs(ce)) : d.push(ce), X = ce), !Oa) {
        var vn = {
          documentId: Me,
          operation: "INSERT",
          documentData: l ? Pt(le) : le,
          previousDocumentData: l && be ? Pt(be) : be
        };
        I.push(vn);
      }
    }
  }, ae = 0; ae < ee; ae++)
    ye();
  return {
    bulkInsertDocs: d,
    bulkUpdateDocs: m,
    newestRow: X,
    errors: v,
    eventBulk: C,
    attachmentsAdd: M,
    attachmentsRemove: B,
    attachmentsUpdate: Q
  };
}
function xs(e) {
  return {
    previous: e.previous,
    document: Pt(e.document)
  };
}
function ay(e) {
  return atob(e).length;
}
function sy(e) {
  var t = e.data;
  if (!t)
    return e;
  var r = {
    length: ay(t),
    digest: e.digest,
    type: e.type
  };
  return r;
}
function Pt(e) {
  if (!e._attachments || Object.keys(e._attachments).length === 0)
    return e;
  var t = Pe(e);
  return t._attachments = {}, Object.entries(e._attachments).forEach(([r, n]) => {
    t._attachments[r] = sy(n);
  }), t;
}
function xa(e) {
  return Object.assign({}, e, {
    _meta: Pe(e._meta)
  });
}
var jl = /* @__PURE__ */ new WeakMap();
function Ll(e, t, r) {
  Te.deepFreezeWhenDevMode(r);
  var n = kt(t.schema.primaryKey), i = {
    originalStorageInstance: t,
    schema: t.schema,
    internals: t.internals,
    collectionName: t.collectionName,
    databaseName: t.databaseName,
    options: t.options,
    bulkWrite(s, u) {
      for (var l = e.token, d = new Array(s.length), m = rt(), v = 0; v < s.length; v++) {
        var _ = s[v], C = xa(_.document);
        C._meta.lwt = m;
        var I = _.previous;
        C._rev = Ns(l, I), d[v] = {
          document: C,
          previous: I
        };
      }
      return at("preStorageWrite", {
        storageInstance: this.originalStorageInstance,
        rows: d
      }), e.lockedRun(() => t.bulkWrite(d, u)).then((M) => {
        var B = {
          error: []
        }, Q = ir(n, d, M);
        jl.set(B, Q);
        var G = M.error.length === 0 ? [] : M.error.filter((ee) => ee.status === 409 && !ee.writeRow.previous && !ee.writeRow.document._deleted && ke(ee.documentInDb)._deleted ? !0 : (B.error.push(ee), !1));
        if (G.length > 0) {
          var X = G.map((ee) => ({
            previous: ee.documentInDb,
            document: Object.assign({}, ee.writeRow.document, {
              _rev: Ns(e.token, ee.documentInDb)
            })
          }));
          return e.lockedRun(() => t.bulkWrite(X, u)).then((ee) => {
            nn(B.error, ee.error);
            var ye = ir(n, X, ee);
            return nn(Q, ye), B;
          });
        }
        return B;
      });
    },
    query(s) {
      return e.lockedRun(() => t.query(s));
    },
    count(s) {
      return e.lockedRun(() => t.count(s));
    },
    findDocumentsById(s, u) {
      return e.lockedRun(() => t.findDocumentsById(s, u));
    },
    getAttachmentData(s, u, l) {
      return e.lockedRun(() => t.getAttachmentData(s, u, l));
    },
    getChangedDocumentsSince: t.getChangedDocumentsSince ? (s, u) => e.lockedRun(() => t.getChangedDocumentsSince(ke(s), u)) : void 0,
    cleanup(s) {
      return e.lockedRun(() => t.cleanup(s));
    },
    remove() {
      return e.storageInstances.delete(i), e.lockedRun(() => t.remove());
    },
    close() {
      return e.storageInstances.delete(i), e.lockedRun(() => t.close());
    },
    changeStream() {
      return t.changeStream();
    },
    conflictResultionTasks() {
      return t.conflictResultionTasks();
    },
    resolveConflictResultionTask(s) {
      if (s.output.isEqual)
        return t.resolveConflictResultionTask(s);
      var u = Object.assign({}, s.output.documentData, {
        _meta: ha(),
        _rev: pa(),
        _attachments: {}
      }), l = Pe(u);
      return delete l._meta, delete l._rev, delete l._attachments, t.resolveConflictResultionTask({
        id: s.id,
        output: {
          isEqual: !1,
          documentData: l
        }
      });
    }
  };
  return e.storageInstances.add(i), i;
}
function oy(e) {
  if (e.schema.keyCompression)
    throw $("UT5", {
      args: {
        params: e
      }
    });
  if (uy(e.schema))
    throw $("UT6", {
      args: {
        params: e
      }
    });
  if (e.schema.attachments && e.schema.attachments.compression)
    throw $("UT7", {
      args: {
        params: e
      }
    });
}
function uy(e) {
  return !!(e.encrypted && e.encrypted.length > 0 || e.attachments && e.attachments.encrypted);
}
function ir(e, t, r) {
  var n = jl.get(r);
  if (n)
    return n;
  var i = [];
  if (r.error.length > 0) {
    for (var s = /* @__PURE__ */ new Set(), u = 0; u < r.error.length; u++) {
      var l = r.error[u];
      s.add(l.documentId);
    }
    for (var d = 0; d < t.length; d++) {
      var m = t[d].document;
      s.has(m[e]) || i.push(Pt(m));
    }
  } else {
    i.length = t.length - r.error.length;
    for (var v = 0; v < t.length; v++) {
      var _ = t[v].document;
      i[v] = Pt(_);
    }
  }
  return i;
}
var cy = /* @__PURE__ */ function() {
  function e(r, n, i, s) {
    this.queueByDocId = /* @__PURE__ */ new Map(), this.isRunning = !1, this.storageInstance = r, this.primaryPath = n, this.preWrite = i, this.postWrite = s;
  }
  var t = e.prototype;
  return t.addWrite = function(n, i) {
    var s = n[this.primaryPath], u = Dr(this.queueByDocId, s, () => []), l = new Promise((d, m) => {
      var v = {
        lastKnownDocumentState: n,
        modifier: i,
        resolve: d,
        reject: m
      };
      ke(u).push(v), this.triggerRun();
    });
    return l;
  }, t.triggerRun = async function() {
    if (!(this.isRunning === !0 || this.queueByDocId.size === 0)) {
      this.isRunning = !0;
      var n = [], i = this.queueByDocId;
      this.queueByDocId = /* @__PURE__ */ new Map(), await Promise.all(Array.from(i.entries()).map(async ([u, l]) => {
        var d = ly(l.map((_) => _.lastKnownDocumentState)), m = d;
        for (var v of l)
          try {
            m = await v.modifier(
              /**
               * We have to clone() each time because the modifier
               * might throw while it already changed some properties
               * of the document.
               */
              Jn(m)
            );
          } catch (_) {
            v.reject(_), v.reject = () => {
            }, v.resolve = () => {
            };
          }
        try {
          await this.preWrite(m, d);
        } catch (_) {
          l.forEach((C) => C.reject(_));
          return;
        }
        n.push({
          previous: d,
          document: m
        });
      }));
      var s = n.length > 0 ? await this.storageInstance.bulkWrite(n, "incremental-write") : {
        error: []
      };
      return await Promise.all(ir(this.primaryPath, n, s).map((u) => {
        var l = u[this.primaryPath];
        this.postWrite(u);
        var d = ei(i, l);
        d.forEach((m) => m.resolve(u));
      })), s.error.forEach((u) => {
        var l = u.documentId, d = ei(i, l), m = Kc(u);
        if (m) {
          var v = Dr(this.queueByDocId, l, () => []);
          d.reverse().forEach((C) => {
            C.lastKnownDocumentState = ke(m.documentInDb), ke(v).unshift(C);
          });
        } else {
          var _ = Lh(u);
          d.forEach((C) => C.reject(_));
        }
      }), this.isRunning = !1, this.triggerRun();
    }
  }, e;
}();
function Ju(e) {
  var t = async (r) => {
    var n = oh(r);
    n._deleted = r._deleted;
    var i = await e(n), s = Object.assign({}, i, {
      _meta: r._meta,
      _attachments: r._attachments,
      _rev: r._rev,
      _deleted: typeof i._deleted < "u" ? i._deleted : r._deleted
    });
    return typeof s._deleted > "u" && (s._deleted = !1), s;
  };
  return t;
}
function ly(e) {
  var t = e[0], r = Yn(t._rev);
  return e.forEach((n) => {
    var i = Yn(n._rev);
    i > r && (t = n, r = i);
  }), t;
}
var di = {
  get primaryPath() {
    var e = this;
    if (e.isInstanceOfRxDocument)
      return e.collection.schema.primaryPath;
  },
  get primary() {
    var e = this;
    if (e.isInstanceOfRxDocument)
      return e._data[e.primaryPath];
  },
  get revision() {
    var e = this;
    if (e.isInstanceOfRxDocument)
      return e._data._rev;
  },
  get deleted$() {
    var e = this;
    if (e.isInstanceOfRxDocument)
      return e.$.pipe(It((t) => t._data._deleted));
  },
  get deleted$$() {
    var e = this, t = e.collection.database.getReactivityFactory();
    return t.fromObservable(e.deleted$, e.getLatest().deleted, e.collection.database);
  },
  get deleted() {
    var e = this;
    if (e.isInstanceOfRxDocument)
      return e._data._deleted;
  },
  getLatest() {
    var e = this.collection._docCache.getLatestDocumentData(this.primary);
    return this.collection._docCache.getCachedRxDocument(e);
  },
  /**
   * returns the observable which emits the plain-data of this document
   */
  get $() {
    var e = this;
    return e.collection.$.pipe(Qe((t) => !t.isLocal), Qe((t) => t.documentId === this.primary), It((t) => Ip(t)), ml(e.collection._docCache.getLatestDocumentData(this.primary)), Ks((t, r) => t._rev === r._rev), It((t) => this.collection._docCache.getCachedRxDocument(t)), pl(Bc));
  },
  get $$() {
    var e = this, t = e.collection.database.getReactivityFactory();
    return t.fromObservable(e.$, e.getLatest()._data, e.collection.database);
  },
  /**
   * returns observable of the value of the given path
   */
  get$(e) {
    if (Te.isDevMode()) {
      if (e.includes(".item."))
        throw $("DOC1", {
          path: e
        });
      if (e === this.primaryPath)
        throw $("DOC2");
      if (this.collection.schema.finalFields.includes(e))
        throw $("DOC3", {
          path: e
        });
      var t = Bt(this.collection.schema.jsonSchema, e);
      if (!t)
        throw $("DOC4", {
          path: e
        });
    }
    return this.$.pipe(It((r) => gt(r, e)), Ks());
  },
  get$$(e) {
    var t = this.get$(e), r = this.collection.database.getReactivityFactory();
    return r.fromObservable(t, this.getLatest().get(e), this.collection.database);
  },
  /**
   * populate the given path
   */
  populate(e) {
    var t = Bt(this.collection.schema.jsonSchema, e), r = this.get(e);
    if (!r)
      return Ch;
    if (!t)
      throw $("DOC5", {
        path: e
      });
    if (!t.ref)
      throw $("DOC6", {
        path: e,
        schemaObj: t
      });
    var n = this.collection.database.collections[t.ref];
    if (!n)
      throw $("DOC7", {
        ref: t.ref,
        path: e,
        schemaObj: t
      });
    return t.type === "array" ? n.findByIds(r).exec().then((i) => {
      var s = i.values();
      return Array.from(s);
    }) : n.findOne(r).exec();
  },
  /**
   * get data by objectPath
   * @hotPath Performance here is really important,
   * run some tests before changing anything.
   */
  get(e) {
    return Kl(this, e);
  },
  toJSON(e = !1) {
    if (e)
      return Te.deepFreezeWhenDevMode(this._data);
    var t = Pe(this._data);
    return delete t._rev, delete t._attachments, delete t._deleted, delete t._meta, Te.deepFreezeWhenDevMode(t);
  },
  toMutableJSON(e = !1) {
    return Jn(this.toJSON(e));
  },
  /**
   * updates document
   * @overwritten by plugin (optional)
   * @param updateObj mongodb-like syntax
   */
  update(e) {
    throw ge("update");
  },
  incrementalUpdate(e) {
    throw ge("update");
  },
  updateCRDT(e) {
    throw ge("crdt");
  },
  putAttachment() {
    throw ge("attachments");
  },
  getAttachment() {
    throw ge("attachments");
  },
  allAttachments() {
    throw ge("attachments");
  },
  get allAttachments$() {
    throw ge("attachments");
  },
  async modify(e, t) {
    var r = this._data, n = await Ju(e)(r);
    return this._saveData(n, r);
  },
  /**
   * runs an incremental update over the document
   * @param function that takes the document-data and returns a new data-object
   */
  incrementalModify(e, t) {
    return this.collection.incrementalWriteQueue.addWrite(this._data, Ju(e)).then((r) => this.collection._docCache.getCachedRxDocument(r));
  },
  patch(e) {
    var t = this._data, r = Jn(t);
    return Object.entries(e).forEach(([n, i]) => {
      r[n] = i;
    }), this._saveData(r, t);
  },
  /**
   * patches the given properties
   */
  incrementalPatch(e) {
    return this.incrementalModify((t) => (Object.entries(e).forEach(([r, n]) => {
      t[r] = n;
    }), t));
  },
  /**
   * saves the new document-data
   * and handles the events
   */
  async _saveData(e, t) {
    if (e = Pe(e), this._data._deleted)
      throw $("DOC11", {
        id: this.primary,
        document: this
      });
    await Fl(this.collection, e, t);
    var r = [{
      previous: t,
      document: e
    }], n = await this.collection.storageInstance.bulkWrite(r, "rx-document-save-data"), i = n.error[0];
    return aa(this.collection, this.primary, e, i), await this.collection._runHooks("post", "save", e, this), this.collection._docCache.getCachedRxDocument(ir(this.collection.schema.primaryPath, r, n)[0]);
  },
  /**
   * Remove the document.
   * Notice that there is no hard delete,
   * instead deleted documents get flagged with _deleted=true.
   */
  remove() {
    var e = this.collection;
    if (this.deleted)
      return Promise.reject($("DOC13", {
        document: this,
        id: this.primary
      }));
    var t = Pe(this._data), r;
    return e._runHooks("pre", "remove", t, this).then(async () => {
      t._deleted = !0;
      var n = [{
        previous: this._data,
        document: t
      }], i = await e.storageInstance.bulkWrite(n, "rx-document-remove"), s = i.error[0];
      return aa(e, this.primary, t, s), ir(this.collection.schema.primaryPath, n, i)[0];
    }).then((n) => (r = n, this.collection._runHooks("post", "remove", t, this))).then(() => this.collection._docCache.getCachedRxDocument(r));
  },
  incrementalRemove() {
    return this.incrementalModify(async (e) => (await this.collection._runHooks("pre", "remove", e, this), e._deleted = !0, e)).then(async (e) => (await this.collection._runHooks("post", "remove", e._data, e), e));
  },
  destroy() {
    throw $("DOC14");
  }
};
function ql(e = di) {
  var t = function(n, i) {
    this.collection = n, this._data = i, this._propertyCache = /* @__PURE__ */ new Map(), this.isInstanceOfRxDocument = !0;
  };
  return t.prototype = e, t;
}
function fy(e, t, r) {
  var n = new e(t, r);
  return at("createRxDocument", n), n;
}
function Fl(e, t, r) {
  return t._meta = Object.assign({}, r._meta, t._meta), Te.isDevMode() && e.schema.validateChange(r, t), e._runHooks("pre", "save", t, r);
}
function Kl(e, t) {
  return Dr(e._propertyCache, t, () => {
    var r = gt(e._data, t);
    if (typeof r != "object" || r === null || Array.isArray(r))
      return Te.deepFreezeWhenDevMode(r);
    var n = new Proxy(
      /**
       * In dev-mode, the _data is deep-frozen
       * so we have to flat clone here so that
       * the proxy can work.
       */
      Pe(r),
      {
        /**
         * @performance is really important here
         * because people access nested properties very often
         * and might not be aware that this is internally using a Proxy
         */
        get(i, s) {
          if (typeof s != "string")
            return i[s];
          var u = s.charAt(s.length - 1);
          if (u === "$")
            if (s.endsWith("$$")) {
              var l = s.slice(0, -2);
              return e.get$$(Gt(t + "." + l));
            } else {
              var d = s.slice(0, -1);
              return e.get$(Gt(t + "." + d));
            }
          else if (u === "_") {
            var m = s.slice(0, -1);
            return e.populate(Gt(t + "." + m));
          } else {
            var v = i[s];
            return typeof v == "number" || typeof v == "string" || typeof v == "boolean" ? v : Kl(e, Gt(t + "." + s));
          }
        }
      }
    );
    return n;
  });
}
var $n = "collection", Do = "storage-token", dy = "rx-migration-status", hy = "RxInternalDocument", Io = Wc({
  version: 0,
  title: hy,
  primaryKey: {
    key: "id",
    fields: ["context", "key"],
    separator: "|"
  },
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 200
    },
    key: {
      type: "string"
    },
    context: {
      type: "string",
      enum: [$n, Do, dy, "OTHER"]
    },
    data: {
      type: "object",
      additionalProperties: !0
    }
  },
  indexes: [],
  required: ["key", "context", "data"],
  additionalProperties: !1,
  /**
   * If the sharding plugin is used,
   * it must not shard on the internal RxStorageInstance
   * because that one anyway has only a small amount of documents
   * and also its creation is in the hot path of the initial page load,
   * so we should spend less time creating multiple RxStorageInstances.
   */
  sharding: {
    shards: 1,
    mode: "collection"
  }
});
function Js(e, t) {
  return ho(Io, {
    key: e,
    context: t
  });
}
async function Ul(e) {
  var t = Ro(e.schema, {
    selector: {
      context: $n,
      _deleted: {
        $eq: !1
      }
    },
    sort: [{
      id: "asc"
    }],
    skip: 0
  }), r = await e.query(t), n = r.documents;
  return n;
}
var Wl = "storageToken", py = Js(Wl, Do);
async function my(e) {
  var t = va(10), r = e.password ? await e.hashFunction(JSON.stringify(e.password)) : void 0, n = {
    id: py,
    context: Do,
    key: Wl,
    data: {
      rxdbVersion: e.rxdbVersion,
      token: t,
      /**
       * We add the instance token here
       * to be able to detect if a given RxDatabase instance
       * is the first instance that was ever created
       * or if databases have existed earlier on that storage
       * with the same database name.
       */
      instanceToken: e.token,
      passwordHash: r
    },
    _deleted: !1,
    _meta: ha(),
    _rev: pa(),
    _attachments: {}
  }, i = [{
    document: n
  }], s = await e.internalStore.bulkWrite(i, "internal-add-storage-token");
  if (!s.error[0])
    return ir("id", i, s)[0];
  var u = ke(s.error[0]);
  if (u.isError && Kc(u)) {
    var l = u;
    if (!vy(l.documentInDb.data.rxdbVersion, e.rxdbVersion))
      throw $("DM5", {
        args: {
          database: e.name,
          databaseStateVersion: l.documentInDb.data.rxdbVersion,
          codeVersion: e.rxdbVersion
        }
      });
    if (r && r !== l.documentInDb.data.passwordHash)
      throw $("DB1", {
        passwordHash: r,
        existingPasswordHash: l.documentInDb.data.passwordHash
      });
    var d = l.documentInDb;
    return ke(d);
  }
  throw u;
}
function vy(e, t) {
  if (!e || t.includes("beta") && t !== e)
    return !1;
  var r = e.split(".")[0], n = t.split(".")[0];
  return r === n;
}
function Xu(e, t) {
  return e + "-" + t.version;
}
function Ki(e, t) {
  return t = Pe(t), t = Uh(e, t), typeof e.jsonSchema.primaryKey != "string" && (t = Uc(e.primaryPath, e.jsonSchema, t)), t._meta = ha(), Object.prototype.hasOwnProperty.call(t, "_deleted") || (t._deleted = !1), Object.prototype.hasOwnProperty.call(t, "_attachments") || (t._attachments = {}), Object.prototype.hasOwnProperty.call(t, "_rev") || (t._rev = pa()), t;
}
async function yy(e, t) {
  t.multiInstance = e.multiInstance;
  var r = await e.storage.createStorageInstance(t);
  return r;
}
async function zl(e, t, r, n, i, s, u) {
  var l = await Ul(t), d = l.filter((C) => C.data.name === i), m = [];
  d.forEach((C) => {
    m.push({
      collectionName: C.data.name,
      schema: C.data.schema,
      isCollection: !0
    }), C.data.connectedStorages.forEach((I) => m.push({
      collectionName: I.collectionName,
      isCollection: !1,
      schema: I.schema
    }));
  });
  var v = /* @__PURE__ */ new Set();
  if (m = m.filter((C) => {
    var I = C.collectionName + "||" + C.schema.version;
    return v.has(I) ? !1 : (v.add(I), !0);
  }), await Promise.all(m.map(async (C) => {
    var I = await e.createStorageInstance({
      collectionName: C.collectionName,
      databaseInstanceToken: r,
      databaseName: n,
      multiInstance: !1,
      options: {},
      schema: C.schema,
      password: s,
      devMode: Te.isDevMode()
    });
    await I.remove(), C.isCollection && await oi("postRemoveRxCollection", {
      storage: e,
      databaseName: n,
      collectionName: i
    });
  })), u) {
    var _ = d.map((C) => {
      var I = xa(C);
      return I._deleted = !0, I._meta.lwt = rt(), I._rev = Ns(r, C), {
        previous: C,
        document: I
      };
    });
    await t.bulkWrite(_, "rx-database-remove-collection-all");
  }
}
function et(e) {
  if (e.destroyed)
    throw $("COL21", {
      collection: e.name,
      version: e.schema.version
    });
}
var gy = /* @__PURE__ */ function() {
  function e(r) {
    this.subs = [], this.counter = 0, this.eventCounterMap = /* @__PURE__ */ new WeakMap(), this.buffer = [], this.limit = 100, this.tasks = /* @__PURE__ */ new Set(), this.collection = r, this.subs.push(this.collection.database.eventBulks$.pipe(Qe((n) => n.collectionName === this.collection.name), Qe((n) => {
      var i = n.events[0];
      return !i.isLocal;
    })).subscribe((n) => {
      this.tasks.add(() => this._handleChangeEvents(n.events)), this.tasks.size <= 1 && ma().then(() => {
        this.processTasks();
      });
    }));
  }
  var t = e.prototype;
  return t.processTasks = function() {
    if (this.tasks.size !== 0) {
      var n = Array.from(this.tasks);
      n.forEach((i) => i()), this.tasks.clear();
    }
  }, t._handleChangeEvents = function(n) {
    var i = this.counter;
    this.counter = this.counter + n.length, n.length > this.limit ? this.buffer = n.slice(n.length * -1) : (nn(this.buffer, n), this.buffer = this.buffer.slice(this.limit * -1));
    for (var s = i + 1, u = this.eventCounterMap, l = 0; l < n.length; l++) {
      var d = n[l];
      u.set(d, s + l);
    }
  }, t.getCounter = function() {
    return this.processTasks(), this.counter;
  }, t.getBuffer = function() {
    return this.processTasks(), this.buffer;
  }, t.getArrayIndexByPointer = function(n) {
    this.processTasks();
    var i = this.buffer[0], s = this.eventCounterMap.get(i);
    if (n < s) return null;
    var u = n - s;
    return u;
  }, t.getFrom = function(n) {
    this.processTasks();
    var i = [], s = this.getArrayIndexByPointer(n);
    if (s === null)
      return null;
    for (; ; ) {
      var u = this.buffer[s];
      if (s++, u)
        i.push(u);
      else
        return i;
    }
  }, t.runFrom = function(n, i) {
    this.processTasks();
    var s = this.getFrom(n);
    if (s === null)
      throw new Error("out of bounds");
    s.forEach((u) => i(u));
  }, t.reduceByLastOfDoc = function(n) {
    return this.processTasks(), n.slice(0);
  }, t.destroy = function() {
    this.tasks.clear(), this.subs.forEach((n) => n.unsubscribe());
  }, e;
}();
function by(e) {
  return new gy(e);
}
var _y = /* @__PURE__ */ new WeakMap();
function wy(e) {
  var t = e.schema.getDocumentPrototype(), r = Oy(e), n = di, i = {};
  return [t, r, n].forEach((s) => {
    var u = Object.getOwnPropertyNames(s);
    u.forEach((l) => {
      var d = Object.getOwnPropertyDescriptor(s, l), m = !0;
      (l.startsWith("_") || l.endsWith("_") || l.startsWith("$") || l.endsWith("$")) && (m = !1), typeof d.value == "function" ? Object.defineProperty(i, l, {
        get() {
          return d.value.bind(this);
        },
        enumerable: m,
        configurable: !1
      }) : (d.enumerable = m, d.configurable = !1, d.writable && (d.writable = !1), Object.defineProperty(i, l, d));
    });
  }), i;
}
function xy(e) {
  return Dr(_y, e, () => ql(wy(e)));
}
function ky(e, t, r) {
  var n = fy(t, e, Te.deepFreezeWhenDevMode(r));
  return e._runHooksSync("post", "create", r, n), at("postCreateRxDocument", n), n;
}
function Oy(e) {
  var t = {};
  return Object.entries(e.methods).forEach(([r, n]) => {
    t[r] = n;
  }), t;
}
var Vl = function(e, t) {
  var r = Pt(e.newDocumentState), n = Pt(e.realMasterState);
  return Xn(r, n) ? Promise.resolve({
    isEqual: !0
  }) : Promise.resolve({
    isEqual: !1,
    documentData: e.realMasterState
  });
}, Hl = ["pre", "post"], Zl = ["insert", "save", "remove", "create"], ec = !1, Po = /* @__PURE__ */ function() {
  function e(r, n, i, s, u = {}, l = {}, d = {}, m = {}, v = {}, _ = Ml, C = {}, I = Vl) {
    this.storageInstance = {}, this.timeouts = /* @__PURE__ */ new Set(), this.incrementalWriteQueue = {}, this.awaitBeforeReads = /* @__PURE__ */ new Set(), this._incrementalUpsertQueues = /* @__PURE__ */ new Map(), this.synced = !1, this.hooks = {}, this._subs = [], this._docCache = {}, this._queryCache = Lv(), this.$ = {}, this.checkpoint$ = {}, this._changeEventBuffer = {}, this.onDestroy = [], this.destroyed = !1, this.onRemove = [], this.database = r, this.name = n, this.schema = i, this.internalStorageInstance = s, this.instanceCreationOptions = u, this.migrationStrategies = l, this.methods = d, this.attachments = m, this.options = v, this.cacheReplacementPolicy = _, this.statics = C, this.conflictHandler = I, Sy(this.asRxCollection);
  }
  var t = e.prototype;
  return t.prepare = async function() {
    this.storageInstance = Ll(this.database, this.internalStorageInstance, this.schema.jsonSchema), this.incrementalWriteQueue = new cy(this.storageInstance, this.schema.primaryPath, (d, m) => Fl(this, d, m), (d) => this._runHooks("post", "save", d));
    var n = this.database.eventBulks$.pipe(Qe((d) => d.collectionName === this.name));
    this.$ = n.pipe(ui((d) => d.events)), this.checkpoint$ = n.pipe(It((d) => d.checkpoint)), this._changeEventBuffer = by(this.asRxCollection);
    var i;
    this._docCache = new zv(this.schema.primaryPath, this.database.eventBulks$.pipe(Qe((d) => d.collectionName === this.name && !d.events[0].isLocal), It((d) => d.events)), (d) => (i || (i = xy(this.asRxCollection)), ky(this.asRxCollection, i, d)));
    var s = this.database.internalStore.changeStream().pipe(Qe((d) => {
      var m = this.name + "-" + this.schema.version, v = d.events.find((_) => _.documentData.context === "collection" && _.documentData.key === m && _.operation === "DELETE");
      return !!v;
    })).subscribe(async () => {
      await this.destroy(), await Promise.all(this.onRemove.map((d) => d()));
    });
    this._subs.push(s);
    var u = await this.database.storageToken, l = this.storageInstance.changeStream().subscribe((d) => {
      for (var m = new Array(d.events.length), v = d.events, _ = this.name, C = Te.deepFreezeWhenDevMode, I = 0; I < v.length; I++) {
        var M = v[I];
        m[I] = {
          documentId: M.documentId,
          collectionName: _,
          isLocal: !1,
          operation: M.operation,
          documentData: C(M.documentData),
          previousDocumentData: C(M.previousDocumentData)
        };
      }
      var B = {
        id: d.id,
        internal: !1,
        collectionName: this.name,
        storageToken: u,
        events: m,
        databaseToken: this.database.token,
        checkpoint: d.checkpoint,
        context: d.context,
        endTime: d.endTime,
        startTime: d.startTime
      };
      this.database.$emit(B);
    });
    return this._subs.push(l), this._subs.push(this.storageInstance.conflictResultionTasks().subscribe((d) => {
      this.conflictHandler(d.input, d.context).then((m) => {
        this.storageInstance.resolveConflictResultionTask({
          id: d.id,
          output: m
        });
      });
    })), Nn;
  }, t.cleanup = function(n) {
    throw et(this), ge("cleanup");
  }, t.migrationNeeded = function() {
    throw ge("migration-schema");
  }, t.getMigrationState = function() {
    throw ge("migration-schema");
  }, t.startMigration = function(n = 10) {
    return et(this), this.getMigrationState().startMigration(n);
  }, t.migratePromise = function(n = 10) {
    return this.getMigrationState().migratePromise(n);
  }, t.insert = async function(n) {
    et(this);
    var i = await this.bulkInsert([n]), s = i.error[0];
    aa(this, n[this.schema.primaryPath], n, s);
    var u = ke(i.success[0]);
    return u;
  }, t.bulkInsert = async function(n) {
    if (et(this), n.length === 0)
      return {
        success: [],
        error: []
      };
    var i = this.schema.primaryPath, s = /* @__PURE__ */ new Set(), u;
    if (this.hasHooks("pre", "insert"))
      u = await Promise.all(n.map((Q) => {
        var G = Ki(this.schema, Q);
        return this._runHooks("pre", "insert", G).then(() => (s.add(G[i]), {
          document: G
        }));
      }));
    else {
      u = new Array(n.length);
      for (var l = this.schema, d = 0; d < n.length; d++) {
        var m = n[d], v = Ki(l, m);
        s.add(v[i]), u[d] = {
          document: v
        };
      }
    }
    if (s.size !== n.length)
      throw $("COL22", {
        collection: this.name,
        args: {
          documents: n
        }
      });
    var _ = await this.storageInstance.bulkWrite(u, "rx-collection-bulk-insert"), C, I = this, M = {
      get success() {
        if (!C) {
          var Q = ir(I.schema.primaryPath, u, _);
          C = Nl(I._docCache, Q);
        }
        return C;
      },
      error: _.error
    };
    if (this.hasHooks("post", "insert")) {
      var B = /* @__PURE__ */ new Map();
      u.forEach((Q) => {
        var G = Q.document;
        B.set(G[i], G);
      }), await Promise.all(M.success.map((Q) => this._runHooks("post", "insert", B.get(Q.primary), Q)));
    }
    return M;
  }, t.bulkRemove = async function(n) {
    et(this);
    var i = this.schema.primaryPath;
    if (n.length === 0)
      return {
        success: [],
        error: []
      };
    var s = await this.findByIds(n).exec(), u = [], l = /* @__PURE__ */ new Map();
    Array.from(s.values()).forEach((I) => {
      var M = I.toMutableJSON(!0);
      u.push(M), l.set(I.primary, M);
    }), await Promise.all(u.map((I) => {
      var M = I[this.schema.primaryPath];
      return this._runHooks("pre", "remove", I, s.get(M));
    }));
    var d = u.map((I) => {
      var M = Pe(I);
      return M._deleted = !0, {
        previous: I,
        document: M
      };
    }), m = await this.storageInstance.bulkWrite(d, "rx-collection-bulk-remove"), v = ir(this.schema.primaryPath, d, m), _ = v.map((I) => I[i]);
    await Promise.all(_.map((I) => this._runHooks("post", "remove", l.get(I), s.get(I))));
    var C = _.map((I) => ei(s, I));
    return {
      success: C,
      error: m.error
    };
  }, t.bulkUpsert = async function(n) {
    et(this);
    var i = [], s = /* @__PURE__ */ new Map();
    n.forEach((m) => {
      var v = Ki(this.schema, m), _ = v[this.schema.primaryPath];
      if (!_)
        throw $("COL3", {
          primaryPath: this.schema.primaryPath,
          data: v,
          schema: this.schema.jsonSchema
        });
      s.set(_, v), i.push(v);
    });
    var u = await this.bulkInsert(i), l = u.success.slice(0), d = [];
    return await Promise.all(u.error.map(async (m) => {
      if (m.status !== 409)
        d.push(m);
      else {
        var v = m.documentId, _ = ei(s, v), C = ke(m.documentInDb), I = this._docCache.getCachedRxDocuments([C])[0], M = await I.incrementalModify(() => _);
        l.push(M);
      }
    })), {
      error: d,
      success: l
    };
  }, t.upsert = async function(n) {
    et(this);
    var i = await this.bulkUpsert([n]);
    return aa(this.asRxCollection, n[this.schema.primaryPath], n, i.error[0]), i.success[0];
  }, t.incrementalUpsert = function(n) {
    et(this);
    var i = Ki(this.schema, n), s = i[this.schema.primaryPath];
    if (!s)
      throw $("COL4", {
        data: n
      });
    var u = this._incrementalUpsertQueues.get(s);
    return u || (u = Nn), u = u.then(() => Cy(this, s, i)).then((l) => l.inserted ? l.doc : Ey(l.doc, i)), this._incrementalUpsertQueues.set(s, u), u;
  }, t.find = function(n) {
    if (et(this), typeof n == "string")
      throw $("COL5", {
        queryObj: n
      });
    n || (n = Hi());
    var i = An("find", n, this);
    return i;
  }, t.findOne = function(n) {
    if (et(this), typeof n == "number" || Array.isArray(n))
      throw nt("COL6", {
        queryObj: n
      });
    var i;
    if (typeof n == "string")
      i = An("findOne", {
        selector: {
          [this.schema.primaryPath]: n
        },
        limit: 1
      }, this);
    else {
      if (n || (n = Hi()), n.limit)
        throw $("QU6");
      n = Pe(n), n.limit = 1, i = An("findOne", n, this);
    }
    return i;
  }, t.count = function(n) {
    et(this), n || (n = Hi());
    var i = An("count", n, this);
    return i;
  }, t.findByIds = function(n) {
    et(this);
    var i = {
      selector: {
        [this.schema.primaryPath]: {
          $in: n.slice(0)
        }
      }
    }, s = An("findByIds", i, this);
    return s;
  }, t.exportJSON = function() {
    throw ge("json-dump");
  }, t.importJSON = function(n) {
    throw ge("json-dump");
  }, t.insertCRDT = function(n) {
    throw ge("crdt");
  }, t.addPipeline = function(n) {
    throw ge("pipeline");
  }, t.addHook = function(n, i, s, u = !1) {
    if (typeof s != "function")
      throw nt("COL7", {
        key: i,
        when: n
      });
    if (!Hl.includes(n))
      throw nt("COL8", {
        key: i,
        when: n
      });
    if (!Zl.includes(i))
      throw $("COL9", {
        key: i
      });
    if (n === "post" && i === "create" && u === !0)
      throw $("COL10", {
        when: n,
        key: i,
        parallel: u
      });
    var l = s.bind(this), d = u ? "parallel" : "series";
    this.hooks[i] = this.hooks[i] || {}, this.hooks[i][n] = this.hooks[i][n] || {
      series: [],
      parallel: []
    }, this.hooks[i][n][d].push(l);
  }, t.getHooks = function(n, i) {
    return !this.hooks[i] || !this.hooks[i][n] ? {
      series: [],
      parallel: []
    } : this.hooks[i][n];
  }, t.hasHooks = function(n, i) {
    if (!this.hooks[i] || !this.hooks[i][n])
      return !1;
    var s = this.getHooks(n, i);
    return s ? s.series.length > 0 || s.parallel.length > 0 : !1;
  }, t._runHooks = function(n, i, s, u) {
    var l = this.getHooks(n, i);
    if (!l)
      return Nn;
    var d = l.series.map((m) => () => m(s, u));
    return Dh(d).then(() => Promise.all(l.parallel.map((m) => m(s, u))));
  }, t._runHooksSync = function(n, i, s, u) {
    if (this.hasHooks(n, i)) {
      var l = this.getHooks(n, i);
      l && l.series.forEach((d) => d(s, u));
    }
  }, t.promiseWait = function(n) {
    var i = new Promise((s) => {
      var u = setTimeout(() => {
        this.timeouts.delete(u), s();
      }, n);
      this.timeouts.add(u);
    });
    return i;
  }, t.destroy = async function() {
    return this.destroyed ? _r : (await Promise.all(this.onDestroy.map((n) => n())), this.destroyed = !0, Array.from(this.timeouts).forEach((n) => clearTimeout(n)), this._changeEventBuffer && this._changeEventBuffer.destroy(), this.database.requestIdlePromise().then(() => this.storageInstance.close()).then(() => (this._subs.forEach((n) => n.unsubscribe()), delete this.database.collections[this.name], oi("postDestroyRxCollection", this).then(() => !0))));
  }, t.remove = async function() {
    await this.destroy(), await Promise.all(this.onRemove.map((n) => n())), await zl(this.database.storage, this.database.internalStore, this.database.token, this.database.name, this.name, this.database.password, this.database.hashFunction);
  }, ar(e, [{
    key: "insert$",
    get: function() {
      return this.$.pipe(Qe((r) => r.operation === "INSERT"));
    }
  }, {
    key: "update$",
    get: function() {
      return this.$.pipe(Qe((r) => r.operation === "UPDATE"));
    }
  }, {
    key: "remove$",
    get: function() {
      return this.$.pipe(Qe((r) => r.operation === "DELETE"));
    }
    // defaults
    /**
     * When the collection is destroyed,
     * these functions will be called an awaited.
     * Used to automatically clean up stuff that
     * belongs to this collection.
    */
  }, {
    key: "asRxCollection",
    get: function() {
      return this;
    }
  }]);
}();
function Sy(e) {
  if (!ec) {
    ec = !0;
    var t = Object.getPrototypeOf(e);
    Zl.forEach((r) => {
      Hl.map((n) => {
        var i = n + Pc(r);
        t[i] = function(s, u) {
          return this.addHook(n, r, s, u);
        };
      });
    });
  }
}
function Ey(e, t) {
  return e.incrementalModify((r) => t);
}
function Cy(e, t, r) {
  var n = e._docCache.getLatestDocumentDataIfExists(t);
  return n ? Promise.resolve({
    doc: e._docCache.getCachedRxDocuments([n])[0],
    inserted: !1
  }) : e.findOne(t).exec().then((i) => i ? {
    doc: i,
    inserted: !1
  } : e.insert(r).then((s) => ({
    doc: s,
    inserted: !0
  })));
}
function Ry({
  database: e,
  name: t,
  schema: r,
  instanceCreationOptions: n = {},
  migrationStrategies: i = {},
  autoMigrate: s = !0,
  statics: u = {},
  methods: l = {},
  attachments: d = {},
  options: m = {},
  localDocuments: v = !1,
  cacheReplacementPolicy: _ = Ml,
  conflictHandler: C = Vl
}) {
  var I = {
    databaseInstanceToken: e.token,
    databaseName: e.name,
    collectionName: t,
    schema: r.jsonSchema,
    options: n,
    multiInstance: e.multiInstance,
    password: e.password,
    devMode: Te.isDevMode()
  };
  return at("preCreateRxStorageInstance", I), yy(e, I).then((M) => {
    var B = new Po(e, t, r, M, n, i, l, d, m, _, u, C);
    return B.prepare().then(() => {
      Object.entries(u).forEach(([G, X]) => {
        Object.defineProperty(B, G, {
          get: () => X.bind(B)
        });
      });
      var Q = Nn;
      return s && B.schema.version !== 0 && (Q = B.migratePromise()), Q;
    }).then(() => (at("createRxCollection", {
      collection: B,
      creator: {
        name: t,
        schema: r,
        storageInstance: M,
        instanceCreationOptions: n,
        migrationStrategies: i,
        methods: l,
        attachments: d,
        options: m,
        cacheReplacementPolicy: _,
        localDocuments: v,
        statics: u
      }
    }), B)).catch((Q) => M.close().then(() => Promise.reject(Q)));
  });
}
var Ql = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
  this._parallels = t || 1, this._qC = 0, this._iC = /* @__PURE__ */ new Set(), this._lHN = 0, this._hPM = /* @__PURE__ */ new Map(), this._pHM = /* @__PURE__ */ new Map();
};
Ql.prototype = {
  isIdle: function() {
    return this._qC < this._parallels;
  },
  /**
   * creates a lock in the queue
   * and returns an unlock-function to remove the lock from the queue
   * @return {function} unlock function than must be called afterwards
   */
  lock: function() {
    this._qC++;
  },
  unlock: function() {
    this._qC--, Xs(this);
  },
  /**
   * wraps a function with lock/unlock and runs it
   * @param  {function}  fun
   * @return {Promise<any>}
   */
  wrapCall: function(t) {
    var r = this;
    this.lock();
    var n;
    try {
      n = t();
    } catch (i) {
      throw this.unlock(), i;
    }
    return !n.then || typeof n.then != "function" ? (this.unlock(), n) : n.then(function(i) {
      return r.unlock(), i;
    }).catch(function(i) {
      throw r.unlock(), i;
    });
  },
  /**
   * does the same as requestIdleCallback() but uses promises instead of the callback
   * @param {{timeout?: number}} options like timeout
   * @return {Promise<void>} promise that resolves when the database is in idle-mode
   */
  requestIdlePromise: function(t) {
    var r = this;
    t = t || {};
    var n, i = new Promise(function(l) {
      return n = l;
    }), s = function() {
      ks(r, i), n();
    };
    if (i._manRes = s, t.timeout) {
      var u = setTimeout(function() {
        i._manRes();
      }, t.timeout);
      i._timeoutObj = u;
    }
    return this._iC.add(i), Xs(this), i;
  },
  /**
   * remove the promise so it will never be resolved
   * @param  {Promise} promise from requestIdlePromise()
   * @return {void}
   */
  cancelIdlePromise: function(t) {
    ks(this, t);
  },
  /**
   * api equal to
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
   * @param  {Function} callback
   * @param  {options}   options  [description]
   * @return {number} handle which can be used with cancelIdleCallback()
   */
  requestIdleCallback: function(t, r) {
    var n = this._lHN++, i = this.requestIdlePromise(r);
    return this._hPM.set(n, i), this._pHM.set(i, n), i.then(function() {
      return t();
    }), n;
  },
  /**
   * API equal to
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback
   * @param  {number} handle returned from requestIdleCallback()
   * @return {void}
   */
  cancelIdleCallback: function(t) {
    var r = this._hPM.get(t);
    this.cancelIdlePromise(r);
  },
  /**
   * clears and resets everything
   * @return {void}
   */
  clear: function() {
    var t = this;
    this._iC.forEach(function(r) {
      return ks(t, r);
    }), this._qC = 0, this._iC.clear(), this._hPM = /* @__PURE__ */ new Map(), this._pHM = /* @__PURE__ */ new Map();
  }
};
function Dy(e) {
  if (e._iC.size !== 0) {
    var t = e._iC.values(), r = t.next().value;
    r._manRes(), setTimeout(function() {
      return Xs(e);
    }, 0);
  }
}
function ks(e, t) {
  if (t) {
    if (t._timeoutObj && clearTimeout(t._timeoutObj), e._pHM.has(t)) {
      var r = e._pHM.get(t);
      e._hPM.delete(r), e._pHM.delete(t);
    }
    e._iC.delete(t);
  }
}
function Xs(e) {
  e._tryIR || e._iC.size === 0 || (e._tryIR = !0, setTimeout(function() {
    if (!e.isIdle()) {
      e._tryIR = !1;
      return;
    }
    setTimeout(function() {
      if (!e.isIdle()) {
        e._tryIR = !1;
        return;
      }
      Dy(e), e._tryIR = !1;
    }, 0);
  }, 0));
}
class To {
  constructor(t) {
    Kr(this, "ttl");
    Kr(this, "map", /* @__PURE__ */ new Map());
    /**
     * Creating calls to setTimeout() is expensive,
     * so we only do that if there is not timeout already open.
     */
    Kr(this, "_to", !1);
    this.ttl = t;
  }
  has(t) {
    return this.map.has(t);
  }
  add(t) {
    this.map.set(t, Gl()), this._to || (this._to = !0, setTimeout(() => {
      this._to = !1, Iy(this);
    }, 0));
  }
  clear() {
    this.map.clear();
  }
}
function Iy(e) {
  const t = Gl() - e.ttl, r = e.map[Symbol.iterator]();
  for (; ; ) {
    const n = r.next().value;
    if (!n)
      return;
    const i = n[0];
    if (n[1] < t)
      e.map.delete(i);
    else
      return;
  }
}
function Gl() {
  return Date.now();
}
var sa = /* @__PURE__ */ new Set(), Ao = /* @__PURE__ */ function() {
  function e(r, n, i, s, u, l, d = !1, m = {}, v, _, C, I, M) {
    this.idleQueue = new Ql(), this.rxdbVersion = lo, this.storageInstances = /* @__PURE__ */ new Set(), this._subs = [], this.startupErrors = [], this.onDestroy = [], this.destroyed = !1, this.collections = {}, this.states = {}, this.eventBulks$ = new rr(), this.observable$ = this.eventBulks$.pipe(ui((B) => B.events)), this.storageToken = _r, this.storageTokenDocument = _r, this.emittedEventBulkIds = new To(60 * 1e3), this.name = r, this.token = n, this.storage = i, this.instanceCreationOptions = s, this.password = u, this.multiInstance = l, this.eventReduce = d, this.options = m, this.internalStore = v, this.hashFunction = _, this.cleanupPolicy = C, this.allowSlowCount = I, this.reactivity = M, this.name !== "pseudoInstance" && (this.internalStore = Ll(this.asRxDatabase, v, Io), this.storageTokenDocument = my(this.asRxDatabase).catch((B) => this.startupErrors.push(B)), this.storageToken = this.storageTokenDocument.then((B) => B.data.token).catch((B) => this.startupErrors.push(B)));
  }
  var t = e.prototype;
  return t.getReactivityFactory = function() {
    if (!this.reactivity)
      throw $("DB14", {
        database: this.name
      });
    return this.reactivity;
  }, t.$emit = function(n) {
    this.emittedEventBulkIds.has(n.id) || (this.emittedEventBulkIds.add(n.id), this.eventBulks$.next(n));
  }, t.removeCollectionDoc = async function(n, i) {
    var s = await ny(this.internalStore, Js(Xu(n, i), $n));
    if (!s)
      throw $("SNH", {
        name: n,
        schema: i
      });
    var u = xa(s);
    u._deleted = !0, await this.internalStore.bulkWrite([{
      document: u,
      previous: s
    }], "rx-database-remove-collection");
  }, t.addCollections = async function(n) {
    var i = {}, s = {}, u = [], l = {};
    await Promise.all(Object.entries(n).map(async ([v, _]) => {
      var C = v, I = _.schema;
      i[C] = I;
      var M = Vh(I, this.hashFunction);
      if (s[C] = M, this.collections[v])
        throw $("DB3", {
          name: v
        });
      var B = Xu(v, I), Q = {
        id: Js(B, $n),
        key: B,
        context: $n,
        data: {
          name: C,
          schemaHash: await M.hash,
          schema: M.jsonSchema,
          version: M.version,
          connectedStorages: []
        },
        _deleted: !1,
        _meta: ha(),
        _rev: pa(),
        _attachments: {}
      };
      u.push({
        document: Q
      });
      var G = Object.assign({}, _, {
        name: C,
        schema: M,
        database: this
      }), X = Pe(_);
      X.database = this, X.name = v, at("preCreateRxCollection", X), G.conflictHandler = X.conflictHandler, l[C] = G;
    }));
    var d = await this.internalStore.bulkWrite(u, "rx-database-add-collection");
    await My(this), await Promise.all(d.error.map(async (v) => {
      if (v.status !== 409)
        throw $("DB12", {
          database: this.name,
          writeError: v
        });
      var _ = ke(v.documentInDb), C = _.data.name, I = s[C];
      if (_.data.schemaHash !== await I.hash)
        throw $("DB6", {
          database: this.name,
          collection: C,
          previousSchemaHash: _.data.schemaHash,
          schemaHash: await I.hash,
          previousSchema: _.data.schema,
          schema: ke(i[C])
        });
    }));
    var m = {};
    return await Promise.all(Object.keys(n).map(async (v) => {
      var _ = l[v], C = await Ry(_);
      m[v] = C, this.collections[v] = C, this[v] || Object.defineProperty(this, v, {
        get: () => this.collections[v]
      });
    })), m;
  }, t.lockedRun = function(n) {
    return this.idleQueue.wrapCall(n);
  }, t.requestIdlePromise = function() {
    return this.idleQueue.requestIdlePromise();
  }, t.exportJSON = function(n) {
    throw ge("json-dump");
  }, t.addState = function(n) {
    throw ge("state");
  }, t.importJSON = function(n) {
    throw ge("json-dump");
  }, t.backup = function(n) {
    throw ge("backup");
  }, t.leaderElector = function() {
    throw ge("leader-election");
  }, t.isLeader = function() {
    throw ge("leader-election");
  }, t.waitForLeadership = function() {
    throw ge("leader-election");
  }, t.migrationStates = function() {
    throw ge("migration-schema");
  }, t.destroy = async function() {
    return this.destroyed || (this.destroyed = !0, await oi("preDestroyRxDatabase", this), this.eventBulks$.complete(), this._subs.map((n) => n.unsubscribe()), this.name === "pseudoInstance") ? _r : this.requestIdlePromise().then(() => Promise.all(this.onDestroy.map((n) => n()))).then(() => Promise.all(Object.keys(this.collections).map((n) => this.collections[n]).map((n) => n.destroy()))).then(() => this.internalStore.close()).then(() => sa.delete(this.storage.name + "|" + this.name)).then(() => !0);
  }, t.remove = function() {
    return this.destroy().then(() => Ay(this.name, this.storage, this.password));
  }, ar(e, [{
    key: "$",
    get: function() {
      return this.observable$;
    }
  }, {
    key: "asRxDatabase",
    get: function() {
      return this;
    }
  }]);
}();
function Py(e, t) {
  var r = t.name + "|" + e;
  if (sa.has(r))
    throw $("DB8", {
      name: e,
      storage: t.name,
      link: "https://rxdb.info/rx-database.html#ignoreduplicate"
    });
}
async function Yl(e, t, r, n, i, s) {
  var u = await t.createStorageInstance({
    databaseInstanceToken: e,
    databaseName: r,
    collectionName: ry,
    schema: Io,
    options: n,
    multiInstance: i,
    password: s,
    devMode: Te.isDevMode()
  });
  return u;
}
function Ty({
  storage: e,
  instanceCreationOptions: t,
  name: r,
  password: n,
  multiInstance: i = !0,
  eventReduce: s = !0,
  ignoreDuplicate: u = !1,
  options: l = {},
  cleanupPolicy: d,
  allowSlowCount: m = !1,
  localDocuments: v = !1,
  hashFunction: _ = co,
  reactivity: C
}) {
  at("preCreateRxDatabase", {
    storage: e,
    instanceCreationOptions: t,
    name: r,
    password: n,
    multiInstance: i,
    eventReduce: s,
    ignoreDuplicate: u,
    options: l,
    localDocuments: v
  }), u || Py(r, e), sa.add(e.name + "|" + r);
  var I = va(10);
  return Yl(I, e, r, t, i, n).catch((M) => {
    throw sa.delete(e.name + "|" + r), M;
  }).then((M) => {
    var B = new Ao(r, I, e, t, n, i, s, l, M, _, d, m, C);
    return oi("createRxDatabase", {
      database: B,
      creator: {
        storage: e,
        instanceCreationOptions: t,
        name: r,
        password: n,
        multiInstance: i,
        eventReduce: s,
        ignoreDuplicate: u,
        options: l,
        localDocuments: v
      }
    }).then(() => B);
  });
}
async function Ay(e, t, r) {
  var n = va(10), i = await Yl(n, t, e, {}, !1, r), s = await Ul(i), u = /* @__PURE__ */ new Set();
  s.forEach((d) => u.add(d.data.name));
  var l = Array.from(u);
  return await Promise.all(l.map((d) => zl(t, i, n, e, d, r))), await oi("postRemoveRxDatabase", {
    databaseName: e,
    storage: t
  }), await i.remove(), l;
}
async function My(e) {
  if (await e.storageToken, e.startupErrors[0])
    throw e.startupErrors[0];
}
var Ny = {
  RxSchema: Vc.prototype,
  RxDocument: di,
  RxQuery: Bl.prototype,
  RxCollection: Po.prototype,
  RxDatabase: Ao.prototype
}, Os = /* @__PURE__ */ new Set(), tc = /* @__PURE__ */ new Set();
function By(e) {
  if (at("preAddRxPlugin", {
    plugin: e,
    plugins: Os
  }), !Os.has(e)) {
    {
      if (tc.has(e.name))
        throw $("PL3", {
          name: e.name,
          plugin: e
        });
      Os.add(e), tc.add(e.name);
    }
    if (!e.rxdb)
      throw nt("PL1", {
        plugin: e
      });
    e.init && e.init(), e.prototypes && Object.entries(e.prototypes).forEach(([t, r]) => r(Ny[t])), e.overwritable && Object.assign(Te, e.overwritable), e.hooks && Object.entries(e.hooks).forEach(([t, r]) => {
      r.after && ri[t].push(r.after), r.before && ri[t].unshift(r.before);
    });
  }
}
function $y(e) {
  return e && typeof e.then == "function";
}
Promise.resolve(!1);
Promise.resolve(!0);
var Sr = Promise.resolve();
function Jl(e, t) {
  return e || (e = 0), new Promise(function(r) {
    return setTimeout(function() {
      return r(t);
    }, e);
  });
}
function jy(e, t) {
  return Math.floor(Math.random() * (t - e + 1) + e);
}
function Mo() {
  return Math.random().toString(36).substring(2);
}
var Ss = 0;
function hi() {
  var e = Date.now() * 1e3;
  return e <= Ss && (e = Ss + 1), Ss = e, e;
}
var Ly = hi, qy = "native";
function Fy(e) {
  var t = {
    time: hi(),
    messagesCallback: null,
    bc: new BroadcastChannel(e),
    subFns: []
    // subscriberFunctions
  };
  return t.bc.onmessage = function(r) {
    t.messagesCallback && t.messagesCallback(r.data);
  }, t;
}
function Ky(e) {
  e.bc.close(), e.subFns = [];
}
function Uy(e, t) {
  try {
    return e.bc.postMessage(t, !1), Sr;
  } catch (r) {
    return Promise.reject(r);
  }
}
function Wy(e, t) {
  e.messagesCallback = t;
}
function zy() {
  if (typeof globalThis < "u" && globalThis.Deno && globalThis.Deno.args)
    return !0;
  if ((typeof window < "u" || typeof self < "u") && typeof BroadcastChannel == "function") {
    if (BroadcastChannel._pubkey)
      throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");
    return !0;
  } else
    return !1;
}
function Vy() {
  return 150;
}
var Hy = {
  create: Fy,
  close: Ky,
  onMessage: Wy,
  postMessage: Uy,
  canBeUsed: zy,
  type: qy,
  averageResponseTime: Vy,
  microSeconds: Ly
};
function No() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = JSON.parse(JSON.stringify(e));
  return typeof t.webWorkerSupport > "u" && (t.webWorkerSupport = !0), t.idb || (t.idb = {}), t.idb.ttl || (t.idb.ttl = 1e3 * 45), t.idb.fallbackInterval || (t.idb.fallbackInterval = 150), e.idb && typeof e.idb.onclose == "function" && (t.idb.onclose = e.idb.onclose), t.localstorage || (t.localstorage = {}), t.localstorage.removeTimeout || (t.localstorage.removeTimeout = 1e3 * 60), e.methods && (t.methods = e.methods), t.node || (t.node = {}), t.node.ttl || (t.node.ttl = 1e3 * 60 * 2), t.node.maxParallelWrites || (t.node.maxParallelWrites = 2048), typeof t.node.useFastPath > "u" && (t.node.useFastPath = !0), t;
}
var Zy = hi, Qy = "pubkey.broadcast-channel-0-", jt = "messages", ka = {
  durability: "relaxed"
}, Gy = "idb";
function Xl() {
  if (typeof indexedDB < "u") return indexedDB;
  if (typeof window < "u") {
    if (typeof window.mozIndexedDB < "u") return window.mozIndexedDB;
    if (typeof window.webkitIndexedDB < "u") return window.webkitIndexedDB;
    if (typeof window.msIndexedDB < "u") return window.msIndexedDB;
  }
  return !1;
}
function Bo(e) {
  e.commit && e.commit();
}
function Yy(e) {
  var t = Xl(), r = Qy + e, n = t.open(r);
  return n.onupgradeneeded = function(i) {
    var s = i.target.result;
    s.createObjectStore(jt, {
      keyPath: "id",
      autoIncrement: !0
    });
  }, new Promise(function(i, s) {
    n.onerror = function(u) {
      return s(u);
    }, n.onsuccess = function() {
      i(n.result);
    };
  });
}
function Jy(e, t, r) {
  var n = Date.now(), i = {
    uuid: t,
    time: n,
    data: r
  }, s = e.transaction([jt], "readwrite", ka);
  return new Promise(function(u, l) {
    s.oncomplete = function() {
      return u();
    }, s.onerror = function(m) {
      return l(m);
    };
    var d = s.objectStore(jt);
    d.add(i), Bo(s);
  });
}
function Xy(e, t) {
  var r = e.transaction(jt, "readonly", ka), n = r.objectStore(jt), i = [], s = IDBKeyRange.bound(t + 1, 1 / 0);
  if (n.getAll) {
    var u = n.getAll(s);
    return new Promise(function(d, m) {
      u.onerror = function(v) {
        return m(v);
      }, u.onsuccess = function(v) {
        d(v.target.result);
      };
    });
  }
  function l() {
    try {
      return s = IDBKeyRange.bound(t + 1, 1 / 0), n.openCursor(s);
    } catch {
      return n.openCursor();
    }
  }
  return new Promise(function(d, m) {
    var v = l();
    v.onerror = function(_) {
      return m(_);
    }, v.onsuccess = function(_) {
      var C = _.target.result;
      C ? C.value.id < t + 1 ? C.continue(t + 1) : (i.push(C.value), C.continue()) : (Bo(r), d(i));
    };
  });
}
function eg(e, t) {
  if (e.closed)
    return Promise.resolve([]);
  var r = e.db.transaction(jt, "readwrite", ka), n = r.objectStore(jt);
  return Promise.all(t.map(function(i) {
    var s = n.delete(i);
    return new Promise(function(u) {
      s.onsuccess = function() {
        return u();
      };
    });
  }));
}
function tg(e, t) {
  var r = Date.now() - t, n = e.transaction(jt, "readonly", ka), i = n.objectStore(jt), s = [];
  return new Promise(function(u) {
    i.openCursor().onsuccess = function(l) {
      var d = l.target.result;
      if (d) {
        var m = d.value;
        m.time < r ? (s.push(m), d.continue()) : (Bo(n), u(s));
      } else
        u(s);
    };
  });
}
function rg(e) {
  return tg(e.db, e.options.idb.ttl).then(function(t) {
    return eg(e, t.map(function(r) {
      return r.id;
    }));
  });
}
function ng(e, t) {
  return t = No(t), Yy(e).then(function(r) {
    var n = {
      closed: !1,
      lastCursorId: 0,
      channelName: e,
      options: t,
      uuid: Mo(),
      /**
       * emittedMessagesIds
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */
      eMIs: new To(t.idb.ttl * 2),
      // ensures we do not read messages in parallel
      writeBlockPromise: Sr,
      messagesCallback: null,
      readQueuePromises: [],
      db: r
    };
    return r.onclose = function() {
      n.closed = !0, t.idb.onclose && t.idb.onclose();
    }, ef(n), n;
  });
}
function ef(e) {
  e.closed || tf(e).then(function() {
    return Jl(e.options.idb.fallbackInterval);
  }).then(function() {
    return ef(e);
  });
}
function ig(e, t) {
  return !(e.uuid === t.uuid || t.eMIs.has(e.id) || e.data.time < t.messagesCallbackTime);
}
function tf(e) {
  return e.closed || !e.messagesCallback ? Sr : Xy(e.db, e.lastCursorId).then(function(t) {
    var r = t.filter(function(n) {
      return !!n;
    }).map(function(n) {
      return n.id > e.lastCursorId && (e.lastCursorId = n.id), n;
    }).filter(function(n) {
      return ig(n, e);
    }).sort(function(n, i) {
      return n.time - i.time;
    });
    return r.forEach(function(n) {
      e.messagesCallback && (e.eMIs.add(n.id), e.messagesCallback(n.data));
    }), Sr;
  });
}
function ag(e) {
  e.closed = !0, e.db.close();
}
function sg(e, t) {
  return e.writeBlockPromise = e.writeBlockPromise.then(function() {
    return Jy(e.db, e.uuid, t);
  }).then(function() {
    jy(0, 10) === 0 && rg(e);
  }), e.writeBlockPromise;
}
function og(e, t, r) {
  e.messagesCallbackTime = r, e.messagesCallback = t, tf(e);
}
function ug() {
  return !!Xl();
}
function cg(e) {
  return e.idb.fallbackInterval * 2;
}
var lg = {
  create: ng,
  close: ag,
  onMessage: og,
  postMessage: sg,
  canBeUsed: ug,
  type: Gy,
  averageResponseTime: cg,
  microSeconds: Zy
}, fg = hi, dg = "pubkey.broadcastChannel-", hg = "localstorage";
function rf() {
  var e;
  if (typeof window > "u") return null;
  try {
    e = window.localStorage, e = window["ie8-eventlistener/storage"] || window.localStorage;
  } catch {
  }
  return e;
}
function nf(e) {
  return dg + e;
}
function pg(e, t) {
  return new Promise(function(r) {
    Jl().then(function() {
      var n = nf(e.channelName), i = {
        token: Mo(),
        time: Date.now(),
        data: t,
        uuid: e.uuid
      }, s = JSON.stringify(i);
      rf().setItem(n, s);
      var u = document.createEvent("Event");
      u.initEvent("storage", !0, !0), u.key = n, u.newValue = s, window.dispatchEvent(u), r();
    });
  });
}
function mg(e, t) {
  var r = nf(e), n = function(s) {
    s.key === r && t(JSON.parse(s.newValue));
  };
  return window.addEventListener("storage", n), n;
}
function vg(e) {
  window.removeEventListener("storage", e);
}
function yg(e, t) {
  if (t = No(t), !af())
    throw new Error("BroadcastChannel: localstorage cannot be used");
  var r = Mo(), n = new To(t.localstorage.removeTimeout), i = {
    channelName: e,
    uuid: r,
    eMIs: n
    // emittedMessagesIds
  };
  return i.listener = mg(e, function(s) {
    i.messagesCallback && s.uuid !== r && (!s.token || n.has(s.token) || s.data.time && s.data.time < i.messagesCallbackTime || (n.add(s.token), i.messagesCallback(s.data)));
  }), i;
}
function gg(e) {
  vg(e.listener);
}
function bg(e, t, r) {
  e.messagesCallbackTime = r, e.messagesCallback = t;
}
function af() {
  var e = rf();
  if (!e) return !1;
  try {
    var t = "__broadcastchannel_check";
    e.setItem(t, "works"), e.removeItem(t);
  } catch {
    return !1;
  }
  return !0;
}
function _g() {
  var e = 120, t = navigator.userAgent.toLowerCase();
  return t.includes("safari") && !t.includes("chrome") ? e * 2 : e;
}
var wg = {
  create: yg,
  close: gg,
  onMessage: bg,
  postMessage: pg,
  canBeUsed: af,
  type: hg,
  averageResponseTime: _g,
  microSeconds: fg
}, sf = hi, xg = "simulate", $o = /* @__PURE__ */ new Set();
function kg(e) {
  var t = {
    time: sf(),
    name: e,
    messagesCallback: null
  };
  return $o.add(t), t;
}
function Og(e) {
  $o.delete(e);
}
var of = 5;
function Sg(e, t) {
  return new Promise(function(r) {
    return setTimeout(function() {
      var n = Array.from($o);
      n.forEach(function(i) {
        i.name === e.name && // has same name
        i !== e && i.messagesCallback && // has subscribers
        i.time < t.time && i.messagesCallback(t);
      }), r();
    }, of);
  });
}
function Eg(e, t) {
  e.messagesCallback = t;
}
function Cg() {
  return !0;
}
function Rg() {
  return of;
}
var Dg = {
  create: kg,
  close: Og,
  onMessage: Eg,
  postMessage: Sg,
  canBeUsed: Cg,
  type: xg,
  averageResponseTime: Rg,
  microSeconds: sf
}, rc = [
  Hy,
  // fastest
  lg,
  wg
];
function Ig(e) {
  var t = [].concat(e.methods, rc).filter(Boolean);
  if (e.type) {
    if (e.type === "simulate")
      return Dg;
    var r = t.find(function(i) {
      return i.type === e.type;
    });
    if (r) return r;
    throw new Error("method-type " + e.type + " not found");
  }
  e.webWorkerSupport || (t = t.filter(function(i) {
    return i.type !== "idb";
  }));
  var n = t.find(function(i) {
    return i.canBeUsed();
  });
  if (n)
    return n;
  throw new Error("No usable method found in " + JSON.stringify(rc.map(function(i) {
    return i.type;
  })));
}
var uf = /* @__PURE__ */ new Set(), Pg = 0, jo = function(t, r) {
  this.id = Pg++, uf.add(this), this.name = t, this.options = No(r), this.method = Ig(this.options), this._iL = !1, this._onML = null, this._addEL = {
    message: [],
    internal: []
  }, this._uMP = /* @__PURE__ */ new Set(), this._befC = [], this._prepP = null, Tg(this);
};
jo._pubkey = !0;
jo.prototype = {
  postMessage: function(t) {
    if (this.closed)
      throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed " + /**
       * In the past when this error appeared, it was really hard to debug.
       * So now we log the msg together with the error so it at least
       * gives some clue about where in your application this happens.
       */
      JSON.stringify(t));
    return nc(this, "message", t);
  },
  postInternal: function(t) {
    return nc(this, "internal", t);
  },
  set onmessage(e) {
    var t = this.method.microSeconds(), r = {
      time: t,
      fn: e
    };
    ac(this, "message", this._onML), e && typeof e == "function" ? (this._onML = r, ic(this, "message", r)) : this._onML = null;
  },
  addEventListener: function(t, r) {
    var n = this.method.microSeconds(), i = {
      time: n,
      fn: r
    };
    ic(this, t, i);
  },
  removeEventListener: function(t, r) {
    var n = this._addEL[t].find(function(i) {
      return i.fn === r;
    });
    ac(this, t, n);
  },
  close: function() {
    var t = this;
    if (!this.closed) {
      uf.delete(this), this.closed = !0;
      var r = this._prepP ? this._prepP : Sr;
      return this._onML = null, this._addEL.message = [], r.then(function() {
        return Promise.all(Array.from(t._uMP));
      }).then(function() {
        return Promise.all(t._befC.map(function(n) {
          return n();
        }));
      }).then(function() {
        return t.method.close(t._state);
      });
    }
  },
  get type() {
    return this.method.type;
  },
  get isClosed() {
    return this.closed;
  }
};
function nc(e, t, r) {
  var n = e.method.microSeconds(), i = {
    time: n,
    type: t,
    data: r
  }, s = e._prepP ? e._prepP : Sr;
  return s.then(function() {
    var u = e.method.postMessage(e._state, i);
    return e._uMP.add(u), u.catch().then(function() {
      return e._uMP.delete(u);
    }), u;
  });
}
function Tg(e) {
  var t = e.method.create(e.name, e.options);
  $y(t) ? (e._prepP = t, t.then(function(r) {
    e._state = r;
  })) : e._state = t;
}
function cf(e) {
  return e._addEL.message.length > 0 || e._addEL.internal.length > 0;
}
function ic(e, t, r) {
  e._addEL[t].push(r), Ag(e);
}
function ac(e, t, r) {
  e._addEL[t] = e._addEL[t].filter(function(n) {
    return n !== r;
  }), Mg(e);
}
function Ag(e) {
  if (!e._iL && cf(e)) {
    var t = function(i) {
      e._addEL[i.type].forEach(function(s) {
        i.time >= s.time && s.fn(i.data);
      });
    }, r = e.method.microSeconds();
    e._prepP ? e._prepP.then(function() {
      e._iL = !0, e.method.onMessage(e._state, t, r);
    }) : (e._iL = !0, e.method.onMessage(e._state, t, r));
  }
}
function Mg(e) {
  if (e._iL && !cf(e)) {
    e._iL = !1;
    var t = e.method.microSeconds();
    e.method.onMessage(e._state, null, t);
  }
}
var oa = /* @__PURE__ */ new Map();
function Ng(e, t, r, n) {
  var i = oa.get(t);
  return i || (i = {
    /**
     * We have to use the databaseName instead of the databaseInstanceToken
     * in the BroadcastChannel name because different instances must end with the same
     * channel name to be able to broadcast messages between each other.
     */
    bc: new jo(["RxDB:", e, r].join("|")),
    refs: /* @__PURE__ */ new Set()
  }, oa.set(t, i)), i.refs.add(n), i.bc;
}
function sc(e, t) {
  var r = oa.get(e);
  if (r && (r.refs.delete(t), r.refs.size === 0))
    return oa.delete(e), r.bc.close();
}
function Bg(e, t, r, n) {
  if (t.multiInstance) {
    var i = Ng(e, t.databaseInstanceToken, r.databaseName, r), s = new rr(), u = (C) => {
      C.storageName === e && C.databaseName === t.databaseName && C.collectionName === t.collectionName && C.version === t.schema.version && s.next(C.eventBulk);
    };
    i.addEventListener("message", u);
    var l = r.changeStream(), d = !1, m = l.subscribe((C) => {
      d || i.postMessage({
        storageName: e,
        databaseName: t.databaseName,
        collectionName: t.collectionName,
        version: t.schema.version,
        eventBulk: C
      });
    });
    r.changeStream = function() {
      return s.asObservable().pipe(Ep(l));
    };
    var v = r.close.bind(r);
    r.close = async function() {
      return d = !0, m.unsubscribe(), i.removeEventListener("message", u), await sc(t.databaseInstanceToken, r), v();
    };
    var _ = r.remove.bind(r);
    r.remove = async function() {
      return d = !0, m.unsubscribe(), i.removeEventListener("message", u), await sc(t.databaseInstanceToken, r), _();
    };
  }
}
var oc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $g(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var lf = { exports: {} };
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(oc, function() {
    var r = function(a, o) {
      return (r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(c, f) {
        c.__proto__ = f;
      } || function(c, f) {
        for (var h in f) Object.prototype.hasOwnProperty.call(f, h) && (c[h] = f[h]);
      })(a, o);
    }, n = function() {
      return (n = Object.assign || function(a) {
        for (var o, c = 1, f = arguments.length; c < f; c++) for (var h in o = arguments[c]) Object.prototype.hasOwnProperty.call(o, h) && (a[h] = o[h]);
        return a;
      }).apply(this, arguments);
    };
    function i(a, o, c) {
      for (var f, h = 0, p = o.length; h < p; h++) !f && h in o || ((f = f || Array.prototype.slice.call(o, 0, h))[h] = o[h]);
      return a.concat(f || Array.prototype.slice.call(o));
    }
    var s = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : oc, u = Object.keys, l = Array.isArray;
    function d(a, o) {
      return typeof o != "object" || u(o).forEach(function(c) {
        a[c] = o[c];
      }), a;
    }
    typeof Promise > "u" || s.Promise || (s.Promise = Promise);
    var m = Object.getPrototypeOf, v = {}.hasOwnProperty;
    function _(a, o) {
      return v.call(a, o);
    }
    function C(a, o) {
      typeof o == "function" && (o = o(m(a))), (typeof Reflect > "u" ? u : Reflect.ownKeys)(o).forEach(function(c) {
        M(a, c, o[c]);
      });
    }
    var I = Object.defineProperty;
    function M(a, o, c, f) {
      I(a, o, d(c && _(c, "get") && typeof c.get == "function" ? { get: c.get, set: c.set, configurable: !0 } : { value: c, configurable: !0, writable: !0 }, f));
    }
    function B(a) {
      return { from: function(o) {
        return a.prototype = Object.create(o.prototype), M(a.prototype, "constructor", a), { extend: C.bind(null, a.prototype) };
      } };
    }
    var Q = Object.getOwnPropertyDescriptor, G = [].slice;
    function X(a, o, c) {
      return G.call(a, o, c);
    }
    function ee(a, o) {
      return o(a);
    }
    function ye(a) {
      if (!a) throw new Error("Assertion Failed");
    }
    function ae(a) {
      s.setImmediate ? setImmediate(a) : setTimeout(a, 0);
    }
    function ce(a, o) {
      if (typeof o == "string" && _(a, o)) return a[o];
      if (!o) return a;
      if (typeof o != "string") {
        for (var c = [], f = 0, h = o.length; f < h; ++f) {
          var p = ce(a, o[f]);
          c.push(p);
        }
        return c;
      }
      var y = o.indexOf(".");
      if (y !== -1) {
        var g = a[o.substr(0, y)];
        return g == null ? void 0 : ce(g, o.substr(y + 1));
      }
    }
    function le(a, o, c) {
      if (a && o !== void 0 && !("isFrozen" in Object && Object.isFrozen(a))) if (typeof o != "string" && "length" in o) {
        ye(typeof c != "string" && "length" in c);
        for (var f = 0, h = o.length; f < h; ++f) le(a, o[f], c[f]);
      } else {
        var p, y, g = o.indexOf(".");
        g !== -1 ? (p = o.substr(0, g), (y = o.substr(g + 1)) === "" ? c === void 0 ? l(a) && !isNaN(parseInt(p)) ? a.splice(p, 1) : delete a[p] : a[p] = c : le(g = !(g = a[p]) || !_(a, p) ? a[p] = {} : g, y, c)) : c === void 0 ? l(a) && !isNaN(parseInt(o)) ? a.splice(o, 1) : delete a[o] : a[o] = c;
      }
    }
    function be(a) {
      var o, c = {};
      for (o in a) _(a, o) && (c[o] = a[o]);
      return c;
    }
    var Me = [].concat;
    function dt(a) {
      return Me.apply([], a);
    }
    var Et = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(dt([8, 16, 32, 64].map(function(a) {
      return ["Int", "Uint", "Float"].map(function(o) {
        return o + a + "Array";
      });
    }))).filter(function(a) {
      return s[a];
    }), Mr = new Set(Et.map(function(a) {
      return s[a];
    })), ot = null;
    function qe(a) {
      return ot = /* @__PURE__ */ new WeakMap(), a = function o(c) {
        if (!c || typeof c != "object") return c;
        var f = ot.get(c);
        if (f) return f;
        if (l(c)) {
          f = [], ot.set(c, f);
          for (var h = 0, p = c.length; h < p; ++h) f.push(o(c[h]));
        } else if (Mr.has(c.constructor)) f = c;
        else {
          var y, g = m(c);
          for (y in f = g === Object.prototype ? {} : Object.create(g), ot.set(c, f), c) _(c, y) && (f[y] = o(c[y]));
        }
        return f;
      }(a), ot = null, a;
    }
    var Oa = {}.toString;
    function vn(a) {
      return Oa.call(a).slice(8, -1);
    }
    var yn = typeof Symbol < "u" ? Symbol.iterator : "@@iterator", Sa = typeof yn == "symbol" ? function(a) {
      var o;
      return a != null && (o = a[yn]) && o.apply(a);
    } : function() {
      return null;
    };
    function Je(a, o) {
      return o = a.indexOf(o), 0 <= o && a.splice(o, 1), 0 <= o;
    }
    var ut = {};
    function Ve(a) {
      var o, c, f, h;
      if (arguments.length === 1) {
        if (l(a)) return a.slice();
        if (this === ut && typeof a == "string") return [a];
        if (h = Sa(a)) {
          for (c = []; !(f = h.next()).done; ) c.push(f.value);
          return c;
        }
        if (a == null) return [a];
        if (typeof (o = a.length) != "number") return [a];
        for (c = new Array(o); o--; ) c[o] = a[o];
        return c;
      }
      for (o = arguments.length, c = new Array(o); o--; ) c[o] = arguments[o];
      return c;
    }
    var qt = typeof Symbol < "u" ? function(a) {
      return a[Symbol.toStringTag] === "AsyncFunction";
    } : function() {
      return !1;
    }, _n = ["Unknown", "Constraint", "Data", "TransactionInactive", "ReadOnly", "Version", "NotFound", "InvalidState", "InvalidAccess", "Abort", "Timeout", "QuotaExceeded", "Syntax", "DataClone"], Xe = ["Modify", "Bulk", "OpenFailed", "VersionChange", "Schema", "Upgrade", "InvalidTable", "MissingAPI", "NoSuchDatabase", "InvalidArgument", "SubTransaction", "Unsupported", "Internal", "DatabaseClosed", "PrematureCommit", "ForeignAwait"].concat(_n), Ea = { VersionChanged: "Database version changed by other database connection", DatabaseClosed: "Database has been closed", Abort: "Transaction aborted", TransactionInactive: "Transaction has already completed or failed", MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb" };
    function Ee(a, o) {
      this.name = a, this.message = o;
    }
    function We(a, o) {
      return a + ". Errors: " + Object.keys(o).map(function(c) {
        return o[c].toString();
      }).filter(function(c, f, h) {
        return h.indexOf(c) === f;
      }).join(`
`);
    }
    function Ot(a, o, c, f) {
      this.failures = o, this.failedKeys = f, this.successCount = c, this.message = We(a, o);
    }
    function Ft(a, o) {
      this.name = "BulkError", this.failures = Object.keys(o).map(function(c) {
        return o[c];
      }), this.failuresByPos = o, this.message = We(a, this.failures);
    }
    B(Ee).from(Error).extend({ toString: function() {
      return this.name + ": " + this.message;
    } }), B(Ot).from(Ee), B(Ft).from(Ee);
    var Ca = Xe.reduce(function(a, o) {
      return a[o] = o + "Error", a;
    }, {}), bf = Ee, te = Xe.reduce(function(a, o) {
      var c = o + "Error";
      function f(h, p) {
        this.name = c, h ? typeof h == "string" ? (this.message = "".concat(h).concat(p ? `
 ` + p : ""), this.inner = p || null) : typeof h == "object" && (this.message = "".concat(h.name, " ").concat(h.message), this.inner = h) : (this.message = Ea[o] || c, this.inner = null);
      }
      return B(f).from(bf), a[o] = f, a;
    }, {});
    te.Syntax = SyntaxError, te.Type = TypeError, te.Range = RangeError;
    var Lo = _n.reduce(function(a, o) {
      return a[o + "Error"] = te[o], a;
    }, {}), pi = Xe.reduce(function(a, o) {
      return ["Syntax", "Type", "Range"].indexOf(o) === -1 && (a[o + "Error"] = te[o]), a;
    }, {});
    function ve() {
    }
    function gn(a) {
      return a;
    }
    function _f(a, o) {
      return a == null || a === gn ? o : function(c) {
        return o(a(c));
      };
    }
    function or(a, o) {
      return function() {
        a.apply(this, arguments), o.apply(this, arguments);
      };
    }
    function wf(a, o) {
      return a === ve ? o : function() {
        var c = a.apply(this, arguments);
        c !== void 0 && (arguments[0] = c);
        var f = this.onsuccess, h = this.onerror;
        this.onsuccess = null, this.onerror = null;
        var p = o.apply(this, arguments);
        return f && (this.onsuccess = this.onsuccess ? or(f, this.onsuccess) : f), h && (this.onerror = this.onerror ? or(h, this.onerror) : h), p !== void 0 ? p : c;
      };
    }
    function xf(a, o) {
      return a === ve ? o : function() {
        a.apply(this, arguments);
        var c = this.onsuccess, f = this.onerror;
        this.onsuccess = this.onerror = null, o.apply(this, arguments), c && (this.onsuccess = this.onsuccess ? or(c, this.onsuccess) : c), f && (this.onerror = this.onerror ? or(f, this.onerror) : f);
      };
    }
    function kf(a, o) {
      return a === ve ? o : function(c) {
        var f = a.apply(this, arguments);
        d(c, f);
        var h = this.onsuccess, p = this.onerror;
        return this.onsuccess = null, this.onerror = null, c = o.apply(this, arguments), h && (this.onsuccess = this.onsuccess ? or(h, this.onsuccess) : h), p && (this.onerror = this.onerror ? or(p, this.onerror) : p), f === void 0 ? c === void 0 ? void 0 : c : d(f, c);
      };
    }
    function Of(a, o) {
      return a === ve ? o : function() {
        return o.apply(this, arguments) !== !1 && a.apply(this, arguments);
      };
    }
    function Ra(a, o) {
      return a === ve ? o : function() {
        var c = a.apply(this, arguments);
        if (c && typeof c.then == "function") {
          for (var f = this, h = arguments.length, p = new Array(h); h--; ) p[h] = arguments[h];
          return c.then(function() {
            return o.apply(f, p);
          });
        }
        return o.apply(this, arguments);
      };
    }
    pi.ModifyError = Ot, pi.DexieError = Ee, pi.BulkError = Ft;
    var ht = typeof location < "u" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
    function qo(a) {
      ht = a;
    }
    var bn = {}, Fo = 100, Et = typeof Promise > "u" ? [] : function() {
      var a = Promise.resolve();
      if (typeof crypto > "u" || !crypto.subtle) return [a, m(a), a];
      var o = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
      return [o, m(o), a];
    }(), _n = Et[0], Xe = Et[1], Et = Et[2], Xe = Xe && Xe.then, ur = _n && _n.constructor, Da = !!Et, wn = function(a, o) {
      xn.push([a, o]), mi && (queueMicrotask(Ef), mi = !1);
    }, Ia = !0, mi = !0, cr = [], vi = [], Pa = gn, Kt = { id: "global", global: !0, ref: 0, unhandleds: [], onunhandled: ve, pgp: !1, env: {}, finalize: ve }, J = Kt, xn = [], lr = 0, yi = [];
    function V(a) {
      if (typeof this != "object") throw new TypeError("Promises must be constructed via new");
      this._listeners = [], this._lib = !1;
      var o = this._PSD = J;
      if (typeof a != "function") {
        if (a !== bn) throw new TypeError("Not a function");
        return this._state = arguments[1], this._value = arguments[2], void (this._state === !1 && Aa(this, this._value));
      }
      this._state = null, this._value = null, ++o.ref, function c(f, h) {
        try {
          h(function(p) {
            if (f._state === null) {
              if (p === f) throw new TypeError("A promise cannot be resolved with itself.");
              var y = f._lib && Nr();
              p && typeof p.then == "function" ? c(f, function(g, w) {
                p instanceof V ? p._then(g, w) : p.then(g, w);
              }) : (f._state = !0, f._value = p, Uo(f)), y && Br();
            }
          }, Aa.bind(null, f));
        } catch (p) {
          Aa(f, p);
        }
      }(this, a);
    }
    var Ta = { get: function() {
      var a = J, o = wi;
      function c(f, h) {
        var p = this, y = !a.global && (a !== J || o !== wi), g = y && !Wt(), w = new V(function(k, E) {
          Ma(p, new Ko(zo(f, a, y, g), zo(h, a, y, g), k, E, a));
        });
        return this._consoleTask && (w._consoleTask = this._consoleTask), w;
      }
      return c.prototype = bn, c;
    }, set: function(a) {
      M(this, "then", a && a.prototype === bn ? Ta : { get: function() {
        return a;
      }, set: Ta.set });
    } };
    function Ko(a, o, c, f, h) {
      this.onFulfilled = typeof a == "function" ? a : null, this.onRejected = typeof o == "function" ? o : null, this.resolve = c, this.reject = f, this.psd = h;
    }
    function Aa(a, o) {
      var c, f;
      vi.push(o), a._state === null && (c = a._lib && Nr(), o = Pa(o), a._state = !1, a._value = o, f = a, cr.some(function(h) {
        return h._value === f._value;
      }) || cr.push(f), Uo(a), c && Br());
    }
    function Uo(a) {
      var o = a._listeners;
      a._listeners = [];
      for (var c = 0, f = o.length; c < f; ++c) Ma(a, o[c]);
      var h = a._PSD;
      --h.ref || h.finalize(), lr === 0 && (++lr, wn(function() {
        --lr == 0 && Na();
      }, []));
    }
    function Ma(a, o) {
      if (a._state !== null) {
        var c = a._state ? o.onFulfilled : o.onRejected;
        if (c === null) return (a._state ? o.resolve : o.reject)(a._value);
        ++o.psd.ref, ++lr, wn(Sf, [c, a, o]);
      } else a._listeners.push(o);
    }
    function Sf(a, o, c) {
      try {
        var f, h = o._value;
        !o._state && vi.length && (vi = []), f = ht && o._consoleTask ? o._consoleTask.run(function() {
          return a(h);
        }) : a(h), o._state || vi.indexOf(h) !== -1 || function(p) {
          for (var y = cr.length; y; ) if (cr[--y]._value === p._value) return cr.splice(y, 1);
        }(o), c.resolve(f);
      } catch (p) {
        c.reject(p);
      } finally {
        --lr == 0 && Na(), --c.psd.ref || c.psd.finalize();
      }
    }
    function Ef() {
      fr(Kt, function() {
        Nr() && Br();
      });
    }
    function Nr() {
      var a = Ia;
      return mi = Ia = !1, a;
    }
    function Br() {
      var a, o, c;
      do
        for (; 0 < xn.length; ) for (a = xn, xn = [], c = a.length, o = 0; o < c; ++o) {
          var f = a[o];
          f[0].apply(null, f[1]);
        }
      while (0 < xn.length);
      mi = Ia = !0;
    }
    function Na() {
      var a = cr;
      cr = [], a.forEach(function(f) {
        f._PSD.onunhandled.call(null, f._value, f);
      });
      for (var o = yi.slice(0), c = o.length; c; ) o[--c]();
    }
    function gi(a) {
      return new V(bn, !1, a);
    }
    function we(a, o) {
      var c = J;
      return function() {
        var f = Nr(), h = J;
        try {
          return zt(c, !0), a.apply(this, arguments);
        } catch (p) {
          o && o(p);
        } finally {
          zt(h, !1), f && Br();
        }
      };
    }
    C(V.prototype, { then: Ta, _then: function(a, o) {
      Ma(this, new Ko(null, null, a, o, J));
    }, catch: function(a) {
      if (arguments.length === 1) return this.then(null, a);
      var o = a, c = arguments[1];
      return typeof o == "function" ? this.then(null, function(f) {
        return (f instanceof o ? c : gi)(f);
      }) : this.then(null, function(f) {
        return (f && f.name === o ? c : gi)(f);
      });
    }, finally: function(a) {
      return this.then(function(o) {
        return V.resolve(a()).then(function() {
          return o;
        });
      }, function(o) {
        return V.resolve(a()).then(function() {
          return gi(o);
        });
      });
    }, timeout: function(a, o) {
      var c = this;
      return a < 1 / 0 ? new V(function(f, h) {
        var p = setTimeout(function() {
          return h(new te.Timeout(o));
        }, a);
        c.then(f, h).finally(clearTimeout.bind(null, p));
      }) : this;
    } }), typeof Symbol < "u" && Symbol.toStringTag && M(V.prototype, Symbol.toStringTag, "Dexie.Promise"), Kt.env = Wo(), C(V, { all: function() {
      var a = Ve.apply(null, arguments).map(xi);
      return new V(function(o, c) {
        a.length === 0 && o([]);
        var f = a.length;
        a.forEach(function(h, p) {
          return V.resolve(h).then(function(y) {
            a[p] = y, --f || o(a);
          }, c);
        });
      });
    }, resolve: function(a) {
      return a instanceof V ? a : a && typeof a.then == "function" ? new V(function(o, c) {
        a.then(o, c);
      }) : new V(bn, !0, a);
    }, reject: gi, race: function() {
      var a = Ve.apply(null, arguments).map(xi);
      return new V(function(o, c) {
        a.map(function(f) {
          return V.resolve(f).then(o, c);
        });
      });
    }, PSD: { get: function() {
      return J;
    }, set: function(a) {
      return J = a;
    } }, totalEchoes: { get: function() {
      return wi;
    } }, newPSD: Ut, usePSD: fr, scheduler: { get: function() {
      return wn;
    }, set: function(a) {
      wn = a;
    } }, rejectionMapper: { get: function() {
      return Pa;
    }, set: function(a) {
      Pa = a;
    } }, follow: function(a, o) {
      return new V(function(c, f) {
        return Ut(function(h, p) {
          var y = J;
          y.unhandleds = [], y.onunhandled = p, y.finalize = or(function() {
            var g, w = this;
            g = function() {
              w.unhandleds.length === 0 ? h() : p(w.unhandleds[0]);
            }, yi.push(function k() {
              g(), yi.splice(yi.indexOf(k), 1);
            }), ++lr, wn(function() {
              --lr == 0 && Na();
            }, []);
          }, y.finalize), a();
        }, o, c, f);
      });
    } }), ur && (ur.allSettled && M(V, "allSettled", function() {
      var a = Ve.apply(null, arguments).map(xi);
      return new V(function(o) {
        a.length === 0 && o([]);
        var c = a.length, f = new Array(c);
        a.forEach(function(h, p) {
          return V.resolve(h).then(function(y) {
            return f[p] = { status: "fulfilled", value: y };
          }, function(y) {
            return f[p] = { status: "rejected", reason: y };
          }).then(function() {
            return --c || o(f);
          });
        });
      });
    }), ur.any && typeof AggregateError < "u" && M(V, "any", function() {
      var a = Ve.apply(null, arguments).map(xi);
      return new V(function(o, c) {
        a.length === 0 && c(new AggregateError([]));
        var f = a.length, h = new Array(f);
        a.forEach(function(p, y) {
          return V.resolve(p).then(function(g) {
            return o(g);
          }, function(g) {
            h[y] = g, --f || c(new AggregateError(h));
          });
        });
      });
    }), ur.withResolvers && (V.withResolvers = ur.withResolvers));
    var De = { awaits: 0, echoes: 0, id: 0 }, Cf = 0, bi = [], _i = 0, wi = 0, Rf = 0;
    function Ut(a, o, c, f) {
      var h = J, p = Object.create(h);
      return p.parent = h, p.ref = 0, p.global = !1, p.id = ++Rf, Kt.env, p.env = Da ? { Promise: V, PromiseProp: { value: V, configurable: !0, writable: !0 }, all: V.all, race: V.race, allSettled: V.allSettled, any: V.any, resolve: V.resolve, reject: V.reject } : {}, o && d(p, o), ++h.ref, p.finalize = function() {
        --this.parent.ref || this.parent.finalize();
      }, f = fr(p, a, c, f), p.ref === 0 && p.finalize(), f;
    }
    function $r() {
      return De.id || (De.id = ++Cf), ++De.awaits, De.echoes += Fo, De.id;
    }
    function Wt() {
      return !!De.awaits && (--De.awaits == 0 && (De.id = 0), De.echoes = De.awaits * Fo, !0);
    }
    function xi(a) {
      return De.echoes && a && a.constructor === ur ? ($r(), a.then(function(o) {
        return Wt(), o;
      }, function(o) {
        return Wt(), Oe(o);
      })) : a;
    }
    function Df() {
      var a = bi[bi.length - 1];
      bi.pop(), zt(a, !1);
    }
    function zt(a, o) {
      var c, f = J;
      (o ? !De.echoes || _i++ && a === J : !_i || --_i && a === J) || queueMicrotask(o ? (function(h) {
        ++wi, De.echoes && --De.echoes != 0 || (De.echoes = De.awaits = De.id = 0), bi.push(J), zt(h, !0);
      }).bind(null, a) : Df), a !== J && (J = a, f === Kt && (Kt.env = Wo()), Da && (c = Kt.env.Promise, o = a.env, (f.global || a.global) && (Object.defineProperty(s, "Promise", o.PromiseProp), c.all = o.all, c.race = o.race, c.resolve = o.resolve, c.reject = o.reject, o.allSettled && (c.allSettled = o.allSettled), o.any && (c.any = o.any))));
    }
    function Wo() {
      var a = s.Promise;
      return Da ? { Promise: a, PromiseProp: Object.getOwnPropertyDescriptor(s, "Promise"), all: a.all, race: a.race, allSettled: a.allSettled, any: a.any, resolve: a.resolve, reject: a.reject } : {};
    }
    function fr(a, o, c, f, h) {
      var p = J;
      try {
        return zt(a, !0), o(c, f, h);
      } finally {
        zt(p, !1);
      }
    }
    function zo(a, o, c, f) {
      return typeof a != "function" ? a : function() {
        var h = J;
        c && $r(), zt(o, !0);
        try {
          return a.apply(this, arguments);
        } finally {
          zt(h, !1), f && queueMicrotask(Wt);
        }
      };
    }
    function Ba(a) {
      Promise === ur && De.echoes === 0 ? _i === 0 ? a() : enqueueNativeMicroTask(a) : setTimeout(a, 0);
    }
    ("" + Xe).indexOf("[native code]") === -1 && ($r = Wt = ve);
    var Oe = V.reject, dr = "￿", St = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", Vo = "String expected.", jr = [], ki = "__dbnames", $a = "readonly", ja = "readwrite";
    function hr(a, o) {
      return a ? o ? function() {
        return a.apply(this, arguments) && o.apply(this, arguments);
      } : a : o;
    }
    var Ho = { type: 3, lower: -1 / 0, lowerOpen: !1, upper: [[]], upperOpen: !1 };
    function Oi(a) {
      return typeof a != "string" || /\./.test(a) ? function(o) {
        return o;
      } : function(o) {
        return o[a] === void 0 && a in o && delete (o = qe(o))[a], o;
      };
    }
    function Zo() {
      throw te.Type();
    }
    function he(a, o) {
      try {
        var c = Qo(a), f = Qo(o);
        if (c !== f) return c === "Array" ? 1 : f === "Array" ? -1 : c === "binary" ? 1 : f === "binary" ? -1 : c === "string" ? 1 : f === "string" ? -1 : c === "Date" ? 1 : f !== "Date" ? NaN : -1;
        switch (c) {
          case "number":
          case "Date":
          case "string":
            return o < a ? 1 : a < o ? -1 : 0;
          case "binary":
            return function(h, p) {
              for (var y = h.length, g = p.length, w = y < g ? y : g, k = 0; k < w; ++k) if (h[k] !== p[k]) return h[k] < p[k] ? -1 : 1;
              return y === g ? 0 : y < g ? -1 : 1;
            }(Go(a), Go(o));
          case "Array":
            return function(h, p) {
              for (var y = h.length, g = p.length, w = y < g ? y : g, k = 0; k < w; ++k) {
                var E = he(h[k], p[k]);
                if (E !== 0) return E;
              }
              return y === g ? 0 : y < g ? -1 : 1;
            }(a, o);
        }
      } catch {
      }
      return NaN;
    }
    function Qo(a) {
      var o = typeof a;
      return o != "object" ? o : ArrayBuffer.isView(a) ? "binary" : (a = vn(a), a === "ArrayBuffer" ? "binary" : a);
    }
    function Go(a) {
      return a instanceof Uint8Array ? a : ArrayBuffer.isView(a) ? new Uint8Array(a.buffer, a.byteOffset, a.byteLength) : new Uint8Array(a);
    }
    var Yo = (_e.prototype._trans = function(a, o, c) {
      var f = this._tx || J.trans, h = this.name, p = ht && typeof console < "u" && console.createTask && console.createTask("Dexie: ".concat(a === "readonly" ? "read" : "write", " ").concat(this.name));
      function y(k, E, b) {
        if (!b.schema[h]) throw new te.NotFound("Table " + h + " not part of transaction");
        return o(b.idbtrans, b);
      }
      var g = Nr();
      try {
        var w = f && f.db._novip === this.db._novip ? f === J.trans ? f._promise(a, y, c) : Ut(function() {
          return f._promise(a, y, c);
        }, { trans: f, transless: J.transless || J }) : function k(E, b, D, x) {
          if (E.idbdb && (E._state.openComplete || J.letThrough || E._vip)) {
            var S = E._createTransaction(b, D, E._dbSchema);
            try {
              S.create(), E._state.PR1398_maxLoop = 3;
            } catch (R) {
              return R.name === Ca.InvalidState && E.isOpen() && 0 < --E._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), E.close({ disableAutoOpen: !1 }), E.open().then(function() {
                return k(E, b, D, x);
              })) : Oe(R);
            }
            return S._promise(b, function(R, O) {
              return Ut(function() {
                return J.trans = S, x(R, O, S);
              });
            }).then(function(R) {
              if (b === "readwrite") try {
                S.idbtrans.commit();
              } catch {
              }
              return b === "readonly" ? R : S._completion.then(function() {
                return R;
              });
            });
          }
          if (E._state.openComplete) return Oe(new te.DatabaseClosed(E._state.dbOpenError));
          if (!E._state.isBeingOpened) {
            if (!E._state.autoOpen) return Oe(new te.DatabaseClosed());
            E.open().catch(ve);
          }
          return E._state.dbReadyPromise.then(function() {
            return k(E, b, D, x);
          });
        }(this.db, a, [this.name], y);
        return p && (w._consoleTask = p, w = w.catch(function(k) {
          return console.trace(k), Oe(k);
        })), w;
      } finally {
        g && Br();
      }
    }, _e.prototype.get = function(a, o) {
      var c = this;
      return a && a.constructor === Object ? this.where(a).first(o) : a == null ? Oe(new te.Type("Invalid argument to Table.get()")) : this._trans("readonly", function(f) {
        return c.core.get({ trans: f, key: a }).then(function(h) {
          return c.hook.reading.fire(h);
        });
      }).then(o);
    }, _e.prototype.where = function(a) {
      if (typeof a == "string") return new this.db.WhereClause(this, a);
      if (l(a)) return new this.db.WhereClause(this, "[".concat(a.join("+"), "]"));
      var o = u(a);
      if (o.length === 1) return this.where(o[0]).equals(a[o[0]]);
      var c = this.schema.indexes.concat(this.schema.primKey).filter(function(g) {
        if (g.compound && o.every(function(k) {
          return 0 <= g.keyPath.indexOf(k);
        })) {
          for (var w = 0; w < o.length; ++w) if (o.indexOf(g.keyPath[w]) === -1) return !1;
          return !0;
        }
        return !1;
      }).sort(function(g, w) {
        return g.keyPath.length - w.keyPath.length;
      })[0];
      if (c && this.db._maxKey !== dr) {
        var p = c.keyPath.slice(0, o.length);
        return this.where(p).equals(p.map(function(w) {
          return a[w];
        }));
      }
      !c && ht && console.warn("The query ".concat(JSON.stringify(a), " on ").concat(this.name, " would benefit from a ") + "compound index [".concat(o.join("+"), "]"));
      var f = this.schema.idxByName;
      function h(g, w) {
        return he(g, w) === 0;
      }
      var y = o.reduce(function(b, w) {
        var k = b[0], E = b[1], b = f[w], D = a[w];
        return [k || b, k || !b ? hr(E, b && b.multi ? function(x) {
          return x = ce(x, w), l(x) && x.some(function(S) {
            return h(D, S);
          });
        } : function(x) {
          return h(D, ce(x, w));
        }) : E];
      }, [null, null]), p = y[0], y = y[1];
      return p ? this.where(p.name).equals(a[p.keyPath]).filter(y) : c ? this.filter(y) : this.where(o).equals("");
    }, _e.prototype.filter = function(a) {
      return this.toCollection().and(a);
    }, _e.prototype.count = function(a) {
      return this.toCollection().count(a);
    }, _e.prototype.offset = function(a) {
      return this.toCollection().offset(a);
    }, _e.prototype.limit = function(a) {
      return this.toCollection().limit(a);
    }, _e.prototype.each = function(a) {
      return this.toCollection().each(a);
    }, _e.prototype.toArray = function(a) {
      return this.toCollection().toArray(a);
    }, _e.prototype.toCollection = function() {
      return new this.db.Collection(new this.db.WhereClause(this));
    }, _e.prototype.orderBy = function(a) {
      return new this.db.Collection(new this.db.WhereClause(this, l(a) ? "[".concat(a.join("+"), "]") : a));
    }, _e.prototype.reverse = function() {
      return this.toCollection().reverse();
    }, _e.prototype.mapToClass = function(a) {
      var o, c = this.db, f = this.name;
      function h() {
        return o !== null && o.apply(this, arguments) || this;
      }
      (this.schema.mappedClass = a).prototype instanceof Zo && (function(w, k) {
        if (typeof k != "function" && k !== null) throw new TypeError("Class extends value " + String(k) + " is not a constructor or null");
        function E() {
          this.constructor = w;
        }
        r(w, k), w.prototype = k === null ? Object.create(k) : (E.prototype = k.prototype, new E());
      }(h, o = a), Object.defineProperty(h.prototype, "db", { get: function() {
        return c;
      }, enumerable: !1, configurable: !0 }), h.prototype.table = function() {
        return f;
      }, a = h);
      for (var p = /* @__PURE__ */ new Set(), y = a.prototype; y; y = m(y)) Object.getOwnPropertyNames(y).forEach(function(w) {
        return p.add(w);
      });
      function g(w) {
        if (!w) return w;
        var k, E = Object.create(a.prototype);
        for (k in w) if (!p.has(k)) try {
          E[k] = w[k];
        } catch {
        }
        return E;
      }
      return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = g, this.hook("reading", g), a;
    }, _e.prototype.defineClass = function() {
      return this.mapToClass(function(a) {
        d(this, a);
      });
    }, _e.prototype.add = function(a, o) {
      var c = this, f = this.schema.primKey, h = f.auto, p = f.keyPath, y = a;
      return p && h && (y = Oi(p)(a)), this._trans("readwrite", function(g) {
        return c.core.mutate({ trans: g, type: "add", keys: o != null ? [o] : null, values: [y] });
      }).then(function(g) {
        return g.numFailures ? V.reject(g.failures[0]) : g.lastResult;
      }).then(function(g) {
        if (p) try {
          le(a, p, g);
        } catch {
        }
        return g;
      });
    }, _e.prototype.update = function(a, o) {
      return typeof a != "object" || l(a) ? this.where(":id").equals(a).modify(o) : (a = ce(a, this.schema.primKey.keyPath), a === void 0 ? Oe(new te.InvalidArgument("Given object does not contain its primary key")) : this.where(":id").equals(a).modify(o));
    }, _e.prototype.put = function(a, o) {
      var c = this, f = this.schema.primKey, h = f.auto, p = f.keyPath, y = a;
      return p && h && (y = Oi(p)(a)), this._trans("readwrite", function(g) {
        return c.core.mutate({ trans: g, type: "put", values: [y], keys: o != null ? [o] : null });
      }).then(function(g) {
        return g.numFailures ? V.reject(g.failures[0]) : g.lastResult;
      }).then(function(g) {
        if (p) try {
          le(a, p, g);
        } catch {
        }
        return g;
      });
    }, _e.prototype.delete = function(a) {
      var o = this;
      return this._trans("readwrite", function(c) {
        return o.core.mutate({ trans: c, type: "delete", keys: [a] });
      }).then(function(c) {
        return c.numFailures ? V.reject(c.failures[0]) : void 0;
      });
    }, _e.prototype.clear = function() {
      var a = this;
      return this._trans("readwrite", function(o) {
        return a.core.mutate({ trans: o, type: "deleteRange", range: Ho });
      }).then(function(o) {
        return o.numFailures ? V.reject(o.failures[0]) : void 0;
      });
    }, _e.prototype.bulkGet = function(a) {
      var o = this;
      return this._trans("readonly", function(c) {
        return o.core.getMany({ keys: a, trans: c }).then(function(f) {
          return f.map(function(h) {
            return o.hook.reading.fire(h);
          });
        });
      });
    }, _e.prototype.bulkAdd = function(a, o, c) {
      var f = this, h = Array.isArray(o) ? o : void 0, p = (c = c || (h ? void 0 : o)) ? c.allKeys : void 0;
      return this._trans("readwrite", function(y) {
        var k = f.schema.primKey, g = k.auto, k = k.keyPath;
        if (k && h) throw new te.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
        if (h && h.length !== a.length) throw new te.InvalidArgument("Arguments objects and keys must have the same length");
        var w = a.length, k = k && g ? a.map(Oi(k)) : a;
        return f.core.mutate({ trans: y, type: "add", keys: h, values: k, wantResults: p }).then(function(S) {
          var b = S.numFailures, D = S.results, x = S.lastResult, S = S.failures;
          if (b === 0) return p ? D : x;
          throw new Ft("".concat(f.name, ".bulkAdd(): ").concat(b, " of ").concat(w, " operations failed"), S);
        });
      });
    }, _e.prototype.bulkPut = function(a, o, c) {
      var f = this, h = Array.isArray(o) ? o : void 0, p = (c = c || (h ? void 0 : o)) ? c.allKeys : void 0;
      return this._trans("readwrite", function(y) {
        var k = f.schema.primKey, g = k.auto, k = k.keyPath;
        if (k && h) throw new te.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
        if (h && h.length !== a.length) throw new te.InvalidArgument("Arguments objects and keys must have the same length");
        var w = a.length, k = k && g ? a.map(Oi(k)) : a;
        return f.core.mutate({ trans: y, type: "put", keys: h, values: k, wantResults: p }).then(function(S) {
          var b = S.numFailures, D = S.results, x = S.lastResult, S = S.failures;
          if (b === 0) return p ? D : x;
          throw new Ft("".concat(f.name, ".bulkPut(): ").concat(b, " of ").concat(w, " operations failed"), S);
        });
      });
    }, _e.prototype.bulkUpdate = function(a) {
      var o = this, c = this.core, f = a.map(function(y) {
        return y.key;
      }), h = a.map(function(y) {
        return y.changes;
      }), p = [];
      return this._trans("readwrite", function(y) {
        return c.getMany({ trans: y, keys: f, cache: "clone" }).then(function(g) {
          var w = [], k = [];
          a.forEach(function(b, D) {
            var x = b.key, S = b.changes, R = g[D];
            if (R) {
              for (var O = 0, P = Object.keys(S); O < P.length; O++) {
                var T = P[O], A = S[T];
                if (T === o.schema.primKey.keyPath) {
                  if (he(A, x) !== 0) throw new te.Constraint("Cannot update primary key in bulkUpdate()");
                } else le(R, T, A);
              }
              p.push(D), w.push(x), k.push(R);
            }
          });
          var E = w.length;
          return c.mutate({ trans: y, type: "put", keys: w, values: k, updates: { keys: f, changeSpecs: h } }).then(function(b) {
            var D = b.numFailures, x = b.failures;
            if (D === 0) return E;
            for (var S = 0, R = Object.keys(x); S < R.length; S++) {
              var O, P = R[S], T = p[Number(P)];
              T != null && (O = x[P], delete x[P], x[T] = O);
            }
            throw new Ft("".concat(o.name, ".bulkUpdate(): ").concat(D, " of ").concat(E, " operations failed"), x);
          });
        });
      });
    }, _e.prototype.bulkDelete = function(a) {
      var o = this, c = a.length;
      return this._trans("readwrite", function(f) {
        return o.core.mutate({ trans: f, type: "delete", keys: a });
      }).then(function(y) {
        var h = y.numFailures, p = y.lastResult, y = y.failures;
        if (h === 0) return p;
        throw new Ft("".concat(o.name, ".bulkDelete(): ").concat(h, " of ").concat(c, " operations failed"), y);
      });
    }, _e);
    function _e() {
    }
    function kn(a) {
      function o(y, g) {
        if (g) {
          for (var w = arguments.length, k = new Array(w - 1); --w; ) k[w - 1] = arguments[w];
          return c[y].subscribe.apply(null, k), a;
        }
        if (typeof y == "string") return c[y];
      }
      var c = {};
      o.addEventType = p;
      for (var f = 1, h = arguments.length; f < h; ++f) p(arguments[f]);
      return o;
      function p(y, g, w) {
        if (typeof y != "object") {
          var k;
          g = g || Of;
          var E = { subscribers: [], fire: w = w || ve, subscribe: function(b) {
            E.subscribers.indexOf(b) === -1 && (E.subscribers.push(b), E.fire = g(E.fire, b));
          }, unsubscribe: function(b) {
            E.subscribers = E.subscribers.filter(function(D) {
              return D !== b;
            }), E.fire = E.subscribers.reduce(g, w);
          } };
          return c[y] = o[y] = E;
        }
        u(k = y).forEach(function(b) {
          var D = k[b];
          if (l(D)) p(b, k[b][0], k[b][1]);
          else {
            if (D !== "asap") throw new te.InvalidArgument("Invalid event config");
            var x = p(b, gn, function() {
              for (var S = arguments.length, R = new Array(S); S--; ) R[S] = arguments[S];
              x.subscribers.forEach(function(O) {
                ae(function() {
                  O.apply(null, R);
                });
              });
            });
          }
        });
      }
    }
    function On(a, o) {
      return B(o).from({ prototype: a }), o;
    }
    function Lr(a, o) {
      return !(a.filter || a.algorithm || a.or) && (o ? a.justLimit : !a.replayFilter);
    }
    function La(a, o) {
      a.filter = hr(a.filter, o);
    }
    function qa(a, o, c) {
      var f = a.replayFilter;
      a.replayFilter = f ? function() {
        return hr(f(), o());
      } : o, a.justLimit = c && !f;
    }
    function Si(a, o) {
      if (a.isPrimKey) return o.primaryKey;
      var c = o.getIndexByKeyPath(a.index);
      if (!c) throw new te.Schema("KeyPath " + a.index + " on object store " + o.name + " is not indexed");
      return c;
    }
    function Jo(a, o, c) {
      var f = Si(a, o.schema);
      return o.openCursor({ trans: c, values: !a.keysOnly, reverse: a.dir === "prev", unique: !!a.unique, query: { index: f, range: a.range } });
    }
    function Ei(a, o, c, f) {
      var h = a.replayFilter ? hr(a.filter, a.replayFilter()) : a.filter;
      if (a.or) {
        var p = {}, y = function(g, w, k) {
          var E, b;
          h && !h(w, k, function(D) {
            return w.stop(D);
          }, function(D) {
            return w.fail(D);
          }) || ((b = "" + (E = w.primaryKey)) == "[object ArrayBuffer]" && (b = "" + new Uint8Array(E)), _(p, b) || (p[b] = !0, o(g, w, k)));
        };
        return Promise.all([a.or._iterate(y, c), Xo(Jo(a, f, c), a.algorithm, y, !a.keysOnly && a.valueMapper)]);
      }
      return Xo(Jo(a, f, c), hr(a.algorithm, h), o, !a.keysOnly && a.valueMapper);
    }
    function Xo(a, o, c, f) {
      var h = we(f ? function(p, y, g) {
        return c(f(p), y, g);
      } : c);
      return a.then(function(p) {
        if (p) return p.start(function() {
          var y = function() {
            return p.continue();
          };
          o && !o(p, function(g) {
            return y = g;
          }, function(g) {
            p.stop(g), y = ve;
          }, function(g) {
            p.fail(g), y = ve;
          }) || h(p.value, p, function(g) {
            return y = g;
          }), y();
        });
      });
    }
    var Et = Symbol(), Sn = (eu.prototype.execute = function(a) {
      if (this.add !== void 0) {
        var o = this.add;
        if (l(o)) return i(i([], l(a) ? a : [], !0), o).sort();
        if (typeof o == "number") return (Number(a) || 0) + o;
        if (typeof o == "bigint") try {
          return BigInt(a) + o;
        } catch {
          return BigInt(0) + o;
        }
        throw new TypeError("Invalid term ".concat(o));
      }
      if (this.remove !== void 0) {
        var c = this.remove;
        if (l(c)) return l(a) ? a.filter(function(f) {
          return !c.includes(f);
        }).sort() : [];
        if (typeof c == "number") return Number(a) - c;
        if (typeof c == "bigint") try {
          return BigInt(a) - c;
        } catch {
          return BigInt(0) - c;
        }
        throw new TypeError("Invalid subtrahend ".concat(c));
      }
      return o = (o = this.replacePrefix) === null || o === void 0 ? void 0 : o[0], o && typeof a == "string" && a.startsWith(o) ? this.replacePrefix[1] + a.substring(o.length) : a;
    }, eu);
    function eu(a) {
      Object.assign(this, a);
    }
    var If = (me.prototype._read = function(a, o) {
      var c = this._ctx;
      return c.error ? c.table._trans(null, Oe.bind(null, c.error)) : c.table._trans("readonly", a).then(o);
    }, me.prototype._write = function(a) {
      var o = this._ctx;
      return o.error ? o.table._trans(null, Oe.bind(null, o.error)) : o.table._trans("readwrite", a, "locked");
    }, me.prototype._addAlgorithm = function(a) {
      var o = this._ctx;
      o.algorithm = hr(o.algorithm, a);
    }, me.prototype._iterate = function(a, o) {
      return Ei(this._ctx, a, o, this._ctx.table.core);
    }, me.prototype.clone = function(a) {
      var o = Object.create(this.constructor.prototype), c = Object.create(this._ctx);
      return a && d(c, a), o._ctx = c, o;
    }, me.prototype.raw = function() {
      return this._ctx.valueMapper = null, this;
    }, me.prototype.each = function(a) {
      var o = this._ctx;
      return this._read(function(c) {
        return Ei(o, a, c, o.table.core);
      });
    }, me.prototype.count = function(a) {
      var o = this;
      return this._read(function(c) {
        var f = o._ctx, h = f.table.core;
        if (Lr(f, !0)) return h.count({ trans: c, query: { index: Si(f, h.schema), range: f.range } }).then(function(y) {
          return Math.min(y, f.limit);
        });
        var p = 0;
        return Ei(f, function() {
          return ++p, !1;
        }, c, h).then(function() {
          return p;
        });
      }).then(a);
    }, me.prototype.sortBy = function(a, o) {
      var c = a.split(".").reverse(), f = c[0], h = c.length - 1;
      function p(w, k) {
        return k ? p(w[c[k]], k - 1) : w[f];
      }
      var y = this._ctx.dir === "next" ? 1 : -1;
      function g(w, k) {
        return he(p(w, h), p(k, h)) * y;
      }
      return this.toArray(function(w) {
        return w.sort(g);
      }).then(o);
    }, me.prototype.toArray = function(a) {
      var o = this;
      return this._read(function(c) {
        var f = o._ctx;
        if (f.dir === "next" && Lr(f, !0) && 0 < f.limit) {
          var h = f.valueMapper, p = Si(f, f.table.core.schema);
          return f.table.core.query({ trans: c, limit: f.limit, values: !0, query: { index: p, range: f.range } }).then(function(g) {
            return g = g.result, h ? g.map(h) : g;
          });
        }
        var y = [];
        return Ei(f, function(g) {
          return y.push(g);
        }, c, f.table.core).then(function() {
          return y;
        });
      }, a);
    }, me.prototype.offset = function(a) {
      var o = this._ctx;
      return a <= 0 || (o.offset += a, Lr(o) ? qa(o, function() {
        var c = a;
        return function(f, h) {
          return c === 0 || (c === 1 ? --c : h(function() {
            f.advance(c), c = 0;
          }), !1);
        };
      }) : qa(o, function() {
        var c = a;
        return function() {
          return --c < 0;
        };
      })), this;
    }, me.prototype.limit = function(a) {
      return this._ctx.limit = Math.min(this._ctx.limit, a), qa(this._ctx, function() {
        var o = a;
        return function(c, f, h) {
          return --o <= 0 && f(h), 0 <= o;
        };
      }, !0), this;
    }, me.prototype.until = function(a, o) {
      return La(this._ctx, function(c, f, h) {
        return !a(c.value) || (f(h), o);
      }), this;
    }, me.prototype.first = function(a) {
      return this.limit(1).toArray(function(o) {
        return o[0];
      }).then(a);
    }, me.prototype.last = function(a) {
      return this.reverse().first(a);
    }, me.prototype.filter = function(a) {
      var o;
      return La(this._ctx, function(c) {
        return a(c.value);
      }), (o = this._ctx).isMatch = hr(o.isMatch, a), this;
    }, me.prototype.and = function(a) {
      return this.filter(a);
    }, me.prototype.or = function(a) {
      return new this.db.WhereClause(this._ctx.table, a, this);
    }, me.prototype.reverse = function() {
      return this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
    }, me.prototype.desc = function() {
      return this.reverse();
    }, me.prototype.eachKey = function(a) {
      var o = this._ctx;
      return o.keysOnly = !o.isMatch, this.each(function(c, f) {
        a(f.key, f);
      });
    }, me.prototype.eachUniqueKey = function(a) {
      return this._ctx.unique = "unique", this.eachKey(a);
    }, me.prototype.eachPrimaryKey = function(a) {
      var o = this._ctx;
      return o.keysOnly = !o.isMatch, this.each(function(c, f) {
        a(f.primaryKey, f);
      });
    }, me.prototype.keys = function(a) {
      var o = this._ctx;
      o.keysOnly = !o.isMatch;
      var c = [];
      return this.each(function(f, h) {
        c.push(h.key);
      }).then(function() {
        return c;
      }).then(a);
    }, me.prototype.primaryKeys = function(a) {
      var o = this._ctx;
      if (o.dir === "next" && Lr(o, !0) && 0 < o.limit) return this._read(function(f) {
        var h = Si(o, o.table.core.schema);
        return o.table.core.query({ trans: f, values: !1, limit: o.limit, query: { index: h, range: o.range } });
      }).then(function(f) {
        return f.result;
      }).then(a);
      o.keysOnly = !o.isMatch;
      var c = [];
      return this.each(function(f, h) {
        c.push(h.primaryKey);
      }).then(function() {
        return c;
      }).then(a);
    }, me.prototype.uniqueKeys = function(a) {
      return this._ctx.unique = "unique", this.keys(a);
    }, me.prototype.firstKey = function(a) {
      return this.limit(1).keys(function(o) {
        return o[0];
      }).then(a);
    }, me.prototype.lastKey = function(a) {
      return this.reverse().firstKey(a);
    }, me.prototype.distinct = function() {
      var a = this._ctx, a = a.index && a.table.schema.idxByName[a.index];
      if (!a || !a.multi) return this;
      var o = {};
      return La(this._ctx, function(h) {
        var f = h.primaryKey.toString(), h = _(o, f);
        return o[f] = !0, !h;
      }), this;
    }, me.prototype.modify = function(a) {
      var o = this, c = this._ctx;
      return this._write(function(f) {
        var h, p, y;
        y = typeof a == "function" ? a : (h = u(a), p = h.length, function(O) {
          for (var P = !1, T = 0; T < p; ++T) {
            var A = h[T], N = a[A], L = ce(O, A);
            N instanceof Sn ? (le(O, A, N.execute(L)), P = !0) : L !== N && (le(O, A, N), P = !0);
          }
          return P;
        });
        var g = c.table.core, b = g.schema.primaryKey, w = b.outbound, k = b.extractKey, E = 200, b = o.db._options.modifyChunkSize;
        b && (E = typeof b == "object" ? b[g.name] || b["*"] || 200 : b);
        function D(O, A) {
          var T = A.failures, A = A.numFailures;
          S += O - A;
          for (var N = 0, L = u(T); N < L.length; N++) {
            var U = L[N];
            x.push(T[U]);
          }
        }
        var x = [], S = 0, R = [];
        return o.clone().primaryKeys().then(function(O) {
          function P(A) {
            var N = Math.min(E, O.length - A);
            return g.getMany({ trans: f, keys: O.slice(A, A + N), cache: "immutable" }).then(function(L) {
              for (var U = [], q = [], F = w ? [] : null, W = [], K = 0; K < N; ++K) {
                var Z = L[K], se = { value: qe(Z), primKey: O[A + K] };
                y.call(se, se.value, se) !== !1 && (se.value == null ? W.push(O[A + K]) : w || he(k(Z), k(se.value)) === 0 ? (q.push(se.value), w && F.push(O[A + K])) : (W.push(O[A + K]), U.push(se.value)));
              }
              return Promise.resolve(0 < U.length && g.mutate({ trans: f, type: "add", values: U }).then(function(fe) {
                for (var de in fe.failures) W.splice(parseInt(de), 1);
                D(U.length, fe);
              })).then(function() {
                return (0 < q.length || T && typeof a == "object") && g.mutate({ trans: f, type: "put", keys: F, values: q, criteria: T, changeSpec: typeof a != "function" && a, isAdditionalChunk: 0 < A }).then(function(fe) {
                  return D(q.length, fe);
                });
              }).then(function() {
                return (0 < W.length || T && a === Fa) && g.mutate({ trans: f, type: "delete", keys: W, criteria: T, isAdditionalChunk: 0 < A }).then(function(fe) {
                  return D(W.length, fe);
                });
              }).then(function() {
                return O.length > A + N && P(A + E);
              });
            });
          }
          var T = Lr(c) && c.limit === 1 / 0 && (typeof a != "function" || a === Fa) && { index: c.index, range: c.range };
          return P(0).then(function() {
            if (0 < x.length) throw new Ot("Error modifying one or more objects", x, S, R);
            return O.length;
          });
        });
      });
    }, me.prototype.delete = function() {
      var a = this._ctx, o = a.range;
      return Lr(a) && (a.isPrimKey || o.type === 3) ? this._write(function(c) {
        var f = a.table.core.schema.primaryKey, h = o;
        return a.table.core.count({ trans: c, query: { index: f, range: h } }).then(function(p) {
          return a.table.core.mutate({ trans: c, type: "deleteRange", range: h }).then(function(y) {
            var g = y.failures;
            if (y.lastResult, y.results, y = y.numFailures, y) throw new Ot("Could not delete some values", Object.keys(g).map(function(w) {
              return g[w];
            }), p - y);
            return p - y;
          });
        });
      }) : this.modify(Fa);
    }, me);
    function me() {
    }
    var Fa = function(a, o) {
      return o.value = null;
    };
    function Pf(a, o) {
      return a < o ? -1 : a === o ? 0 : 1;
    }
    function Tf(a, o) {
      return o < a ? -1 : a === o ? 0 : 1;
    }
    function He(a, o, c) {
      return a = a instanceof ru ? new a.Collection(a) : a, a._ctx.error = new (c || TypeError)(o), a;
    }
    function qr(a) {
      return new a.Collection(a, function() {
        return tu("");
      }).limit(0);
    }
    function Ci(a, o, c, f) {
      var h, p, y, g, w, k, E, b = c.length;
      if (!c.every(function(S) {
        return typeof S == "string";
      })) return He(a, Vo);
      function D(S) {
        h = S === "next" ? function(O) {
          return O.toUpperCase();
        } : function(O) {
          return O.toLowerCase();
        }, p = S === "next" ? function(O) {
          return O.toLowerCase();
        } : function(O) {
          return O.toUpperCase();
        }, y = S === "next" ? Pf : Tf;
        var R = c.map(function(O) {
          return { lower: p(O), upper: h(O) };
        }).sort(function(O, P) {
          return y(O.lower, P.lower);
        });
        g = R.map(function(O) {
          return O.upper;
        }), w = R.map(function(O) {
          return O.lower;
        }), E = (k = S) === "next" ? "" : f;
      }
      D("next"), a = new a.Collection(a, function() {
        return Vt(g[0], w[b - 1] + f);
      }), a._ondirectionchange = function(S) {
        D(S);
      };
      var x = 0;
      return a._addAlgorithm(function(S, R, O) {
        var P = S.key;
        if (typeof P != "string") return !1;
        var T = p(P);
        if (o(T, w, x)) return !0;
        for (var A = null, N = x; N < b; ++N) {
          var L = function(U, q, F, W, K, Z) {
            for (var se = Math.min(U.length, W.length), fe = -1, de = 0; de < se; ++de) {
              var Ze = q[de];
              if (Ze !== W[de]) return K(U[de], F[de]) < 0 ? U.substr(0, de) + F[de] + F.substr(de + 1) : K(U[de], W[de]) < 0 ? U.substr(0, de) + W[de] + F.substr(de + 1) : 0 <= fe ? U.substr(0, fe) + q[fe] + F.substr(fe + 1) : null;
              K(U[de], Ze) < 0 && (fe = de);
            }
            return se < W.length && Z === "next" ? U + F.substr(U.length) : se < U.length && Z === "prev" ? U.substr(0, F.length) : fe < 0 ? null : U.substr(0, fe) + W[fe] + F.substr(fe + 1);
          }(P, T, g[N], w[N], y, k);
          L === null && A === null ? x = N + 1 : (A === null || 0 < y(A, L)) && (A = L);
        }
        return R(A !== null ? function() {
          S.continue(A + E);
        } : O), !1;
      }), a;
    }
    function Vt(a, o, c, f) {
      return { type: 2, lower: a, upper: o, lowerOpen: c, upperOpen: f };
    }
    function tu(a) {
      return { type: 1, lower: a, upper: a };
    }
    var ru = (Object.defineProperty(Ie.prototype, "Collection", { get: function() {
      return this._ctx.table.db.Collection;
    }, enumerable: !1, configurable: !0 }), Ie.prototype.between = function(a, o, c, f) {
      c = c !== !1, f = f === !0;
      try {
        return 0 < this._cmp(a, o) || this._cmp(a, o) === 0 && (c || f) && (!c || !f) ? qr(this) : new this.Collection(this, function() {
          return Vt(a, o, !c, !f);
        });
      } catch {
        return He(this, St);
      }
    }, Ie.prototype.equals = function(a) {
      return a == null ? He(this, St) : new this.Collection(this, function() {
        return tu(a);
      });
    }, Ie.prototype.above = function(a) {
      return a == null ? He(this, St) : new this.Collection(this, function() {
        return Vt(a, void 0, !0);
      });
    }, Ie.prototype.aboveOrEqual = function(a) {
      return a == null ? He(this, St) : new this.Collection(this, function() {
        return Vt(a, void 0, !1);
      });
    }, Ie.prototype.below = function(a) {
      return a == null ? He(this, St) : new this.Collection(this, function() {
        return Vt(void 0, a, !1, !0);
      });
    }, Ie.prototype.belowOrEqual = function(a) {
      return a == null ? He(this, St) : new this.Collection(this, function() {
        return Vt(void 0, a);
      });
    }, Ie.prototype.startsWith = function(a) {
      return typeof a != "string" ? He(this, Vo) : this.between(a, a + dr, !0, !0);
    }, Ie.prototype.startsWithIgnoreCase = function(a) {
      return a === "" ? this.startsWith(a) : Ci(this, function(o, c) {
        return o.indexOf(c[0]) === 0;
      }, [a], dr);
    }, Ie.prototype.equalsIgnoreCase = function(a) {
      return Ci(this, function(o, c) {
        return o === c[0];
      }, [a], "");
    }, Ie.prototype.anyOfIgnoreCase = function() {
      var a = Ve.apply(ut, arguments);
      return a.length === 0 ? qr(this) : Ci(this, function(o, c) {
        return c.indexOf(o) !== -1;
      }, a, "");
    }, Ie.prototype.startsWithAnyOfIgnoreCase = function() {
      var a = Ve.apply(ut, arguments);
      return a.length === 0 ? qr(this) : Ci(this, function(o, c) {
        return c.some(function(f) {
          return o.indexOf(f) === 0;
        });
      }, a, dr);
    }, Ie.prototype.anyOf = function() {
      var a = this, o = Ve.apply(ut, arguments), c = this._cmp;
      try {
        o.sort(c);
      } catch {
        return He(this, St);
      }
      if (o.length === 0) return qr(this);
      var f = new this.Collection(this, function() {
        return Vt(o[0], o[o.length - 1]);
      });
      f._ondirectionchange = function(p) {
        c = p === "next" ? a._ascending : a._descending, o.sort(c);
      };
      var h = 0;
      return f._addAlgorithm(function(p, y, g) {
        for (var w = p.key; 0 < c(w, o[h]); ) if (++h === o.length) return y(g), !1;
        return c(w, o[h]) === 0 || (y(function() {
          p.continue(o[h]);
        }), !1);
      }), f;
    }, Ie.prototype.notEqual = function(a) {
      return this.inAnyRange([[-1 / 0, a], [a, this.db._maxKey]], { includeLowers: !1, includeUppers: !1 });
    }, Ie.prototype.noneOf = function() {
      var a = Ve.apply(ut, arguments);
      if (a.length === 0) return new this.Collection(this);
      try {
        a.sort(this._ascending);
      } catch {
        return He(this, St);
      }
      var o = a.reduce(function(c, f) {
        return c ? c.concat([[c[c.length - 1][1], f]]) : [[-1 / 0, f]];
      }, null);
      return o.push([a[a.length - 1], this.db._maxKey]), this.inAnyRange(o, { includeLowers: !1, includeUppers: !1 });
    }, Ie.prototype.inAnyRange = function(P, o) {
      var c = this, f = this._cmp, h = this._ascending, p = this._descending, y = this._min, g = this._max;
      if (P.length === 0) return qr(this);
      if (!P.every(function(T) {
        return T[0] !== void 0 && T[1] !== void 0 && h(T[0], T[1]) <= 0;
      })) return He(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", te.InvalidArgument);
      var w = !o || o.includeLowers !== !1, k = o && o.includeUppers === !0, E, b = h;
      function D(T, A) {
        return b(T[0], A[0]);
      }
      try {
        (E = P.reduce(function(T, A) {
          for (var N = 0, L = T.length; N < L; ++N) {
            var U = T[N];
            if (f(A[0], U[1]) < 0 && 0 < f(A[1], U[0])) {
              U[0] = y(U[0], A[0]), U[1] = g(U[1], A[1]);
              break;
            }
          }
          return N === L && T.push(A), T;
        }, [])).sort(D);
      } catch {
        return He(this, St);
      }
      var x = 0, S = k ? function(T) {
        return 0 < h(T, E[x][1]);
      } : function(T) {
        return 0 <= h(T, E[x][1]);
      }, R = w ? function(T) {
        return 0 < p(T, E[x][0]);
      } : function(T) {
        return 0 <= p(T, E[x][0]);
      }, O = S, P = new this.Collection(this, function() {
        return Vt(E[0][0], E[E.length - 1][1], !w, !k);
      });
      return P._ondirectionchange = function(T) {
        b = T === "next" ? (O = S, h) : (O = R, p), E.sort(D);
      }, P._addAlgorithm(function(T, A, N) {
        for (var L, U = T.key; O(U); ) if (++x === E.length) return A(N), !1;
        return !S(L = U) && !R(L) || (c._cmp(U, E[x][1]) === 0 || c._cmp(U, E[x][0]) === 0 || A(function() {
          b === h ? T.continue(E[x][0]) : T.continue(E[x][1]);
        }), !1);
      }), P;
    }, Ie.prototype.startsWithAnyOf = function() {
      var a = Ve.apply(ut, arguments);
      return a.every(function(o) {
        return typeof o == "string";
      }) ? a.length === 0 ? qr(this) : this.inAnyRange(a.map(function(o) {
        return [o, o + dr];
      })) : He(this, "startsWithAnyOf() only works with strings");
    }, Ie);
    function Ie() {
    }
    function pt(a) {
      return we(function(o) {
        return En(o), a(o.target.error), !1;
      });
    }
    function En(a) {
      a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault();
    }
    var Cn = "storagemutated", Ka = "x-storagemutated-1", Ht = kn(null, Cn), Af = (mt.prototype._lock = function() {
      return ye(!J.global), ++this._reculock, this._reculock !== 1 || J.global || (J.lockOwnerFor = this), this;
    }, mt.prototype._unlock = function() {
      if (ye(!J.global), --this._reculock == 0) for (J.global || (J.lockOwnerFor = null); 0 < this._blockedFuncs.length && !this._locked(); ) {
        var a = this._blockedFuncs.shift();
        try {
          fr(a[1], a[0]);
        } catch {
        }
      }
      return this;
    }, mt.prototype._locked = function() {
      return this._reculock && J.lockOwnerFor !== this;
    }, mt.prototype.create = function(a) {
      var o = this;
      if (!this.mode) return this;
      var c = this.db.idbdb, f = this.db._state.dbOpenError;
      if (ye(!this.idbtrans), !a && !c) switch (f && f.name) {
        case "DatabaseClosedError":
          throw new te.DatabaseClosed(f);
        case "MissingAPIError":
          throw new te.MissingAPI(f.message, f);
        default:
          throw new te.OpenFailed(f);
      }
      if (!this.active) throw new te.TransactionInactive();
      return ye(this._completion._state === null), (a = this.idbtrans = a || (this.db.core || c).transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability })).onerror = we(function(h) {
        En(h), o._reject(a.error);
      }), a.onabort = we(function(h) {
        En(h), o.active && o._reject(new te.Abort(a.error)), o.active = !1, o.on("abort").fire(h);
      }), a.oncomplete = we(function() {
        o.active = !1, o._resolve(), "mutatedParts" in a && Ht.storagemutated.fire(a.mutatedParts);
      }), this;
    }, mt.prototype._promise = function(a, o, c) {
      var f = this;
      if (a === "readwrite" && this.mode !== "readwrite") return Oe(new te.ReadOnly("Transaction is readonly"));
      if (!this.active) return Oe(new te.TransactionInactive());
      if (this._locked()) return new V(function(p, y) {
        f._blockedFuncs.push([function() {
          f._promise(a, o, c).then(p, y);
        }, J]);
      });
      if (c) return Ut(function() {
        var p = new V(function(y, g) {
          f._lock();
          var w = o(y, g, f);
          w && w.then && w.then(y, g);
        });
        return p.finally(function() {
          return f._unlock();
        }), p._lib = !0, p;
      });
      var h = new V(function(p, y) {
        var g = o(p, y, f);
        g && g.then && g.then(p, y);
      });
      return h._lib = !0, h;
    }, mt.prototype._root = function() {
      return this.parent ? this.parent._root() : this;
    }, mt.prototype.waitFor = function(a) {
      var o, c = this._root(), f = V.resolve(a);
      c._waitingFor ? c._waitingFor = c._waitingFor.then(function() {
        return f;
      }) : (c._waitingFor = f, c._waitingQueue = [], o = c.idbtrans.objectStore(c.storeNames[0]), function p() {
        for (++c._spinCount; c._waitingQueue.length; ) c._waitingQueue.shift()();
        c._waitingFor && (o.get(-1 / 0).onsuccess = p);
      }());
      var h = c._waitingFor;
      return new V(function(p, y) {
        f.then(function(g) {
          return c._waitingQueue.push(we(p.bind(null, g)));
        }, function(g) {
          return c._waitingQueue.push(we(y.bind(null, g)));
        }).finally(function() {
          c._waitingFor === h && (c._waitingFor = null);
        });
      });
    }, mt.prototype.abort = function() {
      this.active && (this.active = !1, this.idbtrans && this.idbtrans.abort(), this._reject(new te.Abort()));
    }, mt.prototype.table = function(a) {
      var o = this._memoizedTables || (this._memoizedTables = {});
      if (_(o, a)) return o[a];
      var c = this.schema[a];
      if (!c) throw new te.NotFound("Table " + a + " not part of transaction");
      return c = new this.db.Table(a, c, this), c.core = this.db.core.table(a), o[a] = c;
    }, mt);
    function mt() {
    }
    function Ua(a, o, c, f, h, p, y) {
      return { name: a, keyPath: o, unique: c, multi: f, auto: h, compound: p, src: (c && !y ? "&" : "") + (f ? "*" : "") + (h ? "++" : "") + nu(o) };
    }
    function nu(a) {
      return typeof a == "string" ? a : a ? "[" + [].join.call(a, "+") + "]" : "";
    }
    function Wa(a, o, c) {
      return { name: a, primKey: o, indexes: c, mappedClass: null, idxByName: (f = function(h) {
        return [h.name, h];
      }, c.reduce(function(h, p, y) {
        return y = f(p, y), y && (h[y[0]] = y[1]), h;
      }, {})) };
      var f;
    }
    var Rn = function(a) {
      try {
        return a.only([[]]), Rn = function() {
          return [[]];
        }, [[]];
      } catch {
        return Rn = function() {
          return dr;
        }, dr;
      }
    };
    function za(a) {
      return a == null ? function() {
      } : typeof a == "string" ? (o = a).split(".").length === 1 ? function(c) {
        return c[o];
      } : function(c) {
        return ce(c, o);
      } : function(c) {
        return ce(c, a);
      };
      var o;
    }
    function iu(a) {
      return [].slice.call(a);
    }
    var Mf = 0;
    function Dn(a) {
      return a == null ? ":id" : typeof a == "string" ? a : "[".concat(a.join("+"), "]");
    }
    function Nf(a, o, w) {
      function f(O) {
        if (O.type === 3) return null;
        if (O.type === 4) throw new Error("Cannot convert never type to IDBKeyRange");
        var x = O.lower, S = O.upper, R = O.lowerOpen, O = O.upperOpen;
        return x === void 0 ? S === void 0 ? null : o.upperBound(S, !!O) : S === void 0 ? o.lowerBound(x, !!R) : o.bound(x, S, !!R, !!O);
      }
      function h(D) {
        var x, S = D.name;
        return { name: S, schema: D, mutate: function(R) {
          var O = R.trans, P = R.type, T = R.keys, A = R.values, N = R.range;
          return new Promise(function(L, U) {
            L = we(L);
            var q = O.objectStore(S), F = q.keyPath == null, W = P === "put" || P === "add";
            if (!W && P !== "delete" && P !== "deleteRange") throw new Error("Invalid operation type: " + P);
            var K, Z = (T || A || { length: 1 }).length;
            if (T && A && T.length !== A.length) throw new Error("Given keys array must have same length as given values array.");
            if (Z === 0) return L({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
            function se(Fe) {
              ++Ze, En(Fe);
            }
            var fe = [], de = [], Ze = 0;
            if (P === "deleteRange") {
              if (N.type === 4) return L({ numFailures: Ze, failures: de, results: [], lastResult: void 0 });
              N.type === 3 ? fe.push(K = q.clear()) : fe.push(K = q.delete(f(N)));
            } else {
              var F = W ? F ? [A, T] : [A, null] : [T, null], ie = F[0], Be = F[1];
              if (W) for (var $e = 0; $e < Z; ++$e) fe.push(K = Be && Be[$e] !== void 0 ? q[P](ie[$e], Be[$e]) : q[P](ie[$e])), K.onerror = se;
              else for ($e = 0; $e < Z; ++$e) fe.push(K = q[P](ie[$e])), K.onerror = se;
            }
            function qi(Fe) {
              Fe = Fe.target.result, fe.forEach(function(vr, cs) {
                return vr.error != null && (de[cs] = vr.error);
              }), L({ numFailures: Ze, failures: de, results: P === "delete" ? T : fe.map(function(vr) {
                return vr.result;
              }), lastResult: Fe });
            }
            K.onerror = function(Fe) {
              se(Fe), qi(Fe);
            }, K.onsuccess = qi;
          });
        }, getMany: function(R) {
          var O = R.trans, P = R.keys;
          return new Promise(function(T, A) {
            T = we(T);
            for (var N, L = O.objectStore(S), U = P.length, q = new Array(U), F = 0, W = 0, K = function(fe) {
              fe = fe.target, q[fe._pos] = fe.result, ++W === F && T(q);
            }, Z = pt(A), se = 0; se < U; ++se) P[se] != null && ((N = L.get(P[se]))._pos = se, N.onsuccess = K, N.onerror = Z, ++F);
            F === 0 && T(q);
          });
        }, get: function(R) {
          var O = R.trans, P = R.key;
          return new Promise(function(T, A) {
            T = we(T);
            var N = O.objectStore(S).get(P);
            N.onsuccess = function(L) {
              return T(L.target.result);
            }, N.onerror = pt(A);
          });
        }, query: (x = k, function(R) {
          return new Promise(function(O, P) {
            O = we(O);
            var T, A, N, F = R.trans, L = R.values, U = R.limit, K = R.query, q = U === 1 / 0 ? void 0 : U, W = K.index, K = K.range, F = F.objectStore(S), W = W.isPrimaryKey ? F : F.index(W.name), K = f(K);
            if (U === 0) return O({ result: [] });
            x ? ((q = L ? W.getAll(K, q) : W.getAllKeys(K, q)).onsuccess = function(Z) {
              return O({ result: Z.target.result });
            }, q.onerror = pt(P)) : (T = 0, A = !L && "openKeyCursor" in W ? W.openKeyCursor(K) : W.openCursor(K), N = [], A.onsuccess = function(Z) {
              var se = A.result;
              return se ? (N.push(L ? se.value : se.primaryKey), ++T === U ? O({ result: N }) : void se.continue()) : O({ result: N });
            }, A.onerror = pt(P));
          });
        }), openCursor: function(R) {
          var O = R.trans, P = R.values, T = R.query, A = R.reverse, N = R.unique;
          return new Promise(function(L, U) {
            L = we(L);
            var W = T.index, q = T.range, F = O.objectStore(S), F = W.isPrimaryKey ? F : F.index(W.name), W = A ? N ? "prevunique" : "prev" : N ? "nextunique" : "next", K = !P && "openKeyCursor" in F ? F.openKeyCursor(f(q), W) : F.openCursor(f(q), W);
            K.onerror = pt(U), K.onsuccess = we(function(Z) {
              var se, fe, de, Ze, ie = K.result;
              ie ? (ie.___id = ++Mf, ie.done = !1, se = ie.continue.bind(ie), fe = (fe = ie.continuePrimaryKey) && fe.bind(ie), de = ie.advance.bind(ie), Ze = function() {
                throw new Error("Cursor not stopped");
              }, ie.trans = O, ie.stop = ie.continue = ie.continuePrimaryKey = ie.advance = function() {
                throw new Error("Cursor not started");
              }, ie.fail = we(U), ie.next = function() {
                var Be = this, $e = 1;
                return this.start(function() {
                  return $e-- ? Be.continue() : Be.stop();
                }).then(function() {
                  return Be;
                });
              }, ie.start = function(Be) {
                function $e() {
                  if (K.result) try {
                    Be();
                  } catch (Fe) {
                    ie.fail(Fe);
                  }
                  else ie.done = !0, ie.start = function() {
                    throw new Error("Cursor behind last entry");
                  }, ie.stop();
                }
                var qi = new Promise(function(Fe, vr) {
                  Fe = we(Fe), K.onerror = pt(vr), ie.fail = vr, ie.stop = function(cs) {
                    ie.stop = ie.continue = ie.continuePrimaryKey = ie.advance = Ze, Fe(cs);
                  };
                });
                return K.onsuccess = we(function(Fe) {
                  K.onsuccess = $e, $e();
                }), ie.continue = se, ie.continuePrimaryKey = fe, ie.advance = de, $e(), qi;
              }, L(ie)) : L(null);
            }, U);
          });
        }, count: function(R) {
          var O = R.query, P = R.trans, T = O.index, A = O.range;
          return new Promise(function(N, L) {
            var U = P.objectStore(S), q = T.isPrimaryKey ? U : U.index(T.name), U = f(A), q = U ? q.count(U) : q.count();
            q.onsuccess = we(function(F) {
              return N(F.target.result);
            }), q.onerror = pt(L);
          });
        } };
      }
      var p, y, g, E = (y = w, g = iu((p = a).objectStoreNames), { schema: { name: p.name, tables: g.map(function(D) {
        return y.objectStore(D);
      }).map(function(D) {
        var x = D.keyPath, O = D.autoIncrement, S = l(x), R = {}, O = { name: D.name, primaryKey: { name: null, isPrimaryKey: !0, outbound: x == null, compound: S, keyPath: x, autoIncrement: O, unique: !0, extractKey: za(x) }, indexes: iu(D.indexNames).map(function(P) {
          return D.index(P);
        }).map(function(N) {
          var T = N.name, A = N.unique, L = N.multiEntry, N = N.keyPath, L = { name: T, compound: l(N), keyPath: N, unique: A, multiEntry: L, extractKey: za(N) };
          return R[Dn(N)] = L;
        }), getIndexByKeyPath: function(P) {
          return R[Dn(P)];
        } };
        return R[":id"] = O.primaryKey, x != null && (R[Dn(x)] = O.primaryKey), O;
      }) }, hasGetAll: 0 < g.length && "getAll" in y.objectStore(g[0]) && !(typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) }), w = E.schema, k = E.hasGetAll, E = w.tables.map(h), b = {};
      return E.forEach(function(D) {
        return b[D.name] = D;
      }), { stack: "dbcore", transaction: a.transaction.bind(a), table: function(D) {
        if (!b[D]) throw new Error("Table '".concat(D, "' not found"));
        return b[D];
      }, MIN_KEY: -1 / 0, MAX_KEY: Rn(o), schema: w };
    }
    function Bf(a, o, c, f) {
      var h = c.IDBKeyRange;
      return c.indexedDB, { dbcore: (f = Nf(o, h, f), a.dbcore.reduce(function(p, y) {
        return y = y.create, n(n({}, p), y(p));
      }, f)) };
    }
    function Ri(a, f) {
      var c = f.db, f = Bf(a._middlewares, c, a._deps, f);
      a.core = f.dbcore, a.tables.forEach(function(h) {
        var p = h.name;
        a.core.schema.tables.some(function(y) {
          return y.name === p;
        }) && (h.core = a.core.table(p), a[p] instanceof a.Table && (a[p].core = h.core));
      });
    }
    function Di(a, o, c, f) {
      c.forEach(function(h) {
        var p = f[h];
        o.forEach(function(y) {
          var g = function w(k, E) {
            return Q(k, E) || (k = m(k)) && w(k, E);
          }(y, h);
          (!g || "value" in g && g.value === void 0) && (y === a.Transaction.prototype || y instanceof a.Transaction ? M(y, h, { get: function() {
            return this.table(h);
          }, set: function(w) {
            I(this, h, { value: w, writable: !0, configurable: !0, enumerable: !0 });
          } }) : y[h] = new a.Table(h, p));
        });
      });
    }
    function Va(a, o) {
      o.forEach(function(c) {
        for (var f in c) c[f] instanceof a.Table && delete c[f];
      });
    }
    function $f(a, o) {
      return a._cfg.version - o._cfg.version;
    }
    function jf(a, o, c, f) {
      var h = a._dbSchema;
      c.objectStoreNames.contains("$meta") && !h.$meta && (h.$meta = Wa("$meta", su("")[0], []), a._storeNames.push("$meta"));
      var p = a._createTransaction("readwrite", a._storeNames, h);
      p.create(c), p._completion.catch(f);
      var y = p._reject.bind(p), g = J.transless || J;
      Ut(function() {
        return J.trans = p, J.transless = g, o !== 0 ? (Ri(a, c), k = o, ((w = p).storeNames.includes("$meta") ? w.table("$meta").get("version").then(function(E) {
          return E ?? k;
        }) : V.resolve(k)).then(function(E) {
          return D = E, x = p, S = c, R = [], E = (b = a)._versions, O = b._dbSchema = Pi(0, b.idbdb, S), (E = E.filter(function(P) {
            return P._cfg.version >= D;
          })).length !== 0 ? (E.forEach(function(P) {
            R.push(function() {
              var T = O, A = P._cfg.dbschema;
              Ti(b, T, S), Ti(b, A, S), O = b._dbSchema = A;
              var N = Ha(T, A);
              N.add.forEach(function(W) {
                Za(S, W[0], W[1].primKey, W[1].indexes);
              }), N.change.forEach(function(W) {
                if (W.recreate) throw new te.Upgrade("Not yet support for changing primary key");
                var K = S.objectStore(W.name);
                W.add.forEach(function(Z) {
                  return Ii(K, Z);
                }), W.change.forEach(function(Z) {
                  K.deleteIndex(Z.name), Ii(K, Z);
                }), W.del.forEach(function(Z) {
                  return K.deleteIndex(Z);
                });
              });
              var L = P._cfg.contentUpgrade;
              if (L && P._cfg.version > D) {
                Ri(b, S), x._memoizedTables = {};
                var U = be(A);
                N.del.forEach(function(W) {
                  U[W] = T[W];
                }), Va(b, [b.Transaction.prototype]), Di(b, [b.Transaction.prototype], u(U), U), x.schema = U;
                var q, F = qt(L);
                return F && $r(), N = V.follow(function() {
                  var W;
                  (q = L(x)) && F && (W = Wt.bind(null, null), q.then(W, W));
                }), q && typeof q.then == "function" ? V.resolve(q) : N.then(function() {
                  return q;
                });
              }
            }), R.push(function(T) {
              var A, N, L = P._cfg.dbschema;
              A = L, N = T, [].slice.call(N.db.objectStoreNames).forEach(function(U) {
                return A[U] == null && N.db.deleteObjectStore(U);
              }), Va(b, [b.Transaction.prototype]), Di(b, [b.Transaction.prototype], b._storeNames, b._dbSchema), x.schema = b._dbSchema;
            }), R.push(function(T) {
              b.idbdb.objectStoreNames.contains("$meta") && (Math.ceil(b.idbdb.version / 10) === P._cfg.version ? (b.idbdb.deleteObjectStore("$meta"), delete b._dbSchema.$meta, b._storeNames = b._storeNames.filter(function(A) {
                return A !== "$meta";
              })) : T.objectStore("$meta").put(P._cfg.version, "version"));
            });
          }), function P() {
            return R.length ? V.resolve(R.shift()(x.idbtrans)).then(P) : V.resolve();
          }().then(function() {
            au(O, S);
          })) : V.resolve();
          var b, D, x, S, R, O;
        }).catch(y)) : (u(h).forEach(function(E) {
          Za(c, E, h[E].primKey, h[E].indexes);
        }), Ri(a, c), void V.follow(function() {
          return a.on.populate.fire(p);
        }).catch(y));
        var w, k;
      });
    }
    function Lf(a, o) {
      au(a._dbSchema, o), o.db.version % 10 != 0 || o.objectStoreNames.contains("$meta") || o.db.createObjectStore("$meta").add(Math.ceil(o.db.version / 10 - 1), "version");
      var c = Pi(0, a.idbdb, o);
      Ti(a, a._dbSchema, o);
      for (var f = 0, h = Ha(c, a._dbSchema).change; f < h.length; f++) {
        var p = function(y) {
          if (y.change.length || y.recreate) return console.warn("Unable to patch indexes of table ".concat(y.name, " because it has changes on the type of index or primary key.")), { value: void 0 };
          var g = o.objectStore(y.name);
          y.add.forEach(function(w) {
            ht && console.debug("Dexie upgrade patch: Creating missing index ".concat(y.name, ".").concat(w.src)), Ii(g, w);
          });
        }(h[f]);
        if (typeof p == "object") return p.value;
      }
    }
    function Ha(a, o) {
      var c, f = { del: [], add: [], change: [] };
      for (c in a) o[c] || f.del.push(c);
      for (c in o) {
        var h = a[c], p = o[c];
        if (h) {
          var y = { name: c, def: p, recreate: !1, del: [], add: [], change: [] };
          if ("" + (h.primKey.keyPath || "") != "" + (p.primKey.keyPath || "") || h.primKey.auto !== p.primKey.auto) y.recreate = !0, f.change.push(y);
          else {
            var g = h.idxByName, w = p.idxByName, k = void 0;
            for (k in g) w[k] || y.del.push(k);
            for (k in w) {
              var E = g[k], b = w[k];
              E ? E.src !== b.src && y.change.push(b) : y.add.push(b);
            }
            (0 < y.del.length || 0 < y.add.length || 0 < y.change.length) && f.change.push(y);
          }
        } else f.add.push([c, p]);
      }
      return f;
    }
    function Za(a, o, c, f) {
      var h = a.db.createObjectStore(o, c.keyPath ? { keyPath: c.keyPath, autoIncrement: c.auto } : { autoIncrement: c.auto });
      return f.forEach(function(p) {
        return Ii(h, p);
      }), h;
    }
    function au(a, o) {
      u(a).forEach(function(c) {
        o.db.objectStoreNames.contains(c) || (ht && console.debug("Dexie: Creating missing table", c), Za(o, c, a[c].primKey, a[c].indexes));
      });
    }
    function Ii(a, o) {
      a.createIndex(o.name, o.keyPath, { unique: o.unique, multiEntry: o.multi });
    }
    function Pi(a, o, c) {
      var f = {};
      return X(o.objectStoreNames, 0).forEach(function(h) {
        for (var p = c.objectStore(h), y = Ua(nu(k = p.keyPath), k || "", !0, !1, !!p.autoIncrement, k && typeof k != "string", !0), g = [], w = 0; w < p.indexNames.length; ++w) {
          var E = p.index(p.indexNames[w]), k = E.keyPath, E = Ua(E.name, k, !!E.unique, !!E.multiEntry, !1, k && typeof k != "string", !1);
          g.push(E);
        }
        f[h] = Wa(h, y, g);
      }), f;
    }
    function Ti(a, o, c) {
      for (var f = c.db.objectStoreNames, h = 0; h < f.length; ++h) {
        var p = f[h], y = c.objectStore(p);
        a._hasGetAll = "getAll" in y;
        for (var g = 0; g < y.indexNames.length; ++g) {
          var w = y.indexNames[g], k = y.index(w).keyPath, E = typeof k == "string" ? k : "[" + X(k).join("+") + "]";
          !o[p] || (k = o[p].idxByName[E]) && (k.name = w, delete o[p].idxByName[E], o[p].idxByName[w] = k);
        }
      }
      typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && s.WorkerGlobalScope && s instanceof s.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (a._hasGetAll = !1);
    }
    function su(a) {
      return a.split(",").map(function(o, c) {
        var f = (o = o.trim()).replace(/([&*]|\+\+)/g, ""), h = /^\[/.test(f) ? f.match(/^\[(.*)\]$/)[1].split("+") : f;
        return Ua(f, h || null, /\&/.test(o), /\*/.test(o), /\+\+/.test(o), l(h), c === 0);
      });
    }
    var qf = (Ai.prototype._parseStoresSpec = function(a, o) {
      u(a).forEach(function(c) {
        if (a[c] !== null) {
          var f = su(a[c]), h = f.shift();
          if (h.unique = !0, h.multi) throw new te.Schema("Primary key cannot be multi-valued");
          f.forEach(function(p) {
            if (p.auto) throw new te.Schema("Only primary key can be marked as autoIncrement (++)");
            if (!p.keyPath) throw new te.Schema("Index must have a name and cannot be an empty string");
          }), o[c] = Wa(c, h, f);
        }
      });
    }, Ai.prototype.stores = function(c) {
      var o = this.db;
      this._cfg.storesSource = this._cfg.storesSource ? d(this._cfg.storesSource, c) : c;
      var c = o._versions, f = {}, h = {};
      return c.forEach(function(p) {
        d(f, p._cfg.storesSource), h = p._cfg.dbschema = {}, p._parseStoresSpec(f, h);
      }), o._dbSchema = h, Va(o, [o._allTables, o, o.Transaction.prototype]), Di(o, [o._allTables, o, o.Transaction.prototype, this._cfg.tables], u(h), h), o._storeNames = u(h), this;
    }, Ai.prototype.upgrade = function(a) {
      return this._cfg.contentUpgrade = Ra(this._cfg.contentUpgrade || ve, a), this;
    }, Ai);
    function Ai() {
    }
    function Qa(a, o) {
      var c = a._dbNamesDB;
      return c || (c = a._dbNamesDB = new Ct(ki, { addons: [], indexedDB: a, IDBKeyRange: o })).version(1).stores({ dbnames: "name" }), c.table("dbnames");
    }
    function Ga(a) {
      return a && typeof a.databases == "function";
    }
    function Ya(a) {
      return Ut(function() {
        return J.letThrough = !0, a();
      });
    }
    function Ja(a) {
      return !("from" in a);
    }
    var Ne = function(a, o) {
      if (!this) {
        var c = new Ne();
        return a && "d" in a && d(c, a), c;
      }
      d(this, arguments.length ? { d: 1, from: a, to: 1 < arguments.length ? o : a } : { d: 0 });
    };
    function In(a, o, c) {
      var f = he(o, c);
      if (!isNaN(f)) {
        if (0 < f) throw RangeError();
        if (Ja(a)) return d(a, { from: o, to: c, d: 1 });
        var h = a.l, f = a.r;
        if (he(c, a.from) < 0) return h ? In(h, o, c) : a.l = { from: o, to: c, d: 1, l: null, r: null }, uu(a);
        if (0 < he(o, a.to)) return f ? In(f, o, c) : a.r = { from: o, to: c, d: 1, l: null, r: null }, uu(a);
        he(o, a.from) < 0 && (a.from = o, a.l = null, a.d = f ? f.d + 1 : 1), 0 < he(c, a.to) && (a.to = c, a.r = null, a.d = a.l ? a.l.d + 1 : 1), c = !a.r, h && !a.l && Pn(a, h), f && c && Pn(a, f);
      }
    }
    function Pn(a, o) {
      Ja(o) || function c(f, w) {
        var p = w.from, y = w.to, g = w.l, w = w.r;
        In(f, p, y), g && c(f, g), w && c(f, w);
      }(a, o);
    }
    function ou(a, o) {
      var c = Mi(o), f = c.next();
      if (f.done) return !1;
      for (var h = f.value, p = Mi(a), y = p.next(h.from), g = y.value; !f.done && !y.done; ) {
        if (he(g.from, h.to) <= 0 && 0 <= he(g.to, h.from)) return !0;
        he(h.from, g.from) < 0 ? h = (f = c.next(g.from)).value : g = (y = p.next(h.from)).value;
      }
      return !1;
    }
    function Mi(a) {
      var o = Ja(a) ? null : { s: 0, n: a };
      return { next: function(c) {
        for (var f = 0 < arguments.length; o; ) switch (o.s) {
          case 0:
            if (o.s = 1, f) for (; o.n.l && he(c, o.n.from) < 0; ) o = { up: o, n: o.n.l, s: 1 };
            else for (; o.n.l; ) o = { up: o, n: o.n.l, s: 1 };
          case 1:
            if (o.s = 2, !f || he(c, o.n.to) <= 0) return { value: o.n, done: !1 };
          case 2:
            if (o.n.r) {
              o.s = 3, o = { up: o, n: o.n.r, s: 0 };
              continue;
            }
          case 3:
            o = o.up;
        }
        return { done: !0 };
      } };
    }
    function uu(a) {
      var o, c, f = (((o = a.r) === null || o === void 0 ? void 0 : o.d) || 0) - (((c = a.l) === null || c === void 0 ? void 0 : c.d) || 0), h = 1 < f ? "r" : f < -1 ? "l" : "";
      h && (o = h == "r" ? "l" : "r", c = n({}, a), f = a[h], a.from = f.from, a.to = f.to, a[h] = f[h], c[h] = f[o], (a[o] = c).d = cu(c)), a.d = cu(a);
    }
    function cu(c) {
      var o = c.r, c = c.l;
      return (o ? c ? Math.max(o.d, c.d) : o.d : c ? c.d : 0) + 1;
    }
    function Ni(a, o) {
      return u(o).forEach(function(c) {
        a[c] ? Pn(a[c], o[c]) : a[c] = function f(h) {
          var p, y, g = {};
          for (p in h) _(h, p) && (y = h[p], g[p] = !y || typeof y != "object" || Mr.has(y.constructor) ? y : f(y));
          return g;
        }(o[c]);
      }), a;
    }
    function Xa(a, o) {
      return a.all || o.all || Object.keys(a).some(function(c) {
        return o[c] && ou(o[c], a[c]);
      });
    }
    C(Ne.prototype, ((Xe = { add: function(a) {
      return Pn(this, a), this;
    }, addKey: function(a) {
      return In(this, a, a), this;
    }, addKeys: function(a) {
      var o = this;
      return a.forEach(function(c) {
        return In(o, c, c);
      }), this;
    }, hasKey: function(a) {
      var o = Mi(this).next(a).value;
      return o && he(o.from, a) <= 0 && 0 <= he(o.to, a);
    } })[yn] = function() {
      return Mi(this);
    }, Xe));
    var pr = {}, es = {}, ts = !1;
    function Bi(a) {
      Ni(es, a), ts || (ts = !0, setTimeout(function() {
        ts = !1, rs(es, !(es = {}));
      }, 0));
    }
    function rs(a, o) {
      o === void 0 && (o = !1);
      var c = /* @__PURE__ */ new Set();
      if (a.all) for (var f = 0, h = Object.values(pr); f < h.length; f++) lu(y = h[f], a, c, o);
      else for (var p in a) {
        var y, g = /^idb\:\/\/(.*)\/(.*)\//.exec(p);
        g && (p = g[1], g = g[2], (y = pr["idb://".concat(p, "/").concat(g)]) && lu(y, a, c, o));
      }
      c.forEach(function(w) {
        return w();
      });
    }
    function lu(a, o, c, f) {
      for (var h = [], p = 0, y = Object.entries(a.queries.query); p < y.length; p++) {
        for (var g = y[p], w = g[0], k = [], E = 0, b = g[1]; E < b.length; E++) {
          var D = b[E];
          Xa(o, D.obsSet) ? D.subscribers.forEach(function(O) {
            return c.add(O);
          }) : f && k.push(D);
        }
        f && h.push([w, k]);
      }
      if (f) for (var x = 0, S = h; x < S.length; x++) {
        var R = S[x], w = R[0], k = R[1];
        a.queries.query[w] = k;
      }
    }
    function Ff(a) {
      var o = a._state, c = a._deps.indexedDB;
      if (o.isBeingOpened || a.idbdb) return o.dbReadyPromise.then(function() {
        return o.dbOpenError ? Oe(o.dbOpenError) : a;
      });
      o.isBeingOpened = !0, o.dbOpenError = null, o.openComplete = !1;
      var f = o.openCanceller, h = Math.round(10 * a.verno), p = !1;
      function y() {
        if (o.openCanceller !== f) throw new te.DatabaseClosed("db.open() was cancelled");
      }
      function g() {
        return new V(function(D, x) {
          if (y(), !c) throw new te.MissingAPI();
          var S = a.name, R = o.autoSchema || !h ? c.open(S) : c.open(S, h);
          if (!R) throw new te.MissingAPI();
          R.onerror = pt(x), R.onblocked = we(a._fireOnBlocked), R.onupgradeneeded = we(function(O) {
            var P;
            E = R.transaction, o.autoSchema && !a._options.allowEmptyDB ? (R.onerror = En, E.abort(), R.result.close(), (P = c.deleteDatabase(S)).onsuccess = P.onerror = we(function() {
              x(new te.NoSuchDatabase("Database ".concat(S, " doesnt exist")));
            })) : (E.onerror = pt(x), O = O.oldVersion > Math.pow(2, 62) ? 0 : O.oldVersion, b = O < 1, a.idbdb = R.result, p && Lf(a, E), jf(a, O / 10, E, x));
          }, x), R.onsuccess = we(function() {
            E = null;
            var O, P, T, A, N, L = a.idbdb = R.result, U = X(L.objectStoreNames);
            if (0 < U.length) try {
              var q = L.transaction((A = U).length === 1 ? A[0] : A, "readonly");
              if (o.autoSchema) P = L, T = q, (O = a).verno = P.version / 10, T = O._dbSchema = Pi(0, P, T), O._storeNames = X(P.objectStoreNames, 0), Di(O, [O._allTables], u(T), T);
              else if (Ti(a, a._dbSchema, q), ((N = Ha(Pi(0, (N = a).idbdb, q), N._dbSchema)).add.length || N.change.some(function(F) {
                return F.add.length || F.change.length;
              })) && !p) return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."), L.close(), h = L.version + 1, p = !0, D(g());
              Ri(a, q);
            } catch {
            }
            jr.push(a), L.onversionchange = we(function(F) {
              o.vcFired = !0, a.on("versionchange").fire(F);
            }), L.onclose = we(function(F) {
              a.on("close").fire(F);
            }), b && (N = a._deps, q = S, L = N.indexedDB, N = N.IDBKeyRange, Ga(L) || q === ki || Qa(L, N).put({ name: q }).catch(ve)), D();
          }, x);
        }).catch(function(D) {
          switch (D == null ? void 0 : D.name) {
            case "UnknownError":
              if (0 < o.PR1398_maxLoop) return o.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), g();
              break;
            case "VersionError":
              if (0 < h) return h = 0, g();
          }
          return V.reject(D);
        });
      }
      var w, k = o.dbReadyResolve, E = null, b = !1;
      return V.race([f, (typeof navigator > "u" ? V.resolve() : !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise(function(D) {
        function x() {
          return indexedDB.databases().finally(D);
        }
        w = setInterval(x, 100), x();
      }).finally(function() {
        return clearInterval(w);
      }) : Promise.resolve()).then(g)]).then(function() {
        return y(), o.onReadyBeingFired = [], V.resolve(Ya(function() {
          return a.on.ready.fire(a.vip);
        })).then(function D() {
          if (0 < o.onReadyBeingFired.length) {
            var x = o.onReadyBeingFired.reduce(Ra, ve);
            return o.onReadyBeingFired = [], V.resolve(Ya(function() {
              return x(a.vip);
            })).then(D);
          }
        });
      }).finally(function() {
        o.openCanceller === f && (o.onReadyBeingFired = null, o.isBeingOpened = !1);
      }).catch(function(D) {
        o.dbOpenError = D;
        try {
          E && E.abort();
        } catch {
        }
        return f === o.openCanceller && a._close(), Oe(D);
      }).finally(function() {
        o.openComplete = !0, k();
      }).then(function() {
        var D;
        return b && (D = {}, a.tables.forEach(function(x) {
          x.schema.indexes.forEach(function(S) {
            S.name && (D["idb://".concat(a.name, "/").concat(x.name, "/").concat(S.name)] = new Ne(-1 / 0, [[[]]]));
          }), D["idb://".concat(a.name, "/").concat(x.name, "/")] = D["idb://".concat(a.name, "/").concat(x.name, "/:dels")] = new Ne(-1 / 0, [[[]]]);
        }), Ht(Cn).fire(D), rs(D, !0)), a;
      });
    }
    function ns(a) {
      function o(p) {
        return a.next(p);
      }
      var c = h(o), f = h(function(p) {
        return a.throw(p);
      });
      function h(p) {
        return function(w) {
          var g = p(w), w = g.value;
          return g.done ? w : w && typeof w.then == "function" ? w.then(c, f) : l(w) ? Promise.all(w).then(c, f) : c(w);
        };
      }
      return h(o)();
    }
    function $i(a, o, c) {
      for (var f = l(a) ? a.slice() : [a], h = 0; h < c; ++h) f.push(o);
      return f;
    }
    var Kf = { stack: "dbcore", name: "VirtualIndexMiddleware", level: 1, create: function(a) {
      return n(n({}, a), { table: function(o) {
        var c = a.table(o), f = c.schema, h = {}, p = [];
        function y(b, D, x) {
          var S = Dn(b), R = h[S] = h[S] || [], O = b == null ? 0 : typeof b == "string" ? 1 : b.length, P = 0 < D, P = n(n({}, x), { name: P ? "".concat(S, "(virtual-from:").concat(x.name, ")") : x.name, lowLevelIndex: x, isVirtual: P, keyTail: D, keyLength: O, extractKey: za(b), unique: !P && x.unique });
          return R.push(P), P.isPrimaryKey || p.push(P), 1 < O && y(O === 2 ? b[0] : b.slice(0, O - 1), D + 1, x), R.sort(function(T, A) {
            return T.keyTail - A.keyTail;
          }), P;
        }
        o = y(f.primaryKey.keyPath, 0, f.primaryKey), h[":id"] = [o];
        for (var g = 0, w = f.indexes; g < w.length; g++) {
          var k = w[g];
          y(k.keyPath, 0, k);
        }
        function E(b) {
          var D, x = b.query.index;
          return x.isVirtual ? n(n({}, b), { query: { index: x.lowLevelIndex, range: (D = b.query.range, x = x.keyTail, { type: D.type === 1 ? 2 : D.type, lower: $i(D.lower, D.lowerOpen ? a.MAX_KEY : a.MIN_KEY, x), lowerOpen: !0, upper: $i(D.upper, D.upperOpen ? a.MIN_KEY : a.MAX_KEY, x), upperOpen: !0 }) } }) : b;
        }
        return n(n({}, c), { schema: n(n({}, f), { primaryKey: o, indexes: p, getIndexByKeyPath: function(b) {
          return (b = h[Dn(b)]) && b[0];
        } }), count: function(b) {
          return c.count(E(b));
        }, query: function(b) {
          return c.query(E(b));
        }, openCursor: function(b) {
          var D = b.query.index, x = D.keyTail, S = D.isVirtual, R = D.keyLength;
          return S ? c.openCursor(E(b)).then(function(P) {
            return P && O(P);
          }) : c.openCursor(b);
          function O(P) {
            return Object.create(P, { continue: { value: function(T) {
              T != null ? P.continue($i(T, b.reverse ? a.MAX_KEY : a.MIN_KEY, x)) : b.unique ? P.continue(P.key.slice(0, R).concat(b.reverse ? a.MIN_KEY : a.MAX_KEY, x)) : P.continue();
            } }, continuePrimaryKey: { value: function(T, A) {
              P.continuePrimaryKey($i(T, a.MAX_KEY, x), A);
            } }, primaryKey: { get: function() {
              return P.primaryKey;
            } }, key: { get: function() {
              var T = P.key;
              return R === 1 ? T[0] : T.slice(0, R);
            } }, value: { get: function() {
              return P.value;
            } } });
          }
        } });
      } });
    } };
    function is(a, o, c, f) {
      return c = c || {}, f = f || "", u(a).forEach(function(h) {
        var p, y, g;
        _(o, h) ? (p = a[h], y = o[h], typeof p == "object" && typeof y == "object" && p && y ? (g = vn(p)) !== vn(y) ? c[f + h] = o[h] : g === "Object" ? is(p, y, c, f + h + ".") : p !== y && (c[f + h] = o[h]) : p !== y && (c[f + h] = o[h])) : c[f + h] = void 0;
      }), u(o).forEach(function(h) {
        _(a, h) || (c[f + h] = o[h]);
      }), c;
    }
    function as(a, o) {
      return o.type === "delete" ? o.keys : o.keys || o.values.map(a.extractKey);
    }
    var Uf = { stack: "dbcore", name: "HooksMiddleware", level: 2, create: function(a) {
      return n(n({}, a), { table: function(o) {
        var c = a.table(o), f = c.schema.primaryKey;
        return n(n({}, c), { mutate: function(h) {
          var p = J.trans, y = p.table(o).hook, g = y.deleting, w = y.creating, k = y.updating;
          switch (h.type) {
            case "add":
              if (w.fire === ve) break;
              return p._promise("readwrite", function() {
                return E(h);
              }, !0);
            case "put":
              if (w.fire === ve && k.fire === ve) break;
              return p._promise("readwrite", function() {
                return E(h);
              }, !0);
            case "delete":
              if (g.fire === ve) break;
              return p._promise("readwrite", function() {
                return E(h);
              }, !0);
            case "deleteRange":
              if (g.fire === ve) break;
              return p._promise("readwrite", function() {
                return function b(D, x, S) {
                  return c.query({ trans: D, values: !1, query: { index: f, range: x }, limit: S }).then(function(R) {
                    var O = R.result;
                    return E({ type: "delete", keys: O, trans: D }).then(function(P) {
                      return 0 < P.numFailures ? Promise.reject(P.failures[0]) : O.length < S ? { failures: [], numFailures: 0, lastResult: void 0 } : b(D, n(n({}, x), { lower: O[O.length - 1], lowerOpen: !0 }), S);
                    });
                  });
                }(h.trans, h.range, 1e4);
              }, !0);
          }
          return c.mutate(h);
          function E(b) {
            var D, x, S, R = J.trans, O = b.keys || as(f, b);
            if (!O) throw new Error("Keys missing");
            return (b = b.type === "add" || b.type === "put" ? n(n({}, b), { keys: O }) : n({}, b)).type !== "delete" && (b.values = i([], b.values)), b.keys && (b.keys = i([], b.keys)), D = c, S = O, ((x = b).type === "add" ? Promise.resolve([]) : D.getMany({ trans: x.trans, keys: S, cache: "immutable" })).then(function(P) {
              var T = O.map(function(A, N) {
                var L, U, q, F = P[N], W = { onerror: null, onsuccess: null };
                return b.type === "delete" ? g.fire.call(W, A, F, R) : b.type === "add" || F === void 0 ? (L = w.fire.call(W, A, b.values[N], R), A == null && L != null && (b.keys[N] = A = L, f.outbound || le(b.values[N], f.keyPath, A))) : (L = is(F, b.values[N]), (U = k.fire.call(W, L, A, F, R)) && (q = b.values[N], Object.keys(U).forEach(function(K) {
                  _(q, K) ? q[K] = U[K] : le(q, K, U[K]);
                }))), W;
              });
              return c.mutate(b).then(function(A) {
                for (var N = A.failures, L = A.results, U = A.numFailures, A = A.lastResult, q = 0; q < O.length; ++q) {
                  var F = (L || O)[q], W = T[q];
                  F == null ? W.onerror && W.onerror(N[q]) : W.onsuccess && W.onsuccess(b.type === "put" && P[q] ? b.values[q] : F);
                }
                return { failures: N, results: L, numFailures: U, lastResult: A };
              }).catch(function(A) {
                return T.forEach(function(N) {
                  return N.onerror && N.onerror(A);
                }), Promise.reject(A);
              });
            });
          }
        } });
      } });
    } };
    function fu(a, o, c) {
      try {
        if (!o || o.keys.length < a.length) return null;
        for (var f = [], h = 0, p = 0; h < o.keys.length && p < a.length; ++h) he(o.keys[h], a[p]) === 0 && (f.push(c ? qe(o.values[h]) : o.values[h]), ++p);
        return f.length === a.length ? f : null;
      } catch {
        return null;
      }
    }
    var Wf = { stack: "dbcore", level: -1, create: function(a) {
      return { table: function(o) {
        var c = a.table(o);
        return n(n({}, c), { getMany: function(f) {
          if (!f.cache) return c.getMany(f);
          var h = fu(f.keys, f.trans._cache, f.cache === "clone");
          return h ? V.resolve(h) : c.getMany(f).then(function(p) {
            return f.trans._cache = { keys: f.keys, values: f.cache === "clone" ? qe(p) : p }, p;
          });
        }, mutate: function(f) {
          return f.type !== "add" && (f.trans._cache = null), c.mutate(f);
        } });
      } };
    } };
    function du(a, o) {
      return a.trans.mode === "readonly" && !!a.subscr && !a.trans.explicit && a.trans.db._options.cache !== "disabled" && !o.schema.primaryKey.outbound;
    }
    function hu(a, o) {
      switch (a) {
        case "query":
          return o.values && !o.unique;
        case "get":
        case "getMany":
        case "count":
        case "openCursor":
          return !1;
      }
    }
    var zf = { stack: "dbcore", level: 0, name: "Observability", create: function(a) {
      var o = a.schema.name, c = new Ne(a.MIN_KEY, a.MAX_KEY);
      return n(n({}, a), { transaction: function(f, h, p) {
        if (J.subscr && h !== "readonly") throw new te.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(J.querier));
        return a.transaction(f, h, p);
      }, table: function(f) {
        var h = a.table(f), p = h.schema, y = p.primaryKey, b = p.indexes, g = y.extractKey, w = y.outbound, k = y.autoIncrement && b.filter(function(x) {
          return x.compound && x.keyPath.includes(y.keyPath);
        }), E = n(n({}, h), { mutate: function(x) {
          function S(K) {
            return K = "idb://".concat(o, "/").concat(f, "/").concat(K), A[K] || (A[K] = new Ne());
          }
          var R, O, P, T = x.trans, A = x.mutatedParts || (x.mutatedParts = {}), N = S(""), L = S(":dels"), U = x.type, W = x.type === "deleteRange" ? [x.range] : x.type === "delete" ? [x.keys] : x.values.length < 50 ? [as(y, x).filter(function(K) {
            return K;
          }), x.values] : [], q = W[0], F = W[1], W = x.trans._cache;
          return l(q) ? (N.addKeys(q), (W = U === "delete" || q.length === F.length ? fu(q, W) : null) || L.addKeys(q), (W || F) && (R = S, O = W, P = F, p.indexes.forEach(function(K) {
            var Z = R(K.name || "");
            function se(de) {
              return de != null ? K.extractKey(de) : null;
            }
            function fe(de) {
              return K.multiEntry && l(de) ? de.forEach(function(Ze) {
                return Z.addKey(Ze);
              }) : Z.addKey(de);
            }
            (O || P).forEach(function(de, Be) {
              var ie = O && se(O[Be]), Be = P && se(P[Be]);
              he(ie, Be) !== 0 && (ie != null && fe(ie), Be != null && fe(Be));
            });
          }))) : q ? (F = { from: (F = q.lower) !== null && F !== void 0 ? F : a.MIN_KEY, to: (F = q.upper) !== null && F !== void 0 ? F : a.MAX_KEY }, L.add(F), N.add(F)) : (N.add(c), L.add(c), p.indexes.forEach(function(K) {
            return S(K.name).add(c);
          })), h.mutate(x).then(function(K) {
            return !q || x.type !== "add" && x.type !== "put" || (N.addKeys(K.results), k && k.forEach(function(Z) {
              for (var se = x.values.map(function(ie) {
                return Z.extractKey(ie);
              }), fe = Z.keyPath.findIndex(function(ie) {
                return ie === y.keyPath;
              }), de = 0, Ze = K.results.length; de < Ze; ++de) se[de][fe] = K.results[de];
              S(Z.name).addKeys(se);
            })), T.mutatedParts = Ni(T.mutatedParts || {}, A), K;
          });
        } }), b = function(S) {
          var R = S.query, S = R.index, R = R.range;
          return [S, new Ne((S = R.lower) !== null && S !== void 0 ? S : a.MIN_KEY, (R = R.upper) !== null && R !== void 0 ? R : a.MAX_KEY)];
        }, D = { get: function(x) {
          return [y, new Ne(x.key)];
        }, getMany: function(x) {
          return [y, new Ne().addKeys(x.keys)];
        }, count: b, query: b, openCursor: b };
        return u(D).forEach(function(x) {
          E[x] = function(S) {
            var R = J.subscr, O = !!R, P = du(J, h) && hu(x, S) ? S.obsSet = {} : R;
            if (O) {
              var T = function(F) {
                return F = "idb://".concat(o, "/").concat(f, "/").concat(F), P[F] || (P[F] = new Ne());
              }, A = T(""), N = T(":dels"), R = D[x](S), O = R[0], R = R[1];
              if ((x === "query" && O.isPrimaryKey && !S.values ? N : T(O.name || "")).add(R), !O.isPrimaryKey) {
                if (x !== "count") {
                  var L = x === "query" && w && S.values && h.query(n(n({}, S), { values: !1 }));
                  return h[x].apply(this, arguments).then(function(F) {
                    if (x === "query") {
                      if (w && S.values) return L.then(function(se) {
                        return se = se.result, A.addKeys(se), F;
                      });
                      var W = S.values ? F.result.map(g) : F.result;
                      (S.values ? A : N).addKeys(W);
                    } else if (x === "openCursor") {
                      var K = F, Z = S.values;
                      return K && Object.create(K, { key: { get: function() {
                        return N.addKey(K.primaryKey), K.key;
                      } }, primaryKey: { get: function() {
                        var se = K.primaryKey;
                        return N.addKey(se), se;
                      } }, value: { get: function() {
                        return Z && A.addKey(K.primaryKey), K.value;
                      } } });
                    }
                    return F;
                  });
                }
                N.add(c);
              }
            }
            return h[x].apply(this, arguments);
          };
        }), E;
      } });
    } };
    function pu(a, o, c) {
      if (c.numFailures === 0) return o;
      if (o.type === "deleteRange") return null;
      var f = o.keys ? o.keys.length : "values" in o && o.values ? o.values.length : 1;
      return c.numFailures === f ? null : (o = n({}, o), l(o.keys) && (o.keys = o.keys.filter(function(h, p) {
        return !(p in c.failures);
      })), "values" in o && l(o.values) && (o.values = o.values.filter(function(h, p) {
        return !(p in c.failures);
      })), o);
    }
    function ss(a, o) {
      return c = a, ((f = o).lower === void 0 || (f.lowerOpen ? 0 < he(c, f.lower) : 0 <= he(c, f.lower))) && (a = a, (o = o).upper === void 0 || (o.upperOpen ? he(a, o.upper) < 0 : he(a, o.upper) <= 0));
      var c, f;
    }
    function mu(a, o, D, f, h, p) {
      if (!D || D.length === 0) return a;
      var y = o.query.index, g = y.multiEntry, w = o.query.range, k = f.schema.primaryKey.extractKey, E = y.extractKey, b = (y.lowLevelIndex || y).extractKey, D = D.reduce(function(x, S) {
        var R = x, O = [];
        if (S.type === "add" || S.type === "put") for (var P = new Ne(), T = S.values.length - 1; 0 <= T; --T) {
          var A, N = S.values[T], L = k(N);
          P.hasKey(L) || (A = E(N), (g && l(A) ? A.some(function(K) {
            return ss(K, w);
          }) : ss(A, w)) && (P.addKey(L), O.push(N)));
        }
        switch (S.type) {
          case "add":
            var U = new Ne().addKeys(o.values ? x.map(function(Z) {
              return k(Z);
            }) : x), R = x.concat(o.values ? O.filter(function(Z) {
              return Z = k(Z), !U.hasKey(Z) && (U.addKey(Z), !0);
            }) : O.map(function(Z) {
              return k(Z);
            }).filter(function(Z) {
              return !U.hasKey(Z) && (U.addKey(Z), !0);
            }));
            break;
          case "put":
            var q = new Ne().addKeys(S.values.map(function(Z) {
              return k(Z);
            }));
            R = x.filter(function(Z) {
              return !q.hasKey(o.values ? k(Z) : Z);
            }).concat(o.values ? O : O.map(function(Z) {
              return k(Z);
            }));
            break;
          case "delete":
            var F = new Ne().addKeys(S.keys);
            R = x.filter(function(Z) {
              return !F.hasKey(o.values ? k(Z) : Z);
            });
            break;
          case "deleteRange":
            var W = S.range;
            R = x.filter(function(Z) {
              return !ss(k(Z), W);
            });
        }
        return R;
      }, a);
      return D === a ? a : (D.sort(function(x, S) {
        return he(b(x), b(S)) || he(k(x), k(S));
      }), o.limit && o.limit < 1 / 0 && (D.length > o.limit ? D.length = o.limit : a.length === o.limit && D.length < o.limit && (h.dirty = !0)), p ? Object.freeze(D) : D);
    }
    function vu(a, o) {
      return he(a.lower, o.lower) === 0 && he(a.upper, o.upper) === 0 && !!a.lowerOpen == !!o.lowerOpen && !!a.upperOpen == !!o.upperOpen;
    }
    function Vf(a, o) {
      return function(c, f, h, p) {
        if (c === void 0) return f !== void 0 ? -1 : 0;
        if (f === void 0) return 1;
        if ((f = he(c, f)) === 0) {
          if (h && p) return 0;
          if (h) return 1;
          if (p) return -1;
        }
        return f;
      }(a.lower, o.lower, a.lowerOpen, o.lowerOpen) <= 0 && 0 <= function(c, f, h, p) {
        if (c === void 0) return f !== void 0 ? 1 : 0;
        if (f === void 0) return -1;
        if ((f = he(c, f)) === 0) {
          if (h && p) return 0;
          if (h) return -1;
          if (p) return 1;
        }
        return f;
      }(a.upper, o.upper, a.upperOpen, o.upperOpen);
    }
    function Hf(a, o, c, f) {
      a.subscribers.add(c), f.addEventListener("abort", function() {
        var h, p;
        a.subscribers.delete(c), a.subscribers.size === 0 && (h = a, p = o, setTimeout(function() {
          h.subscribers.size === 0 && Je(p, h);
        }, 3e3));
      });
    }
    var Zf = { stack: "dbcore", level: 0, name: "Cache", create: function(a) {
      var o = a.schema.name;
      return n(n({}, a), { transaction: function(c, f, h) {
        var p, y, g = a.transaction(c, f, h);
        return f === "readwrite" && (y = (p = new AbortController()).signal, h = function(w) {
          return function() {
            if (p.abort(), f === "readwrite") {
              for (var k = /* @__PURE__ */ new Set(), E = 0, b = c; E < b.length; E++) {
                var D = b[E], x = pr["idb://".concat(o, "/").concat(D)];
                if (x) {
                  var S = a.table(D), R = x.optimisticOps.filter(function(Z) {
                    return Z.trans === g;
                  });
                  if (g._explicit && w && g.mutatedParts) for (var O = 0, P = Object.values(x.queries.query); O < P.length; O++) for (var T = 0, A = (U = P[O]).slice(); T < A.length; T++) Xa((q = A[T]).obsSet, g.mutatedParts) && (Je(U, q), q.subscribers.forEach(function(Z) {
                    return k.add(Z);
                  }));
                  else if (0 < R.length) {
                    x.optimisticOps = x.optimisticOps.filter(function(Z) {
                      return Z.trans !== g;
                    });
                    for (var N = 0, L = Object.values(x.queries.query); N < L.length; N++) for (var U, q, F, W = 0, K = (U = L[N]).slice(); W < K.length; W++) (q = K[W]).res != null && g.mutatedParts && (w && !q.dirty ? (F = Object.isFrozen(q.res), F = mu(q.res, q.req, R, S, q, F), q.dirty ? (Je(U, q), q.subscribers.forEach(function(Z) {
                      return k.add(Z);
                    })) : F !== q.res && (q.res = F, q.promise = V.resolve({ result: F }))) : (q.dirty && Je(U, q), q.subscribers.forEach(function(Z) {
                      return k.add(Z);
                    })));
                  }
                }
              }
              k.forEach(function(Z) {
                return Z();
              });
            }
          };
        }, g.addEventListener("abort", h(!1), { signal: y }), g.addEventListener("error", h(!1), { signal: y }), g.addEventListener("complete", h(!0), { signal: y })), g;
      }, table: function(c) {
        var f = a.table(c), h = f.schema.primaryKey;
        return n(n({}, f), { mutate: function(p) {
          var y = J.trans;
          if (h.outbound || y.db._options.cache === "disabled" || y.explicit || y.idbtrans.mode !== "readwrite") return f.mutate(p);
          var g = pr["idb://".concat(o, "/").concat(c)];
          return g ? (y = f.mutate(p), p.type !== "add" && p.type !== "put" || !(50 <= p.values.length || as(h, p).some(function(w) {
            return w == null;
          })) ? (g.optimisticOps.push(p), p.mutatedParts && Bi(p.mutatedParts), y.then(function(w) {
            0 < w.numFailures && (Je(g.optimisticOps, p), (w = pu(0, p, w)) && g.optimisticOps.push(w), p.mutatedParts && Bi(p.mutatedParts));
          }), y.catch(function() {
            Je(g.optimisticOps, p), p.mutatedParts && Bi(p.mutatedParts);
          })) : y.then(function(w) {
            var k = pu(0, n(n({}, p), { values: p.values.map(function(E, b) {
              var D;
              return w.failures[b] ? E : (E = (D = h.keyPath) !== null && D !== void 0 && D.includes(".") ? qe(E) : n({}, E), le(E, h.keyPath, w.results[b]), E);
            }) }), w);
            g.optimisticOps.push(k), queueMicrotask(function() {
              return p.mutatedParts && Bi(p.mutatedParts);
            });
          }), y) : f.mutate(p);
        }, query: function(p) {
          if (!du(J, f) || !hu("query", p)) return f.query(p);
          var y = ((k = J.trans) === null || k === void 0 ? void 0 : k.db._options.cache) === "immutable", b = J, g = b.requery, w = b.signal, k = function(S, R, O, P) {
            var T = pr["idb://".concat(S, "/").concat(R)];
            if (!T) return [];
            if (!(R = T.queries[O])) return [null, !1, T, null];
            var A = R[(P.query ? P.query.index.name : null) || ""];
            if (!A) return [null, !1, T, null];
            switch (O) {
              case "query":
                var N = A.find(function(L) {
                  return L.req.limit === P.limit && L.req.values === P.values && vu(L.req.query.range, P.query.range);
                });
                return N ? [N, !0, T, A] : [A.find(function(L) {
                  return ("limit" in L.req ? L.req.limit : 1 / 0) >= P.limit && (!P.values || L.req.values) && Vf(L.req.query.range, P.query.range);
                }), !1, T, A];
              case "count":
                return N = A.find(function(L) {
                  return vu(L.req.query.range, P.query.range);
                }), [N, !!N, T, A];
            }
          }(o, c, "query", p), E = k[0], b = k[1], D = k[2], x = k[3];
          return E && b ? E.obsSet = p.obsSet : (b = f.query(p).then(function(S) {
            var R = S.result;
            if (E && (E.res = R), y) {
              for (var O = 0, P = R.length; O < P; ++O) Object.freeze(R[O]);
              Object.freeze(R);
            } else S.result = qe(R);
            return S;
          }).catch(function(S) {
            return x && E && Je(x, E), Promise.reject(S);
          }), E = { obsSet: p.obsSet, promise: b, subscribers: /* @__PURE__ */ new Set(), type: "query", req: p, dirty: !1 }, x ? x.push(E) : (x = [E], (D = D || (pr["idb://".concat(o, "/").concat(c)] = { queries: { query: {}, count: {} }, objs: /* @__PURE__ */ new Map(), optimisticOps: [], unsignaledParts: {} })).queries.query[p.query.index.name || ""] = x)), Hf(E, x, g, w), E.promise.then(function(S) {
            return { result: mu(S.result, p, D == null ? void 0 : D.optimisticOps, f, E, y) };
          });
        } });
      } });
    } };
    function ji(a, o) {
      return new Proxy(a, { get: function(c, f, h) {
        return f === "db" ? o : Reflect.get(c, f, h);
      } });
    }
    var Ct = (Se.prototype.version = function(a) {
      if (isNaN(a) || a < 0.1) throw new te.Type("Given version is not a positive number");
      if (a = Math.round(10 * a) / 10, this.idbdb || this._state.isBeingOpened) throw new te.Schema("Cannot add version when database is open");
      this.verno = Math.max(this.verno, a);
      var o = this._versions, c = o.filter(function(f) {
        return f._cfg.version === a;
      })[0];
      return c || (c = new this.Version(a), o.push(c), o.sort($f), c.stores({}), this._state.autoSchema = !1, c);
    }, Se.prototype._whenReady = function(a) {
      var o = this;
      return this.idbdb && (this._state.openComplete || J.letThrough || this._vip) ? a() : new V(function(c, f) {
        if (o._state.openComplete) return f(new te.DatabaseClosed(o._state.dbOpenError));
        if (!o._state.isBeingOpened) {
          if (!o._state.autoOpen) return void f(new te.DatabaseClosed());
          o.open().catch(ve);
        }
        o._state.dbReadyPromise.then(c, f);
      }).then(a);
    }, Se.prototype.use = function(a) {
      var o = a.stack, c = a.create, f = a.level, h = a.name;
      return h && this.unuse({ stack: o, name: h }), a = this._middlewares[o] || (this._middlewares[o] = []), a.push({ stack: o, create: c, level: f ?? 10, name: h }), a.sort(function(p, y) {
        return p.level - y.level;
      }), this;
    }, Se.prototype.unuse = function(a) {
      var o = a.stack, c = a.name, f = a.create;
      return o && this._middlewares[o] && (this._middlewares[o] = this._middlewares[o].filter(function(h) {
        return f ? h.create !== f : !!c && h.name !== c;
      })), this;
    }, Se.prototype.open = function() {
      var a = this;
      return fr(Kt, function() {
        return Ff(a);
      });
    }, Se.prototype._close = function() {
      var a = this._state, o = jr.indexOf(this);
      if (0 <= o && jr.splice(o, 1), this.idbdb) {
        try {
          this.idbdb.close();
        } catch {
        }
        this.idbdb = null;
      }
      a.isBeingOpened || (a.dbReadyPromise = new V(function(c) {
        a.dbReadyResolve = c;
      }), a.openCanceller = new V(function(c, f) {
        a.cancelOpen = f;
      }));
    }, Se.prototype.close = function(c) {
      var o = (c === void 0 ? { disableAutoOpen: !0 } : c).disableAutoOpen, c = this._state;
      o ? (c.isBeingOpened && c.cancelOpen(new te.DatabaseClosed()), this._close(), c.autoOpen = !1, c.dbOpenError = new te.DatabaseClosed()) : (this._close(), c.autoOpen = this._options.autoOpen || c.isBeingOpened, c.openComplete = !1, c.dbOpenError = null);
    }, Se.prototype.delete = function(a) {
      var o = this;
      a === void 0 && (a = { disableAutoOpen: !0 });
      var c = 0 < arguments.length && typeof arguments[0] != "object", f = this._state;
      return new V(function(h, p) {
        function y() {
          o.close(a);
          var g = o._deps.indexedDB.deleteDatabase(o.name);
          g.onsuccess = we(function() {
            var w, k, E;
            w = o._deps, k = o.name, E = w.indexedDB, w = w.IDBKeyRange, Ga(E) || k === ki || Qa(E, w).delete(k).catch(ve), h();
          }), g.onerror = pt(p), g.onblocked = o._fireOnBlocked;
        }
        if (c) throw new te.InvalidArgument("Invalid closeOptions argument to db.delete()");
        f.isBeingOpened ? f.dbReadyPromise.then(y) : y();
      });
    }, Se.prototype.backendDB = function() {
      return this.idbdb;
    }, Se.prototype.isOpen = function() {
      return this.idbdb !== null;
    }, Se.prototype.hasBeenClosed = function() {
      var a = this._state.dbOpenError;
      return a && a.name === "DatabaseClosed";
    }, Se.prototype.hasFailed = function() {
      return this._state.dbOpenError !== null;
    }, Se.prototype.dynamicallyOpened = function() {
      return this._state.autoSchema;
    }, Object.defineProperty(Se.prototype, "tables", { get: function() {
      var a = this;
      return u(this._allTables).map(function(o) {
        return a._allTables[o];
      });
    }, enumerable: !1, configurable: !0 }), Se.prototype.transaction = function() {
      var a = (function(o, c, f) {
        var h = arguments.length;
        if (h < 2) throw new te.InvalidArgument("Too few arguments");
        for (var p = new Array(h - 1); --h; ) p[h - 1] = arguments[h];
        return f = p.pop(), [o, dt(p), f];
      }).apply(this, arguments);
      return this._transaction.apply(this, a);
    }, Se.prototype._transaction = function(a, o, c) {
      var f = this, h = J.trans;
      h && h.db === this && a.indexOf("!") === -1 || (h = null);
      var p, y, g = a.indexOf("?") !== -1;
      a = a.replace("!", "").replace("?", "");
      try {
        if (y = o.map(function(k) {
          if (k = k instanceof f.Table ? k.name : k, typeof k != "string") throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
          return k;
        }), a == "r" || a === $a) p = $a;
        else {
          if (a != "rw" && a != ja) throw new te.InvalidArgument("Invalid transaction mode: " + a);
          p = ja;
        }
        if (h) {
          if (h.mode === $a && p === ja) {
            if (!g) throw new te.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
            h = null;
          }
          h && y.forEach(function(k) {
            if (h && h.storeNames.indexOf(k) === -1) {
              if (!g) throw new te.SubTransaction("Table " + k + " not included in parent transaction.");
              h = null;
            }
          }), g && h && !h.active && (h = null);
        }
      } catch (k) {
        return h ? h._promise(null, function(E, b) {
          b(k);
        }) : Oe(k);
      }
      var w = (function k(E, b, D, x, S) {
        return V.resolve().then(function() {
          var R = J.transless || J, O = E._createTransaction(b, D, E._dbSchema, x);
          if (O.explicit = !0, R = { trans: O, transless: R }, x) O.idbtrans = x.idbtrans;
          else try {
            O.create(), O.idbtrans._explicit = !0, E._state.PR1398_maxLoop = 3;
          } catch (A) {
            return A.name === Ca.InvalidState && E.isOpen() && 0 < --E._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), E.close({ disableAutoOpen: !1 }), E.open().then(function() {
              return k(E, b, D, null, S);
            })) : Oe(A);
          }
          var P, T = qt(S);
          return T && $r(), R = V.follow(function() {
            var A;
            (P = S.call(O, O)) && (T ? (A = Wt.bind(null, null), P.then(A, A)) : typeof P.next == "function" && typeof P.throw == "function" && (P = ns(P)));
          }, R), (P && typeof P.then == "function" ? V.resolve(P).then(function(A) {
            return O.active ? A : Oe(new te.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
          }) : R.then(function() {
            return P;
          })).then(function(A) {
            return x && O._resolve(), O._completion.then(function() {
              return A;
            });
          }).catch(function(A) {
            return O._reject(A), Oe(A);
          });
        });
      }).bind(null, this, p, y, h, c);
      return h ? h._promise(p, w, "lock") : J.trans ? fr(J.transless, function() {
        return f._whenReady(w);
      }) : this._whenReady(w);
    }, Se.prototype.table = function(a) {
      if (!_(this._allTables, a)) throw new te.InvalidTable("Table ".concat(a, " does not exist"));
      return this._allTables[a];
    }, Se);
    function Se(a, o) {
      var c = this;
      this._middlewares = {}, this.verno = 0;
      var f = Se.dependencies;
      this._options = o = n({ addons: Se.addons, autoOpen: !0, indexedDB: f.indexedDB, IDBKeyRange: f.IDBKeyRange, cache: "cloned" }, o), this._deps = { indexedDB: o.indexedDB, IDBKeyRange: o.IDBKeyRange }, f = o.addons, this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this;
      var h, p, y, g, w, k = { dbOpenError: null, isBeingOpened: !1, onReadyBeingFired: null, openComplete: !1, dbReadyResolve: ve, dbReadyPromise: null, cancelOpen: ve, openCanceller: null, autoSchema: !0, PR1398_maxLoop: 3, autoOpen: o.autoOpen };
      k.dbReadyPromise = new V(function(b) {
        k.dbReadyResolve = b;
      }), k.openCanceller = new V(function(b, D) {
        k.cancelOpen = D;
      }), this._state = k, this.name = a, this.on = kn(this, "populate", "blocked", "versionchange", "close", { ready: [Ra, ve] }), this.on.ready.subscribe = ee(this.on.ready.subscribe, function(b) {
        return function(D, x) {
          Se.vip(function() {
            var S, R = c._state;
            R.openComplete ? (R.dbOpenError || V.resolve().then(D), x && b(D)) : R.onReadyBeingFired ? (R.onReadyBeingFired.push(D), x && b(D)) : (b(D), S = c, x || b(function O() {
              S.on.ready.unsubscribe(D), S.on.ready.unsubscribe(O);
            }));
          });
        };
      }), this.Collection = (h = this, On(If.prototype, function(P, O) {
        this.db = h;
        var x = Ho, S = null;
        if (O) try {
          x = O();
        } catch (T) {
          S = T;
        }
        var R = P._ctx, O = R.table, P = O.hook.reading.fire;
        this._ctx = { table: O, index: R.index, isPrimKey: !R.index || O.schema.primKey.keyPath && R.index === O.schema.primKey.name, range: x, keysOnly: !1, dir: "next", unique: "", algorithm: null, filter: null, replayFilter: null, justLimit: !0, isMatch: null, offset: 0, limit: 1 / 0, error: S, or: R.or, valueMapper: P !== gn ? P : null };
      })), this.Table = (p = this, On(Yo.prototype, function(b, D, x) {
        this.db = p, this._tx = x, this.name = b, this.schema = D, this.hook = p._allTables[b] ? p._allTables[b].hook : kn(null, { creating: [wf, ve], reading: [_f, gn], updating: [kf, ve], deleting: [xf, ve] });
      })), this.Transaction = (y = this, On(Af.prototype, function(b, D, x, S, R) {
        var O = this;
        this.db = y, this.mode = b, this.storeNames = D, this.schema = x, this.chromeTransactionDurability = S, this.idbtrans = null, this.on = kn(this, "complete", "error", "abort"), this.parent = R || null, this.active = !0, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new V(function(P, T) {
          O._resolve = P, O._reject = T;
        }), this._completion.then(function() {
          O.active = !1, O.on.complete.fire();
        }, function(P) {
          var T = O.active;
          return O.active = !1, O.on.error.fire(P), O.parent ? O.parent._reject(P) : T && O.idbtrans && O.idbtrans.abort(), Oe(P);
        });
      })), this.Version = (g = this, On(qf.prototype, function(b) {
        this.db = g, this._cfg = { version: b, storesSource: null, dbschema: {}, tables: {}, contentUpgrade: null };
      })), this.WhereClause = (w = this, On(ru.prototype, function(b, D, x) {
        if (this.db = w, this._ctx = { table: b, index: D === ":id" ? null : D, or: x }, this._cmp = this._ascending = he, this._descending = function(S, R) {
          return he(R, S);
        }, this._max = function(S, R) {
          return 0 < he(S, R) ? S : R;
        }, this._min = function(S, R) {
          return he(S, R) < 0 ? S : R;
        }, this._IDBKeyRange = w._deps.IDBKeyRange, !this._IDBKeyRange) throw new te.MissingAPI();
      })), this.on("versionchange", function(b) {
        0 < b.newVersion ? console.warn("Another connection wants to upgrade database '".concat(c.name, "'. Closing db now to resume the upgrade.")) : console.warn("Another connection wants to delete database '".concat(c.name, "'. Closing db now to resume the delete request.")), c.close({ disableAutoOpen: !1 });
      }), this.on("blocked", function(b) {
        !b.newVersion || b.newVersion < b.oldVersion ? console.warn("Dexie.delete('".concat(c.name, "') was blocked")) : console.warn("Upgrade '".concat(c.name, "' blocked by other connection holding version ").concat(b.oldVersion / 10));
      }), this._maxKey = Rn(o.IDBKeyRange), this._createTransaction = function(b, D, x, S) {
        return new c.Transaction(b, D, x, c._options.chromeTransactionDurability, S);
      }, this._fireOnBlocked = function(b) {
        c.on("blocked").fire(b), jr.filter(function(D) {
          return D.name === c.name && D !== c && !D._state.vcFired;
        }).map(function(D) {
          return D.on("versionchange").fire(b);
        });
      }, this.use(Wf), this.use(Zf), this.use(zf), this.use(Kf), this.use(Uf);
      var E = new Proxy(this, { get: function(b, D, x) {
        if (D === "_vip") return !0;
        if (D === "table") return function(R) {
          return ji(c.table(R), E);
        };
        var S = Reflect.get(b, D, x);
        return S instanceof Yo ? ji(S, E) : D === "tables" ? S.map(function(R) {
          return ji(R, E);
        }) : D === "_createTransaction" ? function() {
          return ji(S.apply(this, arguments), E);
        } : S;
      } });
      this.vip = E, f.forEach(function(b) {
        return b(c);
      });
    }
    var Li, Xe = typeof Symbol < "u" && "observable" in Symbol ? Symbol.observable : "@@observable", Qf = (os.prototype.subscribe = function(a, o, c) {
      return this._subscribe(a && typeof a != "function" ? a : { next: a, error: o, complete: c });
    }, os.prototype[Xe] = function() {
      return this;
    }, os);
    function os(a) {
      this._subscribe = a;
    }
    try {
      Li = { indexedDB: s.indexedDB || s.mozIndexedDB || s.webkitIndexedDB || s.msIndexedDB, IDBKeyRange: s.IDBKeyRange || s.webkitIDBKeyRange };
    } catch {
      Li = { indexedDB: null, IDBKeyRange: null };
    }
    function yu(a) {
      var o, c = !1, f = new Qf(function(h) {
        var p = qt(a), y, g = !1, w = {}, k = {}, E = { get closed() {
          return g;
        }, unsubscribe: function() {
          g || (g = !0, y && y.abort(), b && Ht.storagemutated.unsubscribe(x));
        } };
        h.start && h.start(E);
        var b = !1, D = function() {
          return Ba(S);
        }, x = function(R) {
          Ni(w, R), Xa(k, w) && D();
        }, S = function() {
          var R, O, P;
          !g && Li.indexedDB && (w = {}, R = {}, y && y.abort(), y = new AbortController(), P = function(T) {
            var A = Nr();
            try {
              p && $r();
              var N = Ut(a, T);
              return N = p ? N.finally(Wt) : N;
            } finally {
              A && Br();
            }
          }(O = { subscr: R, signal: y.signal, requery: D, querier: a, trans: null }), Promise.resolve(P).then(function(T) {
            c = !0, o = T, g || O.signal.aborted || (w = {}, function(A) {
              for (var N in A) if (_(A, N)) return;
              return 1;
            }(k = R) || b || (Ht(Cn, x), b = !0), Ba(function() {
              return !g && h.next && h.next(T);
            }));
          }, function(T) {
            c = !1, ["DatabaseClosedError", "AbortError"].includes(T == null ? void 0 : T.name) || g || Ba(function() {
              g || h.error && h.error(T);
            });
          }));
        };
        return setTimeout(D, 0), E;
      });
      return f.hasValue = function() {
        return c;
      }, f.getValue = function() {
        return o;
      }, f;
    }
    var mr = Ct;
    function us(a) {
      var o = Zt;
      try {
        Zt = !0, Ht.storagemutated.fire(a), rs(a, !0);
      } finally {
        Zt = o;
      }
    }
    C(mr, n(n({}, pi), { delete: function(a) {
      return new mr(a, { addons: [] }).delete();
    }, exists: function(a) {
      return new mr(a, { addons: [] }).open().then(function(o) {
        return o.close(), !0;
      }).catch("NoSuchDatabaseError", function() {
        return !1;
      });
    }, getDatabaseNames: function(a) {
      try {
        return o = mr.dependencies, c = o.indexedDB, o = o.IDBKeyRange, (Ga(c) ? Promise.resolve(c.databases()).then(function(f) {
          return f.map(function(h) {
            return h.name;
          }).filter(function(h) {
            return h !== ki;
          });
        }) : Qa(c, o).toCollection().primaryKeys()).then(a);
      } catch {
        return Oe(new te.MissingAPI());
      }
      var o, c;
    }, defineClass: function() {
      return function(a) {
        d(this, a);
      };
    }, ignoreTransaction: function(a) {
      return J.trans ? fr(J.transless, a) : a();
    }, vip: Ya, async: function(a) {
      return function() {
        try {
          var o = ns(a.apply(this, arguments));
          return o && typeof o.then == "function" ? o : V.resolve(o);
        } catch (c) {
          return Oe(c);
        }
      };
    }, spawn: function(a, o, c) {
      try {
        var f = ns(a.apply(c, o || []));
        return f && typeof f.then == "function" ? f : V.resolve(f);
      } catch (h) {
        return Oe(h);
      }
    }, currentTransaction: { get: function() {
      return J.trans || null;
    } }, waitFor: function(a, o) {
      return o = V.resolve(typeof a == "function" ? mr.ignoreTransaction(a) : a).timeout(o || 6e4), J.trans ? J.trans.waitFor(o) : o;
    }, Promise: V, debug: { get: function() {
      return ht;
    }, set: function(a) {
      qo(a);
    } }, derive: B, extend: d, props: C, override: ee, Events: kn, on: Ht, liveQuery: yu, extendObservabilitySet: Ni, getByKeyPath: ce, setByKeyPath: le, delByKeyPath: function(a, o) {
      typeof o == "string" ? le(a, o, void 0) : "length" in o && [].map.call(o, function(c) {
        le(a, c, void 0);
      });
    }, shallowClone: be, deepClone: qe, getObjectDiff: is, cmp: he, asap: ae, minKey: -1 / 0, addons: [], connections: jr, errnames: Ca, dependencies: Li, cache: pr, semVer: "4.0.10", version: "4.0.10".split(".").map(function(a) {
      return parseInt(a);
    }).reduce(function(a, o, c) {
      return a + o / Math.pow(10, 2 * c);
    }) })), mr.maxKey = Rn(mr.dependencies.IDBKeyRange), typeof dispatchEvent < "u" && typeof addEventListener < "u" && (Ht(Cn, function(a) {
      Zt || (a = new CustomEvent(Ka, { detail: a }), Zt = !0, dispatchEvent(a), Zt = !1);
    }), addEventListener(Ka, function(a) {
      a = a.detail, Zt || us(a);
    }));
    var Fr, Zt = !1, gu = function() {
    };
    return typeof BroadcastChannel < "u" && ((gu = function() {
      (Fr = new BroadcastChannel(Ka)).onmessage = function(a) {
        return a.data && us(a.data);
      };
    })(), typeof Fr.unref == "function" && Fr.unref(), Ht(Cn, function(a) {
      Zt || Fr.postMessage(a);
    })), typeof addEventListener < "u" && (addEventListener("pagehide", function(a) {
      if (!Ct.disableBfCache && a.persisted) {
        ht && console.debug("Dexie: handling persisted pagehide"), Fr != null && Fr.close();
        for (var o = 0, c = jr; o < c.length; o++) c[o].close({ disableAutoOpen: !1 });
      }
    }), addEventListener("pageshow", function(a) {
      !Ct.disableBfCache && a.persisted && (ht && console.debug("Dexie: handling persisted pageshow"), gu(), us({ all: new Ne(-1 / 0, [[]]) }));
    })), V.rejectionMapper = function(a, o) {
      return !a || a instanceof Ee || a instanceof TypeError || a instanceof SyntaxError || !a.name || !Lo[a.name] ? a : (o = new Lo[a.name](o || a.message, a), "stack" in a && M(o, "stack", { get: function() {
        return this.inner.stack;
      } }), o);
    }, qo(ht), n(Ct, Object.freeze({ __proto__: null, Dexie: Ct, liveQuery: yu, Entity: Zo, cmp: he, PropModSymbol: Et, PropModification: Sn, replacePrefix: function(a, o) {
      return new Sn({ replacePrefix: [a, o] });
    }, add: function(a) {
      return new Sn({ add: a });
    }, remove: function(a) {
      return new Sn({ remove: a });
    }, default: Ct, RangeSet: Ne, mergeRanges: Pn, rangesOverlap: ou }), { default: Ct }), Ct;
  });
})(lf);
var jg = lf.exports;
const eo = /* @__PURE__ */ $g(jg), uc = Symbol.for("Dexie"), ua = globalThis[uc] || (globalThis[uc] = eo);
if (eo.semVer !== ua.semVer)
  throw new Error(`Two different versions of Dexie loaded in the same app: ${eo.semVer} and ${ua.semVer}`);
const {
  liveQuery: jb,
  mergeRanges: Lb,
  rangesOverlap: qb,
  RangeSet: Fb,
  cmp: Kb,
  Entity: Ub,
  PropModSymbol: Wb,
  PropModification: zb,
  replacePrefix: Vb,
  add: Hb,
  remove: Zb
} = ua;
var ca = "docs", Lg = "changes", cc = "attachments", ff = "dexie", lc = /* @__PURE__ */ new Map(), Zi = /* @__PURE__ */ new Map();
function qg(e, t, r, n) {
  var i = "rxdb-dexie-" + e + "--" + n.version + "--" + t, s = Dr(lc, i, () => {
    var u = (async () => {
      var l = Pe(r);
      l.autoOpen = !1;
      var d = new ua(i, l), m = {
        [ca]: Ug(n),
        [Lg]: "++sequence, id",
        [cc]: "id"
      };
      return d.version(1).stores(m), await d.open(), {
        dexieDb: d,
        dexieTable: d[ca],
        dexieAttachmentsTable: d[cc],
        booleanIndexes: Wg(n)
      };
    })();
    return lc.set(i, s), Zi.set(s, 0), u;
  });
  return s;
}
async function Fg(e) {
  var t = await e, r = Zi.get(e), n = r - 1;
  n === 0 ? (t.dexieDb.close(), Zi.delete(e)) : Zi.set(e, n);
}
var to = "__";
function mn(e) {
  var t = e.split(".");
  if (t.length > 1)
    return t.map((n) => mn(n)).join(".");
  if (e.startsWith("|")) {
    var r = e.substring(1);
    return to + r;
  } else
    return e;
}
function df(e) {
  var t = e.split(".");
  if (t.length > 1)
    return t.map((n) => df(n)).join(".");
  if (e.startsWith(to)) {
    var r = e.substring(to.length);
    return "|" + r;
  } else
    return e;
}
function Kg(e, t) {
  if (!t)
    return t;
  var r = Pe(t);
  return r = ro(r), e.forEach((n) => {
    var i = gt(t, n), s = i ? "1" : "0", u = mn(n);
    Nc(r, u, s);
  }), r;
}
function hf(e, t) {
  return t && (t = Pe(t), t = no(t), e.forEach((r) => {
    var n = gt(t, r), i = n === "1";
    Nc(t, r, i);
  }), t);
}
function ro(e) {
  if (!e || typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
  if (Array.isArray(e))
    return e.map((r) => ro(r));
  if (typeof e == "object") {
    var t = {};
    return Object.entries(e).forEach(([r, n]) => {
      typeof n == "object" && (n = ro(n)), t[mn(r)] = n;
    }), t;
  }
}
function no(e) {
  if (!e || typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
  if (Array.isArray(e))
    return e.map((r) => no(r));
  if (typeof e == "object") {
    var t = {};
    return Object.entries(e).forEach(([r, n]) => {
      (typeof n == "object" || Array.isArray(e)) && (n = no(n)), t[df(r)] = n;
    }), t;
  }
}
function Ug(e) {
  var t = [], r = kt(e.primaryKey);
  t.push([r]), t.push(["_deleted", r]), e.indexes && e.indexes.forEach((s) => {
    var u = uo(s);
    t.push(u);
  }), t.push(["_meta.lwt", r]), t.push(["_meta.lwt"]), t = t.map((s) => s.map((u) => mn(u)));
  var n = t.map((s) => s.length === 1 ? s[0] : "[" + s.join("+") + "]");
  n = n.filter((s, u, l) => l.indexOf(s) === u);
  var i = n.join(", ");
  return i;
}
async function fc(e, t) {
  var r = await e, n = await r.dexieTable.bulkGet(t);
  return n.map((i) => hf(r.booleanIndexes, i));
}
function Ui(e, t) {
  return e + "||" + t;
}
function Wg(e) {
  var t = /* @__PURE__ */ new Set(), r = [];
  return e.indexes ? (e.indexes.forEach((n) => {
    var i = uo(n);
    i.forEach((s) => {
      if (!t.has(s)) {
        t.add(s);
        var u = Bt(e, s);
        u.type === "boolean" && r.push(s);
      }
    });
  }), r.push("_deleted"), ih(r)) : r;
}
function dc(e) {
  return e === Jr ? -1 / 0 : e;
}
function hc(e, t, r) {
  if (e.includes(t)) {
    var n = r === Yr || r === !0 ? "1" : "0";
    return n;
  } else
    return r;
}
function pf(e, t, r) {
  if (!r) {
    if (typeof window > "u")
      throw new Error("IDBKeyRange missing");
    r = window.IDBKeyRange;
  }
  var n = t.startKeys.map((u, l) => {
    var d = t.index[l];
    return hc(e, d, u);
  }).map(dc), i = t.endKeys.map((u, l) => {
    var d = t.index[l];
    return hc(e, d, u);
  }).map(dc), s = r.bound(n, i, !t.inclusiveStart, !t.inclusiveEnd);
  return s;
}
async function pc(e, t) {
  var r = await e.internals, n = t.query, i = n.skip ? n.skip : 0, s = n.limit ? n.limit : 1 / 0, u = i + s, l = t.queryPlan, d = !1;
  l.selectorSatisfiedByIndex || (d = Co(e.schema, t.query));
  var m = pf(r.booleanIndexes, l, r.dexieDb._options.IDBKeyRange), v = l.index, _ = [];
  if (await r.dexieDb.transaction("r", r.dexieTable, async (I) => {
    var M = I.idbtrans, B = M.objectStore(ca), Q, G;
    G = "[" + v.map((ee) => mn(ee)).join("+") + "]", Q = B.index(G);
    var X = Q.openCursor(m);
    await new Promise((ee) => {
      X.onsuccess = function(ye) {
        var ae = ye.target.result;
        if (ae) {
          var ce = hf(r.booleanIndexes, ae.value);
          (!d || d(ce)) && _.push(ce), l.sortSatisfiedByIndex && _.length === u ? ee() : ae.continue();
        } else
          ee();
      };
    });
  }), !l.sortSatisfiedByIndex) {
    var C = Al(e.schema, t.query);
    _ = _.sort(C);
  }
  return _ = _.slice(i, u), {
    documents: _
  };
}
async function zg(e, t) {
  var r = await e.internals, n = t.queryPlan, i = n.index, s = pf(r.booleanIndexes, n, r.dexieDb._options.IDBKeyRange), u = -1;
  return await r.dexieDb.transaction("r", r.dexieTable, async (l) => {
    var d = l.idbtrans, m = d.objectStore(ca), v, _;
    _ = "[" + i.map((I) => mn(I)).join("+") + "]", v = m.index(_);
    var C = v.count(s);
    u = await new Promise((I, M) => {
      C.onsuccess = function() {
        I(C.result);
      }, C.onerror = (B) => M(B);
    });
  }), u;
}
var Vg = rt(), Es = !1, Hg = /* @__PURE__ */ function() {
  function e(r, n, i, s, u, l, d, m) {
    this.changes$ = new rr(), this.instanceId = Vg++, this.storage = r, this.databaseName = n, this.collectionName = i, this.schema = s, this.internals = u, this.options = l, this.settings = d, this.devMode = m, this.primaryPath = kt(this.schema.primaryKey);
  }
  var t = e.prototype;
  return t.bulkWrite = async function(n, i) {
    gr(this), !Es && (!Qr.premium || typeof Qr.premium != "string" || await co(Qr.premium) !== $c) && console.warn(["-------------- RxDB Open Core RxStorage -------------------------------", "You are using the free Dexie.js based RxStorage implementation from RxDB https://rxdb.info/rx-storage-dexie.html?console=dexie ", "While this is a great option, we want to let you know that there are faster storage solutions available in our premium plugins.", "For professional users and production environments, we highly recommend considering these premium options to enhance performance and reliability.", " https://rxdb.info/premium?console=dexie ", "If you already purchased premium access you can disable this log by calling the setPremiumFlag() function from rxdb-premium/plugins/shared.", "---------------------------------------------------------------------"].join(`
`)), Es = !0, n.forEach((v) => {
      if (!v.document._rev || v.previous && !v.previous._rev)
        throw $("SNH", {
          args: {
            row: v
          }
        });
    });
    var s = await this.internals, u = {
      error: []
    };
    this.devMode && (n = n.map((v) => {
      var _ = xa(v.document);
      return {
        previous: v.previous,
        document: _
      };
    }));
    var l = n.map((v) => v.document[this.primaryPath]), d;
    if (await s.dexieDb.transaction("rw", s.dexieTable, s.dexieAttachmentsTable, async () => {
      var v = /* @__PURE__ */ new Map(), _ = await fc(this.internals, l);
      _.forEach((M) => {
        var B = M;
        return B && v.set(B[this.primaryPath], B), B;
      }), d = iy(this, this.primaryPath, v, n, i), u.error = d.errors;
      var C = [];
      d.bulkInsertDocs.forEach((M) => {
        C.push(M.document);
      }), d.bulkUpdateDocs.forEach((M) => {
        C.push(M.document);
      }), C = C.map((M) => Kg(s.booleanIndexes, M)), C.length > 0 && await s.dexieTable.bulkPut(C);
      var I = [];
      d.attachmentsAdd.forEach((M) => {
        I.push({
          id: Ui(M.documentId, M.attachmentId),
          data: M.attachmentData.data
        });
      }), d.attachmentsUpdate.forEach((M) => {
        I.push({
          id: Ui(M.documentId, M.attachmentId),
          data: M.attachmentData.data
        });
      }), await s.dexieAttachmentsTable.bulkPut(I), await s.dexieAttachmentsTable.bulkDelete(d.attachmentsRemove.map((M) => Ui(M.documentId, M.attachmentId)));
    }), d = ke(d), d.eventBulk.events.length > 0) {
      var m = ke(d.newestRow).document;
      d.eventBulk.checkpoint = {
        id: m[this.primaryPath],
        lwt: m._meta.lwt
      }, d.eventBulk.endTime = rt(), this.changes$.next(d.eventBulk);
    }
    return u;
  }, t.findDocumentsById = async function(n, i) {
    gr(this);
    var s = await this.internals, u = [];
    return await s.dexieDb.transaction("r", s.dexieTable, async () => {
      var l = await fc(this.internals, n);
      l.forEach((d) => {
        d && (!d._deleted || i) && u.push(d);
      });
    }), u;
  }, t.query = function(n) {
    return gr(this), pc(this, n);
  }, t.count = async function(n) {
    if (n.queryPlan.selectorSatisfiedByIndex) {
      var i = await zg(this, n);
      return {
        count: i,
        mode: "fast"
      };
    } else {
      var s = await pc(this, n);
      return {
        count: s.documents.length,
        mode: "slow"
      };
    }
  }, t.changeStream = function() {
    return gr(this), this.changes$.asObservable();
  }, t.cleanup = async function(n) {
    gr(this);
    var i = await this.internals;
    return await i.dexieDb.transaction("rw", i.dexieTable, async () => {
      var s = rt() - n, u = await i.dexieTable.where("_meta.lwt").below(s).toArray(), l = [];
      u.forEach((d) => {
        d._deleted === "1" && l.push(d[this.primaryPath]);
      }), await i.dexieTable.bulkDelete(l);
    }), !0;
  }, t.getAttachmentData = async function(n, i, s) {
    gr(this);
    var u = await this.internals, l = Ui(n, i);
    return await u.dexieDb.transaction("r", u.dexieAttachmentsTable, async () => {
      var d = await u.dexieAttachmentsTable.get(l);
      if (d)
        return d.data;
      throw new Error("attachment missing documentId: " + n + " attachmentId: " + i);
    });
  }, t.remove = async function() {
    gr(this);
    var n = await this.internals;
    return await n.dexieTable.clear(), this.close();
  }, t.close = function() {
    return this.closed ? this.closed : (this.closed = (async () => {
      this.changes$.complete(), await Fg(this.internals);
    })(), this.closed);
  }, t.conflictResultionTasks = function() {
    return new rr();
  }, t.resolveConflictResultionTask = async function(n) {
  }, e;
}();
async function Zg(e, t, r) {
  var n = qg(t.databaseName, t.collectionName, r, t.schema), i = new Hg(e, t.databaseName, t.collectionName, t.schema, n, t.options, r, t.devMode);
  return await Bg(ff, t, i), Promise.resolve(i);
}
function gr(e) {
  if (e.closed)
    throw new Error("RxStorageInstanceDexie is closed " + e.databaseName + "-" + e.collectionName);
}
var Qg = /* @__PURE__ */ function() {
  function e(r) {
    this.name = ff, this.rxdbVersion = lo, this.settings = r;
  }
  var t = e.prototype;
  return t.createStorageInstance = function(n) {
    return oy(n), Zg(this, n, this.settings);
  }, e;
}();
function Gg(e = {}) {
  var t = new Qg(e);
  return t;
}
function Qb(e, t, r = "id") {
  return {
    name: e,
    schema: t,
    key: r
  };
}
function mc(e) {
  const t = {}, r = [], n = e.schema.shape;
  if (n)
    for (const i in n) {
      const s = n[i];
      s instanceof tt ? t[i] = { type: "string", maxLength: 100 } : s instanceof Mt ? t[i] = { type: "number" } : s instanceof en && (t[i] = { type: "boolean" }), s.isOptional() || r.push(i);
    }
  return {
    version: 0,
    primaryKey: e.key || "id",
    type: "object",
    properties: t,
    required: r
  };
}
var vc = {
  // util.js / config
  UT1: "given name is no string or empty",
  UT2: `collection- and database-names must match the regex to be compatible with couchdb databases.
    See https://neighbourhood.ie/blog/2020/10/13/everything-you-need-to-know-about-couchdb-database-names/
    info: if your database-name specifies a folder, the name must contain the slash-char '/' or '\\'`,
  UT3: "replication-direction must either be push or pull or both. But not none",
  UT4: "given leveldown is no valid adapter",
  UT5: "keyCompression is set to true in the schema but no key-compression handler is used in the storage",
  UT6: "schema contains encrypted fields but no encryption handler is used in the storage",
  UT7: "attachments.compression is enabled but no attachment-compression plugin is used",
  // plugins
  PL1: "Given plugin is not RxDB plugin.",
  // removed in 14.0.0 - PouchDB RxStorage was removed - PL2: 'You tried importing a RxDB plugin to pouchdb. Use addRxPlugin() instead.',
  PL3: "A plugin with the same name was already added but it was not the exact same JavaScript object",
  // pouch-db.js
  // removed in 12.0.0 - P1: 'PouchDB.getBatch: limit must be > 2',
  P2: "bulkWrite() cannot be called with an empty array",
  // removed in 12.0.0 - P3: 'bulkAddRevisions cannot be called with an empty array',
  // rx-query
  QU1: "RxQuery._execOverDatabase(): op not known",
  // removed in 9.0.0 - QU2: 'limit() must get a number',
  // removed in 9.0.0 - QU3: 'skip() must get a number',
  QU4: "RxQuery.regex(): You cannot use .regex() on the primary field",
  QU5: "RxQuery.sort(): does not work because key is not defined in the schema",
  QU6: "RxQuery.limit(): cannot be called on .findOne()",
  // removed in 12.0.0 (should by ensured by the typings) - QU7: 'query must be an object',
  // removed in 12.0.0 (should by ensured by the typings) - QU8: 'query cannot be an array',
  QU9: "throwIfMissing can only be used in findOne queries",
  QU10: "result empty and throwIfMissing: true",
  QU11: "RxQuery: no valid query params given",
  QU12: "Given index is not in schema",
  QU13: "A top level field of the query is not included in the schema",
  QU14: "Running a count() query in slow mode is now allowed. Either run a count() query with a selector that fully matches an index or set allowSlowCount=true when calling the createRxDatabase",
  QU15: "For count queries it is not allowed to use skip or limit",
  QU16: "$regex queries must be defined by a string, not an RegExp instance. This is because RegExp objects cannot be JSON stringified and also they are mutable which would be dangerous",
  QU17: "Chained queries cannot be used on findByIds() RxQuery instances",
  QU18: "Malformated query result data. This likely happens because you create a OPFS-storage RxDatabase inside of a worker but did not set the usesRxDatabaseInWorker setting. https://rxdb.info/rx-storage-opfs.html#setting-usesrxdatabaseinworker-when-a-rxdatabase-is-also-used-inside-of-the-worker ",
  // mquery.js
  MQ1: "path must be a string or object",
  MQ2: "Invalid argument",
  MQ3: "Invalid sort() argument. Must be a string, object, or array",
  MQ4: "Invalid argument. Expected instanceof mquery or plain object",
  MQ5: "method must be used after where() when called with these arguments",
  MQ6: "Can't mix sort syntaxes. Use either array or object | .sort([['field', 1], ['test', -1]]) | .sort({ field: 1, test: -1 })",
  MQ7: "Invalid sort value",
  MQ8: "Can't mix sort syntaxes. Use either array or object",
  // rx-database
  DB1: "RxDocument.prepare(): another instance on this adapter has a different password",
  DB2: "RxDatabase.addCollections(): collection-names cannot start with underscore _",
  DB3: "RxDatabase.addCollections(): collection already exists. use myDatabase[collectionName] to get it",
  DB4: "RxDatabase.addCollections(): schema is missing",
  DB5: "RxDatabase.addCollections(): collection-name not allowed",
  DB6: "RxDatabase.addCollections(): another instance created this collection with a different schema. Read this https://rxdb.info/questions-answers.html?console=qa#cant-change-the-schema ",
  // removed in 13.0.0 (now part of the encryption plugin) DB7: 'RxDatabase.addCollections(): schema encrypted but no password given',
  DB8: `createRxDatabase(): A RxDatabase with the same name and adapter already exists.
Make sure to use this combination only once or set ignoreDuplicate to true if you do this intentional-
This often happens in react projects with hot reload that reloads the code without reloading the process.`,
  // removed in 14.0.0 - PouchDB RxStorage is removed - DB9: 'createRxDatabase(): Adapter not added. Use addPouchPlugin(require(\'pouchdb-adapter-[adaptername]\'));',
  // removed in 14.0.0 - PouchDB RxStorage is removed DB10: 'createRxDatabase(): To use leveldown-adapters, you have to add the leveldb-plugin. Use addPouchPlugin(require(\'pouchdb-adapter-leveldb\'));',
  DB11: "createRxDatabase(): Invalid db-name, folder-paths must not have an ending slash",
  DB12: "RxDatabase.addCollections(): could not write to internal store",
  DB13: "createRxDatabase(): Invalid db-name or collection name, name contains the dollar sign",
  DB14: "no custom reactivity factory added on database creation",
  // rx-collection
  COL1: "RxDocument.insert() You cannot insert an existing document",
  COL2: "RxCollection.insert() fieldName ._id can only be used as primaryKey",
  COL3: "RxCollection.upsert() does not work without primary",
  COL4: "RxCollection.incrementalUpsert() does not work without primary",
  COL5: "RxCollection.find() if you want to search by _id, use .findOne(_id)",
  COL6: "RxCollection.findOne() needs a queryObject or string",
  COL7: "hook must be a function",
  COL8: "hooks-when not known",
  COL9: "RxCollection.addHook() hook-name not known",
  COL10: "RxCollection .postCreate-hooks cannot be async",
  COL11: "migrationStrategies must be an object",
  COL12: "A migrationStrategy is missing or too much",
  COL13: "migrationStrategy must be a function",
  COL14: "given static method-name is not a string",
  COL15: "static method-names cannot start with underscore _",
  COL16: "given static method is not a function",
  COL17: "RxCollection.ORM: statics-name not allowed",
  COL18: "collection-method not allowed because fieldname is in the schema",
  // removed in 14.0.0, use CONFLICT instead - COL19: 'Document update conflict. When changing a document you must work on the previous revision',
  COL20: "Storage write error",
  COL21: "The RxCollection is destroyed or removed already, either from this JavaScript realm or from another, like a browser tab",
  CONFLICT: "Document update conflict. When changing a document you must work on the previous revision",
  COL22: ".bulkInsert() and .bulkUpsert() cannot be run with multiple documents that have the same primary key",
  // rx-document.js
  DOC1: "RxDocument.get$ cannot get observable of in-array fields because order cannot be guessed",
  DOC2: "cannot observe primary path",
  DOC3: "final fields cannot be observed",
  DOC4: "RxDocument.get$ cannot observe a non-existed field",
  DOC5: "RxDocument.populate() cannot populate a non-existed field",
  DOC6: "RxDocument.populate() cannot populate because path has no ref",
  DOC7: "RxDocument.populate() ref-collection not in database",
  DOC8: "RxDocument.set(): primary-key cannot be modified",
  DOC9: "final fields cannot be modified",
  DOC10: "RxDocument.set(): cannot set childpath when rootPath not selected",
  DOC11: "RxDocument.save(): can't save deleted document",
  // removed in 10.0.0 DOC12: 'RxDocument.save(): error',
  DOC13: "RxDocument.remove(): Document is already deleted",
  DOC14: "RxDocument.destroy() does not exist",
  DOC15: "query cannot be an array",
  DOC16: "Since version 8.0.0 RxDocument.set() can only be called on temporary RxDocuments",
  DOC17: "Since version 8.0.0 RxDocument.save() can only be called on non-temporary documents",
  DOC18: "Document property for composed primary key is missing",
  DOC19: "Value of primary key(s) cannot be changed",
  DOC20: "PrimaryKey missing",
  DOC21: "PrimaryKey must be equal to PrimaryKey.trim(). It cannot start or end with a whitespace",
  DOC22: "PrimaryKey must not contain a linebreak",
  DOC23: 'PrimaryKey must not contain a double-quote ["]',
  DOC24: "Given document data could not be structured cloned. This happens if you pass non-plain-json data into it, like a Date() object or a Function. In vue.js this happens if you use ref() on the document data which transforms it into a Proxy object.",
  // data-migrator.js
  DM1: "migrate() Migration has already run",
  DM2: "migration of document failed final document does not match final schema",
  DM3: "migration already running",
  DM4: "Migration errored",
  DM5: "Cannot open database state with newer RxDB version. You have to migrate your database state first. See https://rxdb.info/migration-storage.html?console=storage ",
  // plugins/attachments.js
  AT1: "to use attachments, please define this in your schema",
  // plugins/encryption-crypto-js.js
  EN1: "password is not valid",
  EN2: "validatePassword: min-length of password not complied",
  EN3: "Schema contains encrypted properties but no password is given",
  EN4: "Password not valid",
  // plugins/json-dump.js
  JD1: "You must create the collections before you can import their data",
  JD2: "RxCollection.importJSON(): the imported json relies on a different schema",
  JD3: "RxCollection.importJSON(): json.passwordHash does not match the own",
  // plugins/leader-election.js
  // plugins/local-documents.js
  LD1: "RxDocument.allAttachments$ can't use attachments on local documents",
  LD2: "RxDocument.get(): objPath must be a string",
  LD3: "RxDocument.get$ cannot get observable of in-array fields because order cannot be guessed",
  LD4: "cannot observe primary path",
  LD5: "RxDocument.set() id cannot be modified",
  LD6: "LocalDocument: Function is not usable on local documents",
  LD7: "Local document already exists",
  LD8: "localDocuments not activated. Set localDocuments=true on creation, when you want to store local documents on the RxDatabase or RxCollection.",
  // plugins/replication.js
  RC1: "Replication: already added",
  RC2: "replicateCouchDB() query must be from the same RxCollection",
  // removed in 14.0.0 - PouchDB RxStorage is removed RC3: 'RxCollection.syncCouchDB() Do not use a collection\'s pouchdb as remote, use the collection instead',
  RC4: "RxCouchDBReplicationState.awaitInitialReplication() cannot await initial replication when live: true",
  RC5: "RxCouchDBReplicationState.awaitInitialReplication() cannot await initial replication if multiInstance because the replication might run on another instance",
  RC6: "syncFirestore() serverTimestampField MUST NOT be part of the collections schema and MUST NOT be nested.",
  RC7: "SimplePeer requires to have process.nextTick() polyfilled, see https://rxdb.info/replication-webrtc.html?console=webrtc ",
  RC_PULL: "RxReplication pull handler threw an error - see .errors for more details",
  RC_STREAM: "RxReplication pull stream$ threw an error - see .errors for more details",
  RC_PUSH: "RxReplication push handler threw an error - see .errors for more details",
  RC_PUSH_NO_AR: "RxReplication push handler did not return an array with the conflicts",
  RC_WEBRTC_PEER: "RxReplication WebRTC Peer has error",
  RC_COUCHDB_1: "replicateCouchDB() url must end with a slash like 'https://example.com/mydatabase/'",
  RC_COUCHDB_2: "replicateCouchDB() did not get valid result with rows.",
  RC_OUTDATED: "Outdated client, update required. Replication was canceled",
  RC_UNAUTHORIZED: "Unauthorized client, update the replicationState.headers to set correct auth data",
  RC_FORBIDDEN: "Client behaves wrong so the replication was canceled. Mostly happens if the client tries to write data that it is not allowed to",
  // plugins/dev-mode/check-schema.js
  SC1: "fieldnames do not match the regex",
  SC2: "SchemaCheck: name 'item' reserved for array-fields",
  SC3: "SchemaCheck: fieldname has a ref-array but items-type is not string",
  SC4: "SchemaCheck: fieldname has a ref but is not type string, [string,null] or array<string>",
  SC6: "SchemaCheck: primary can only be defined at top-level",
  SC7: "SchemaCheck: default-values can only be defined at top-level",
  SC8: "SchemaCheck: first level-fields cannot start with underscore _",
  SC10: "SchemaCheck: schema defines ._rev, this will be done automatically",
  SC11: "SchemaCheck: schema needs a number >=0 as version",
  // removed in 10.0.0 - SC12: 'SchemaCheck: primary can only be defined once',
  SC13: "SchemaCheck: primary is always index, do not declare it as index",
  SC14: "SchemaCheck: primary is always unique, do not declare it as index",
  SC15: "SchemaCheck: primary cannot be encrypted",
  SC16: "SchemaCheck: primary must have type: string",
  SC17: "SchemaCheck: top-level fieldname is not allowed",
  SC18: "SchemaCheck: indexes must be an array",
  SC19: "SchemaCheck: indexes must contain strings or arrays of strings",
  SC20: "SchemaCheck: indexes.array must contain strings",
  SC21: "SchemaCheck: given index is not defined in schema",
  SC22: "SchemaCheck: given indexKey is not type:string",
  SC23: "SchemaCheck: fieldname is not allowed",
  SC24: "SchemaCheck: required fields must be set via array. See https://spacetelescope.github.io/understanding-json-schema/reference/object.html#required",
  SC25: "SchemaCheck: compoundIndexes needs to be specified in the indexes field",
  SC26: "SchemaCheck: indexes needs to be specified at collection schema level",
  SC27: "SchemaCheck: encrypted fields need to be specified at collection schema level",
  SC28: "SchemaCheck: encrypted fields is not defined in the schema",
  SC29: "SchemaCheck: missing object key 'properties'",
  SC30: "SchemaCheck: primaryKey is required",
  SC32: "SchemaCheck: primary field must have the type string/number/integer",
  SC33: "SchemaCheck: used primary key is not a property in the schema",
  SC34: "Fields of type string that are used in an index, must have set the maxLength attribute in the schema",
  SC35: "Fields of type number/integer that are used in an index, must have set the multipleOf attribute in the schema",
  SC36: "A field of this type cannot be used as index",
  SC37: "Fields of type number that are used in an index, must have set the minimum and maximum attribute in the schema",
  SC38: "Fields of type boolean that are used in an index, must be required in the schema",
  SC39: "The primary key must have the maxLength attribute set",
  SC40: "$ref fields in the schema are not allowed. RxDB cannot resolve related schemas because it would have a negative performance impact.It would have to run http requests on runtime. $ref fields should be resolved during build time.",
  SC41: "minimum, maximum and maxLength values for indexes must be real numbers, not Infinity or -Infinity",
  // plugins/dev-mode
  // removed in 13.9.0, use PL3 instead - DEV1: 'dev-mode added multiple times',
  // plugins/validate.js
  VD1: "Sub-schema not found, does the schemaPath exists in your schema?",
  VD2: "object does not match schema",
  // plugins/in-memory.js
  // removed in 14.0.0 - PouchDB RxStorage is removed IM1: 'InMemory: Memory-Adapter must be added. Use addPouchPlugin(require(\'pouchdb-adapter-memory\'));',
  // removed in 14.0.0 - PouchDB RxStorage is removed IM2: 'inMemoryCollection.sync(): Do not replicate with the in-memory instance. Replicate with the parent instead',
  // plugins/server.js
  S1: "You cannot create collections after calling RxDatabase.server()",
  // plugins/replication-graphql.js
  GQL1: "GraphQL replication: cannot find sub schema by key",
  // removed in 13.0.0, use RC_PULL instead - GQL2: 'GraphQL replication: unknown errors occurred in replication pull - see innerErrors for more details',
  GQL3: "GraphQL replication: pull returns more documents then batchSize",
  // removed in 13.0.0, use RC_PUSH instead - GQL4: 'GraphQL replication: unknown errors occurred in replication push - see innerErrors for more details',
  // plugins/crdt/
  CRDT1: "CRDT operations cannot be used because the crdt options are not set in the schema.",
  CRDT2: "RxDocument.incrementalModify() cannot be used when CRDTs are activated.",
  CRDT3: "To use CRDTs you MUST NOT set a conflictHandler because the default CRDT conflict handler must be used",
  // plugins/storage-dexie/
  // removed in 15.0.0, added boolean index support to dexie storage - DXE1: 'The dexie.js RxStorage does not support boolean indexes, see https://rxdb.info/rx-storage-dexie.html#boolean-index',
  /**
   * Should never be thrown, use this for
   * null checks etc. so you do not have to increase the
   * build size with error message strings.
   */
  SNH: "This should never happen"
}, Cs;
function Yg() {
  if (!Cs) {
    var e = new Po(), t = Object.getOwnPropertyNames(e), r = Object.getOwnPropertyNames(Object.getPrototypeOf(e));
    Cs = [...t, ...r];
  }
  return Cs;
}
var Rs;
function Jg() {
  if (!Rs) {
    var e = new Ao("pseudoInstance", "memory"), t = Object.getOwnPropertyNames(e), r = Object.getOwnPropertyNames(Object.getPrototypeOf(e));
    Rs = [...t, ...r], e.destroy();
  }
  return Rs;
}
var Xg = ql(di), eb = new Xg(), Ds;
function mf() {
  if (!Ds) {
    var e = ["deleted", "synced"], t = Object.getOwnPropertyNames(eb), r = Object.getOwnPropertyNames(di);
    Ds = [...t, ...r, ...e];
  }
  return Ds;
}
function tb(e) {
  if (e !== "_deleted") {
    if (["properties"].includes(e))
      throw $("SC23", {
        fieldName: e
      });
    var t = "^[a-zA-Z](?:[[a-zA-Z0-9_]*]?[a-zA-Z0-9])?$", r = new RegExp(t);
    if (
      /**
       * It must be allowed to set _id as primaryKey.
       * This makes it sometimes easier to work with RxDB+CouchDB
       * @link https://github.com/pubkey/rxdb/issues/681
       */
      e !== "_id" && !e.match(r)
    )
      throw $("SC1", {
        regex: t,
        fieldName: e
      });
  }
}
function rb(e) {
  var t = kt(e.primaryKey);
  function r(i, s, u) {
    if (typeof i == "string" && typeof s == "object" && !Array.isArray(s) && u.split(".").pop() !== "patternProperties" && tb(i), Object.prototype.hasOwnProperty.call(s, "item") && s.type !== "array")
      throw $("SC2", {
        fieldName: i
      });
    if (Object.prototype.hasOwnProperty.call(s, "required") && typeof s.required == "boolean")
      throw $("SC24", {
        fieldName: i
      });
    if (Object.prototype.hasOwnProperty.call(s, "$ref"))
      throw $("SC40", {
        fieldName: i
      });
    if (Object.prototype.hasOwnProperty.call(s, "ref"))
      if (Array.isArray(s.type)) {
        if (s.type.length > 2 || !s.type.includes("string") || !s.type.includes("null"))
          throw $("SC4", {
            fieldName: i
          });
      } else
        switch (s.type) {
          case "string":
            break;
          case "array":
            if (!s.items || !s.items.type || s.items.type !== "string")
              throw $("SC3", {
                fieldName: i
              });
            break;
          default:
            throw $("SC4", {
              fieldName: i
            });
        }
    var l = u.split(".").length >= 2;
    if (l && s.default)
      throw $("SC7", {
        path: u
      });
    if (!l) {
      if (i === "_id" && t !== "_id")
        throw $("COL2", {
          fieldName: i
        });
      if (i.charAt(0) === "_") {
        if (
          // exceptional allow underscore on these fields.
          i === "_id" || i === "_deleted"
        )
          return;
        throw $("SC8", {
          fieldName: i
        });
      }
    }
  }
  function n(i, s) {
    !i || typeof i != "object" || Object.keys(i).forEach((u) => {
      var l = i[u];
      !i.properties && l && typeof l == "object" && !Array.isArray(i) && r(u, l, s);
      var d = s;
      u !== "properties" && (d = d + "." + u), n(l, d);
    });
  }
  return n(e, ""), !0;
}
function nb(e) {
  if (!e.primaryKey)
    throw $("SC30", {
      schema: e
    });
  function t(d) {
    if (!d)
      throw $("SC33", {
        schema: e
      });
    var m = d.type;
    if (!m || !["string", "number", "integer"].includes(m))
      throw $("SC32", {
        schema: e,
        args: {
          schemaPart: d
        }
      });
  }
  if (typeof e.primaryKey == "string") {
    var r = e.primaryKey, n = e.properties[r];
    t(n);
  } else {
    var i = e.primaryKey, s = Bt(e, i.key);
    t(s), i.fields.forEach((d) => {
      var m = Bt(e, d);
      t(m);
    });
  }
  var u = kt(e.primaryKey), l = e.properties[u];
  if (l.maxLength) {
    if (!isFinite(l.maxLength))
      throw $("SC41", {
        schema: e,
        args: {
          primaryPathSchemaPart: l
        }
      });
  } else throw $("SC39", {
    schema: e,
    args: {
      primaryPathSchemaPart: l
    }
  });
}
function yc(e) {
  for (var t = e.split("."), r = "", n = 0; n < t.length; n += 1)
    t[n] !== "[]" ? r = r.concat(".properties.".concat(t[n])) : r = r.concat(".items");
  return Gt(r);
}
function ib(e) {
  if (!e.primaryKey)
    throw $("SC30", {
      schema: e
    });
  if (!Object.prototype.hasOwnProperty.call(e, "properties"))
    throw $("SC29", {
      schema: e
    });
  if (e.properties._rev)
    throw $("SC10", {
      schema: e
    });
  if (!Object.prototype.hasOwnProperty.call(e, "version") || typeof e.version != "number" || e.version < 0)
    throw $("SC11", {
      version: e.version
    });
  if (rb(e), nb(e), Object.keys(e.properties).forEach((t) => {
    var r = e.properties[t];
    if (t === e.primaryKey) {
      if (e.indexes && e.indexes.includes(t))
        throw $("SC13", {
          value: r,
          schema: e
        });
      if (r.unique)
        throw $("SC14", {
          value: r,
          schema: e
        });
      if (e.encrypted && e.encrypted.includes(t))
        throw $("SC15", {
          value: r,
          schema: e
        });
      if (r.type !== "string")
        throw $("SC16", {
          value: r,
          schema: e
        });
    }
    if (mf().includes(t))
      throw $("SC17", {
        key: t,
        schema: e
      });
  }), e.indexes) {
    if (!Zr(e.indexes))
      throw $("SC18", {
        indexes: e.indexes,
        schema: e
      });
    e.indexes.forEach((t) => {
      if (!(typeof t == "string" || Array.isArray(t)))
        throw $("SC19", {
          index: t,
          schema: e
        });
      if (Array.isArray(t)) {
        for (var r = 0; r < t.length; r += 1)
          if (typeof t[r] != "string")
            throw $("SC20", {
              index: t,
              schema: e
            });
      }
      var n = Zr(t) ? t : [t];
      n.forEach((i) => {
        var s = Bt(e, i), u = s.type;
        switch (u) {
          case "string":
            var l = s.maxLength;
            if (!l)
              throw $("SC34", {
                index: t,
                field: i,
                schema: e
              });
            break;
          case "number":
          case "integer":
            var d = s.multipleOf;
            if (!d)
              throw $("SC35", {
                index: t,
                field: i,
                schema: e
              });
            var m = s.maximum, v = s.minimum;
            if (typeof m > "u" || typeof v > "u")
              throw $("SC37", {
                index: t,
                field: i,
                schema: e
              });
            if (!isFinite(m) || !isFinite(v))
              throw $("SC41", {
                index: t,
                field: i,
                schema: e
              });
            break;
          case "boolean":
            var _ = "", C = i;
            if (i.includes(".")) {
              var I = i.split(".");
              C = I.pop(), _ = I.join(".");
            }
            var M = _ === "" ? e : Bt(e, _);
            if (!M.required || !M.required.includes(C))
              throw $("SC38", {
                index: t,
                field: i,
                schema: e
              });
            break;
          default:
            throw $("SC36", {
              fieldName: i,
              type: s.type,
              schema: e
            });
        }
      });
    });
  }
  Object.keys(Bs(e)).map((t) => {
    var r = t.split(".");
    return r.pop(), r.join(".");
  }).filter((t) => t !== "").filter((t, r, n) => n.indexOf(t) === r).filter((t) => {
    var r = gt(e, t);
    return r && !!r.index;
  }).forEach((t) => {
    throw t = t.replace("properties.", ""), t = t.replace(/\.properties\./g, "."), $("SC26", {
      index: Gt(t),
      schema: e
    });
  }), (e.indexes || []).reduce((t, r) => (Zr(r) ? nn(t, r) : t.push(r), t), []).filter((t, r, n) => n.indexOf(t) === r).map((t) => {
    var r = yc(t), n = gt(e, r);
    if (!n || typeof n != "object")
      throw $("SC21", {
        index: t,
        schema: e
      });
    return {
      indexPath: t,
      schemaObj: n
    };
  }).filter((t) => t.schemaObj.type !== "string" && t.schemaObj.type !== "integer" && t.schemaObj.type !== "number" && t.schemaObj.type !== "boolean").forEach((t) => {
    throw $("SC22", {
      key: t.indexPath,
      type: t.schemaObj.type,
      schema: e
    });
  }), Object.keys(Bs(e)).map((t) => {
    var r = t.split(".");
    return r.pop(), r.join(".");
  }).filter((t) => t !== "" && t !== "attachments").filter((t, r, n) => n.indexOf(t) === r).filter((t) => {
    var r = gt(e, t);
    return r && !!r.encrypted;
  }).forEach((t) => {
    throw t = t.replace("properties.", ""), t = t.replace(/\.properties\./g, "."), $("SC27", {
      index: Gt(t),
      schema: e
    });
  }), e.encrypted && e.encrypted.forEach((t) => {
    var r = yc(t), n = gt(e, r);
    if (!n || typeof n != "object")
      throw $("SC28", {
        field: t,
        schema: e
      });
  });
}
function Is(e) {
  e && Object.entries(e).forEach(([t, r]) => {
    if (typeof t != "string")
      throw nt("COL14", {
        name: t
      });
    if (t.startsWith("_"))
      throw nt("COL15", {
        name: t
      });
    if (typeof r != "function")
      throw nt("COL16", {
        name: t,
        type: typeof t
      });
    if (Yg().includes(t) || mf().includes(t))
      throw $("COL17", {
        name: t
      });
  });
}
function ab(e, t) {
  var r = Object.keys(e.properties);
  t && Object.keys(t).filter((n) => r.includes(n)).forEach((n) => {
    throw $("COL18", {
      funName: n
    });
  });
}
function sb(e, t) {
  if (typeof t != "object" || Array.isArray(t))
    throw nt("COL11", {
      schema: e
    });
  var r = zh(e);
  if (r.length !== Object.keys(t).length)
    throw $("COL12", {
      have: Object.keys(t),
      should: r
    });
  return r.map((n) => ({
    v: n,
    s: t[n + 1]
  })).filter((n) => typeof n.s != "function").forEach((n) => {
    throw nt("COL13", {
      version: n.v,
      type: typeof n,
      schema: e
    });
  }), !0;
}
function ob(e) {
  if (Jg().includes(e.name))
    throw $("DB5", {
      name: e.name
    });
  yf(e.name);
}
function ub(e) {
  if (yf(e.name), e.name.includes("$"))
    throw $("DB13", {
      name: e.name
    });
  if (Tc(e.name) && (e.name.endsWith("/") || e.name.endsWith("\\")))
    throw $("DB11", {
      name: e.name
    });
}
var vf = "^[a-z][_$a-z0-9\\-]*$", cb = new RegExp(vf);
function yf(e) {
  if (typeof e != "string" || e.length === 0)
    throw nt("UT1", {
      name: e
    });
  if (Tc(e))
    return !0;
  if (!e.match(cb) && /**
   * The string ':memory:' is used in the SQLite RxStorage
   * to persist data into a memory state. Often used in tests.
   */
  e !== ":memory:")
    throw $("UT2", {
      regex: vf,
      givenName: e
    });
  return !0;
}
function lb(e) {
  var t = Object.prototype.toString.call(e.queryObj) === "[object Object]";
  if (!t)
    throw nt("QU11", {
      op: e.op,
      collection: e.collection.name,
      queryObj: e.queryObj
    });
  var r = ["selector", "limit", "skip", "sort", "index"];
  if (Object.keys(e.queryObj).forEach((n) => {
    if (!r.includes(n))
      throw nt("QU11", {
        op: e.op,
        collection: e.collection.name,
        queryObj: e.queryObj,
        key: n,
        args: {
          validKeys: r
        }
      });
  }), e.op === "count" && (e.queryObj.limit || e.queryObj.skip))
    throw $("QU15", {
      collection: e.collection.name,
      query: e.queryObj
    });
  la(e.queryObj);
}
function fb(e) {
  var t = e.rxQuery.collection.schema.jsonSchema, r = e.mangoQuery.selector, n = Object.keys(t.properties);
  Object.keys(r).filter((l) => !l.startsWith("$")).filter((l) => !l.includes(".")).forEach((l) => {
    if (!n.includes(l))
      throw $("QU13", {
        schema: t,
        field: l,
        query: e.mangoQuery
      });
  });
  var i = t.indexes ? t.indexes : [], s = e.mangoQuery.index;
  if (s) {
    var u = i.find((l) => Xn(l, s));
    if (!u)
      throw $("QU12", {
        collection: e.rxQuery.collection.name,
        query: e.mangoQuery,
        schema: t
      });
  }
  if (e.rxQuery.op === "count" && !db(e.rxQuery.collection.schema.jsonSchema, e.mangoQuery) && !e.rxQuery.collection.database.allowSlowCount)
    throw $("QU14", {
      collection: e.rxQuery.collection,
      query: e.mangoQuery
    });
  e.mangoQuery.sort && e.mangoQuery.sort.map((l) => Object.keys(l)[0]).filter((l) => !l.includes(".")).forEach((l) => {
    if (!n.includes(l))
      throw $("QU13", {
        schema: t,
        field: l,
        query: e.mangoQuery
      });
  }), la(e.mangoQuery);
}
function db(e, t) {
  var r = Ro(e, t);
  return r.queryPlan.selectorSatisfiedByIndex;
}
function la(e) {
  if (!(typeof e != "object" || e === null)) {
    var t = Object.keys(e);
    t.forEach((r) => {
      var n = e[r];
      if (n instanceof RegExp)
        throw $("QU16", {
          field: r,
          query: e
        });
      Array.isArray(n) ? n.forEach((i) => la(i)) : la(n);
    });
  }
}
function hb(e, t) {
  if (!e)
    throw $("DOC20", {
      primaryKey: e,
      document: t
    });
  if (e !== e.trim())
    throw $("DOC21", {
      primaryKey: e,
      document: t
    });
  if (e.includes("\r") || e.includes(`
`))
    throw $("DOC22", {
      primaryKey: e,
      document: t
    });
  if (e.includes('"'))
    throw $("DOC23", {
      primaryKey: e,
      document: t
    });
}
function gf(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t in e)
    if (e.hasOwnProperty(t) && (e[t] instanceof Date || typeof e[t] == "object" && gf(e[t])))
      return !0;
  return !1;
}
function pb(e, t) {
  var r = kt(e.schema.primaryKey), n = function(s) {
    s.document = Uc(r, e.schema, s.document), s.previous && Object.keys(s.previous._meta).forEach((u) => {
      if (!Object.prototype.hasOwnProperty.call(s.document._meta, u))
        throw $("SNH", {
          dataBefore: s.previous,
          dataAfter: s.document,
          args: {
            metaFieldName: u
          }
        });
    });
    try {
      typeof structuredClone == "function" ? structuredClone(s) : JSON.parse(JSON.stringify(s));
    } catch {
      throw $("DOC24", {
        collection: e.collectionName,
        document: s.document
      });
    }
    if (gf(s.document))
      throw $("DOC24", {
        collection: e.collectionName,
        document: s.document
      });
  };
  for (var i of t)
    n(i);
}
var gc = !1;
async function mb(e) {
  if (!(gc || typeof window > "u" || typeof location > "u") && !(Qr.premium && typeof Qr.premium == "string" && await co(Qr.premium) === $c)) {
    gc = !0;
    var t = document.createElement("iframe");
    t.style.visibility = "hidden", t.width = "1px", t.height = "1px", t.style.position = "absolute", t.style.top = "0", t.style.left = "0", t.style.opacity = "0.1", t.src = "https://rxdb.info/html/dev-mode-iframe.html?version=" + lo, document.body.appendChild(t);
  }
}
function vb(e) {
  return !e || typeof e == "string" || typeof e == "number" ? e : Dc(e);
}
var yb = "dev-mode", gb = {
  name: yb,
  rxdb: !0,
  init: () => {
    console.warn([
      "-------------- RxDB dev-mode warning -------------------------------",
      "you are seeing this because you use the RxDB dev-mode plugin https://rxdb.info/dev-mode.html?console=dev-mode ",
      "This is great in development mode, because it will run many checks to ensure",
      "that you use RxDB correct. If you see this in production mode,",
      "you did something wrong because the dev-mode plugin will decrease the performance.",
      "",
      "🤗 Hint: To get the most out of RxDB, check out the Premium Plugins",
      "to get access to faster storages and more professional features: https://rxdb.info/premium?console=dev-mode ",
      "",
      "You can disable this warning by calling disableWarnings() from the dev-mode plugin.",
      // '',
      // 'Also take part in the RxDB User Survey: https://rxdb.info/survey.html',
      "---------------------------------------------------------------------"
    ].join(`
`));
  },
  overwritable: {
    isDevMode() {
      return !0;
    },
    deepFreezeWhenDevMode: vb,
    tunnelErrorMessage(e) {
      if (!vc[e])
        throw console.error("RxDB: Error-Code not known: " + e), new Error("Error-Code " + e + " not known, contact the maintainer");
      return vc[e];
    }
  },
  hooks: {
    preCreateRxSchema: {
      after: ib
    },
    preCreateRxDatabase: {
      after: function(e) {
        ub(e);
      }
    },
    createRxDatabase: {
      after: async function(e) {
        mb(e.database);
      }
    },
    preCreateRxCollection: {
      after: function(e) {
        if (ob(e), ab(e.schema, e.methods), e.name.charAt(0) === "_")
          throw $("DB2", {
            name: e.name
          });
        if (!e.schema)
          throw $("DB4", {
            name: e.name,
            args: e
          });
      }
    },
    createRxDocument: {
      before: function(e) {
        hb(e.primary, e.toJSON(!0));
      }
    },
    preCreateRxQuery: {
      after: function(e) {
        lb(e);
      }
    },
    prePrepareQuery: {
      after: (e) => {
        fb(e);
      }
    },
    preStorageWrite: {
      before: (e) => {
        pb(e.storageInstance, e.rows);
      }
    },
    createRxCollection: {
      after: (e) => {
        Is(e.creator.statics), Is(e.creator.methods), Is(e.creator.attachments), e.creator.schema && e.creator.migrationStrategies && sb(e.creator.schema, e.creator.migrationStrategies);
      }
    }
  }
};
By(gb);
class bb {
  constructor() {
    Kr(this, "db", null);
    Kr(this, "schemas", []);
  }
  async register(t) {
    if (this.schemas.find((n) => n.name === t.name) || this.schemas.push(t), this.db) {
      if (this.db.collections[t.name])
        return;
      const n = {};
      n[t.name] = {
        schema: mc(t)
      }, await this.db.addCollections(n);
    }
  }
  async init(t = "agent_k_db", r) {
    if (this.db) return this.db;
    this.db = await Ty({
      name: t,
      storage: r || Gg(),
      ignoreDuplicate: !0
    });
    const n = {};
    for (const i of this.schemas)
      n[i.name] = {
        schema: mc(i)
      };
    return await this.db.addCollections(n), this.db;
  }
}
const ai = typeof window < "u" ? window : global, fa = Symbol.for("agent-k.store");
ai[fa] || (ai[fa] = new bb());
ai.__AGENT_K_STORE__ = ai[fa];
const bt = ai[fa], _b = ta([
  ze(),
  // Static value (e.g., "user_123")
  Tr({
    source: Rc(["route", "context", "global", "state"]),
    // Dynamic sources
    key: ze()
    // route: "userId" from /users/:userId
    // context: "itemId" from parent list iteration
    // global: "currentUser" from global app state
    // state: "selectedTab" from local UI state variables
  })
]), wb = Tr({
  collection: ze(),
  id: _b.optional(),
  // Dynamic ID binding
  query: oo(ao()).optional()
  // For list binding
}), xb = Tr({
  x: vt().default(0),
  y: vt().default(0),
  scale: vt().default(1),
  rotation: vt().default(0),
  opacity: vt().default(1),
  zIndex: vt().default(0),
  width: ta([vt(), ze()]).optional(),
  height: ta([vt(), ze()]).optional()
}), kb = Tr({
  id: ze(),
  // Unique instance ID
  type: ze(),
  // Component Type Name (e.g., 'UserCard')
  // Mixin the props
  canvas: xb,
  data: wb.optional(),
  // Any other static props (e.g., title="Hello")
  props: oo(ao()).optional()
}), Ob = Tr({
  id: ze(),
  name: ze(),
  route: ze(),
  // e.g., '/home'
  components: so(kb)
}), Gb = Tr({
  name: ze(),
  version: ze(),
  pages: so(Ob)
});
function Sb(e, t = {}) {
  const [r, n] = Vr([]), [i, s] = Vr(!0), [u, l] = Vr(null);
  return bc(() => {
    let d;
    return (async () => {
      try {
        bt.db || await bt.init();
        let v = bt.db.collections[e];
        if (!v)
          for (let C = 0; C < 10 && (await new Promise((I) => setTimeout(I, 100)), v = bt.db.collections[e], !v); C++)
            ;
        if (!v)
          throw new Error(`Collection ${e} not found`);
        d = v.find(t).$.subscribe((C) => {
          n(C.map((I) => I.toJSON())), s(!1);
        });
      } catch (v) {
        l(v), s(!1);
      }
    })(), () => {
      d && d.unsubscribe();
    };
  }, [e, JSON.stringify(t)]), { data: r, loading: i, error: u };
}
function Eb(e, t) {
  const [r, n] = Vr(null), [i, s] = Vr(!0), [u, l] = Vr(null);
  return bc(() => {
    let d;
    return (async () => {
      try {
        bt.db || await bt.init();
        const v = bt.db.collections[e];
        if (!v) throw new Error(`Collection ${e} not found`);
        d = v.findOne(t).$.subscribe((C) => {
          C ? (n(C.toJSON()), s(!1), C.get("_isFull") === !1 && console.warn(`[Agent K Sync] Snippet detected for ${e}:${t}. Initiating background fetch for full data from Amber Backend...`)) : (n(null), s(!1), console.warn(`[Agent K Sync] Document ${e}:${t} not found locally. Initiating forced fetch from Amber Backend...`));
        });
      } catch (v) {
        l(v), s(!1);
      }
    })(), () => {
      d && d.unsubscribe();
    };
  }, [e, t]), { data: r, loading: i, error: u };
}
function Cb(e) {
  return { dispatch: async (r, n = null, i = {}) => {
    bt.db || await bt.init();
    const s = bt.db.collections[e];
    if (!s) throw new Error(`Collection ${e} not found`);
    console.log(`[CQRS Tunnel] Dispatch Intent Triggered: ${r} on ${e}:${n}`, i);
    try {
      let u;
      switch (r) {
        case "create":
          u = await s.insert(i);
          break;
        case "update":
          if (!n) throw new Error("Optimistic Update requires a targetId");
          const d = await s.findOne(n).exec();
          d ? u = await d.patch(i) : console.warn(`Optimistic Update ignored: Document ${n} not found locally.`);
          break;
        case "delete":
          if (!n) throw new Error("Optimistic Delete requires a targetId");
          const m = await s.findOne(n).exec();
          m && (u = await m.remove());
          break;
        default:
          console.log(`[CQRS Tunnel] Custom Semantic Action '${r}' recorded. Bypassing local RxDB mutation.`);
          break;
      }
      const l = {
        action: r,
        collection: e,
        targetId: n,
        payload: i,
        timestamp: Date.now(),
        status: "pending"
      };
      return console.info("[Sync Engine] -> Queued Command for Ruby Backend:", l), u;
    } catch (u) {
      throw console.error("[CQRS Tunnel] Local Optimistic Execution Failed (Rollback triggered):", u), u;
    }
  } };
}
const Rb = ({
  x: e = 0,
  y: t = 0,
  scale: r = 1,
  rotation: n = 0,
  opacity: i = 1,
  zIndex: s = 0,
  width: u = "auto",
  height: l = "auto",
  children: d,
  className: m,
  style: v,
  onClick: _
}) => {
  const C = {
    position: "absolute",
    left: e,
    top: t,
    transform: `scale(${r}) rotate(${n}deg)`,
    transformOrigin: "0 0",
    // Align to top-left as requested
    opacity: i,
    zIndex: s,
    width: u,
    height: l,
    ...v
  };
  return /* @__PURE__ */ Tt("div", { className: m, style: C, onClick: _, children: d });
};
function Db({ collection: e, id: t, children: r }) {
  const { data: n, loading: i, error: s } = Eb(e, t);
  return /* @__PURE__ */ Tt(_c, { children: r(n, i, s) });
}
function Ib({ collection: e, query: t, children: r }) {
  const { data: n, loading: i, error: s } = Sb(e, t);
  return /* @__PURE__ */ Tt(_c, { children: r(n, i, s) });
}
function Pb({
  collection: e,
  id: t,
  query: r,
  children: n,
  ...i
}) {
  const { dispatch: s } = Cb(e), u = {
    add: (d) => s("create", null, d),
    update: (d, m) => s("update", d, m),
    remove: (d) => s("delete", d),
    navigate: i.navigate || (() => console.warn("Navigate not implemented")),
    refresh: () => {
      console.log(`[Agent K] Refreshing data for ${e}:${t || JSON.stringify(r)}`);
    }
  }, l = (d, m, v) => m ? null : v ? /* @__PURE__ */ bu("div", { children: [
    "Error: ",
    v.message
  ] }) : t && !d ? (console.log(`[BaseComponent] Data ${e}:${t} missing. Waiting for sync...`), /* @__PURE__ */ bu("div", { className: "agent-k-loading", children: [
    "Loading ",
    e,
    ":",
    t,
    "..."
  ] })) : /* @__PURE__ */ Tt(Rb, { ...i, children: n({ data: d, actions: u }) });
  return t ? /* @__PURE__ */ Tt(Db, { collection: e, id: t, children: l }) : /* @__PURE__ */ Tt(Ib, { collection: e, query: r, children: l });
}
function Tb(e, t) {
  if (e) {
    if (typeof e == "string")
      return e;
    switch (e.source) {
      case "route":
        return t.routeParams[e.key];
      case "global":
        return t.global[e.key];
      case "state":
        return t.state[e.key];
      case "context":
        return;
      default:
        return;
    }
  }
}
const Yb = ({ page: e, components: t, context: r }) => /* @__PURE__ */ Tt("div", { className: "agent-k-page", style: { position: "relative", width: "100%", height: "100%" }, children: e.components.map((n) => {
  const i = t[n.type];
  if (!i)
    return console.warn(`[Renderer] Component type "${n.type}" not found in registry.`), null;
  let s = {};
  if (n.data) {
    const _ = Tb(n.data.id, r);
    s = {
      collection: n.data.collection,
      id: _,
      query: n.data.query
    };
  }
  const { key: u, ...l } = n.canvas, { key: d, ...m } = n.props || {}, v = {
    ...l,
    // x, y, scale, etc.
    ...s,
    // collection, id
    ...m,
    // static props
    navigate: r.navigate
    // Pass navigation capability
  };
  return /* @__PURE__ */ Tt(Pb, { ...v, children: (_) => /* @__PURE__ */ Tt(i, { ..._, ...n.props }) }, n.id);
}) });
export {
  Gb as AppSpecSchema,
  Pb as BaseComponent,
  _b as BindingSourceSchema,
  Rb as CanvasContainer,
  xb as CanvasPropsSchema,
  kb as ComponentInstanceSchema,
  wb as DataBindingSchema,
  Ob as PageSchema,
  Yb as Renderer,
  bb as Store,
  Qb as defineSchema,
  bt as store,
  mc as toRxSchema,
  Cb as useDispatch,
  Eb as useEntity,
  Sb as useList,
  Bb as z
};
