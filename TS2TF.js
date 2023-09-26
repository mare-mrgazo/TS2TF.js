class _2p_h {
    constructor() { this.params = ["K", "ωn", "ζ"] }

    grad = {
        'ISE': function (params, $x, $y, L) {
            var dEdK = 0, dEdωn = 0, dEdζ = 0, dEdT = 0, n = $x.length
            var { K, ωn, ζ } = params

            for (var i = 0; i < n; i++) {
                var x = $x[i]
                var y = $y[i]

                dEdK += (2 * ((Math.exp(-ωn * x * ζ) * Math.sin(Math.acos(ζ) + ωn * x * Math.sqrt(1 - Math.pow(ζ, 2))))
                    / Math.sqrt(1 - Math.pow(ζ, 2)) - 1) * (y - (1 - (Math.exp(-ωn * x * ζ) * Math.sin(Math.acos(ζ)
                        + ωn * x * Math.sqrt(1 - Math.pow(ζ, 2)))) / Math.sqrt(1 - Math.pow(ζ, 2))) * K)) / n

                dEdωn += (2 * K * x * Math.exp(-2 * x * ζ * ωn) * (K * Math.sin(x * Math.sqrt(1 - Math.pow(ζ, 2)) * ωn + Math.acos(ζ)) + (y - K) * Math.sqrt(1 - Math.pow(ζ, 2)) * Math.exp(x * ζ * ωn)) * (ζ * Math.sin(x * Math.sqrt(1 - Math.pow(ζ, 2)) * ωn + Math.acos(ζ)) - Math.sqrt(1 - Math.pow(ζ, 2)) * Math.cos(x * Math.sqrt(1 - Math.pow(ζ, 2)) * ωn + Math.acos(ζ)))) / (n * (Math.pow(ζ, 2) - 1))

                dEdζ += (2 * K * Math.exp(-2 * ωn * x * ζ) * (K * Math.sin(Math.acos(ζ) + ωn * x * Math.sqrt(1 - Math.pow(ζ
                    , 2))) + (y - K) * Math.sqrt(1 - Math.pow(ζ, 2)) * Math.exp(ωn * x * ζ)) * ((ωn * x * Math.pow(ζ,
                        2) + ζ - ωn * x) * Math.sin(Math.acos(ζ) + ωn * x * Math.sqrt(1 - Math.pow(ζ, 2))) + (-ωn * x *
                            ζ - 1) * Math.sqrt(1 - Math.pow(ζ, 2)) * Math.cos(Math.acos(ζ) + ωn * x * Math.sqrt(1 - Math.pow(ζ, 2))))) / (n * (Math.pow(ζ, 2) - 1) ** 2)


            }

            K = Math.max(K - dEdK * L, 0.01)
            ωn = Math.max(ωn - dEdωn * L, 0.01)
            ζ = Math.min(Math.max(ζ - dEdζ * L, 0.01), 0.99)

            return { K, ωn, ζ }
        }
    }

    y = function (param, x) {
        const { K, ωn, ζ } = param
        const ωc = ωn * Math.sqrt(1 - Math.pow(ζ, 2))
        var y = []
        x.forEach((x, i) => {
            y[i] = K * (
                1
                - (Math.exp(-ζ * ωn * x) * Math.sin(ωc * x + Math.acos(ζ)))
                / (Math.sqrt(1 - Math.pow(ζ, 2)))
            )
        })
        return y
    }
}

var _2p = new _2p_h()

class _3p_h {
    constructor() { this.params = ["K", "ωn", "ζ", "T"] }

    grad = {
        'ISE': function (params, $x, $y, L) {
            var dEdK = 0, dEdωn = 0, dEdζ = 0, dEdT = 0, n = $x.length
            var { K, ωn, ζ, T } = params

            for (var i = 0; i < n; i++) {
                var x = $x[i]
                var y = $y[i]

                dEdK += (2 * (((ωn * (Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) - T) * (Math.exp(-T * x) - Math.sqrt(2) * Math.exp(-ωn * x * ζ) * Math.sin(ωn * x * Math.sqrt(1 - Math.pow(ζ, 2)) + Math.PI / 4))) / (-2 * T * ωn * ζ + Math.pow(ωn, 2) + Math.pow(T, 2)) - (1 - Math.exp(-T * x)) / T) * (y - ((1 - Math.exp(-T * x)) / T - ((ωn * (Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) - T) * (Math.exp(-T * x) - Math.sqrt(2) * Math.exp(-ωn * x * ζ) * Math.sin(ωn * x * Math.sqrt(1 - Math.pow(ζ, 2)) + Math.PI / 4))) / (-2 * T * ωn * ζ +
                    Math.pow(ωn, 2) + Math.pow(T, 2))) * K)) / n

                dEdωn += -(2 * K * (-(((Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) * ωn - T) * (Math.sqrt(2) * x * ζ * Math.exp(-x * ζ * ωn) * Math.sin(x * Math.sqrt(1 - Math.pow(ζ, 2)) * ωn + Math.PI / 4) - Math.sqrt(2) * x * Math.sqrt(1 - Math.pow(ζ, 2)) * Math.exp(-x * ζ * ωn) * Math.cos(x * Math.sqrt(1 - Math.pow(ζ, 2))
                    * ωn + Math.PI / 4))) / (Math.pow(ωn, 2) - 2 * T * ζ * ωn + Math.pow(T, 2)) - ((Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) * (Math.exp(-T * x) - Math.sqrt(2) * Math.exp(-x * ζ * ωn) * Math.sin(x * Math.sqrt(1 - Math.pow(ζ, 2)) * ωn + Math.PI / 4))) / (Math.pow(ωn, 2) - 2 * T * ζ * ωn + Math.pow(T,
                        2)) + ((2 * ωn - 2 * T * ζ) * ((Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) * ωn - T) * (Math.exp(-T * x) -
                            Math.sqrt(2) * Math.exp(-x * ζ * ωn) * Math.sin(x * Math.sqrt(1 - Math.pow(ζ, 2)) * ωn + Math.PI /
                                4))) / (Math.pow(ωn, 2) - 2 * T * ζ * ωn + Math.pow(T, 2)) ** 2) * (y - K * ((1 - Math.exp(-T * x)) / T - (((Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) * ωn - T) * (Math.exp(-T * x) - Math.sqrt(2) * Math.exp(-x * ζ * ωn) * Math.sin(x * Math.sqrt(1 - Math.pow(ζ, 2)) * ωn + Math.PI / 4))) / (Math.pow(ωn, 2) - 2 * T * ζ * ωn + Math.pow(T, 2))))) / n

                dEdζ += -(2 * K * (-((ωn * (Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) - T) * (Math.sqrt(2) * ωn * x * Math.exp(-ωn * x * ζ) * Math.sin(ωn * x * Math.sqrt(1 - Math.pow(ζ, 2)) + Math.PI / 4) + (Math.sqrt(2) * ωn
                    * x * ζ * Math.exp(-ωn * x * ζ) * Math.cos(ωn * x * Math.sqrt(1 - Math.pow(ζ, 2)) + Math.PI / 4)) / Math.sqrt(1 - Math.pow(ζ, 2)))) / (-2 * T * ωn * ζ + Math.pow(ωn, 2) + Math.pow(T, 2)) - (2 * T * ωn * (ωn * (Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) - T) * (Math.exp(-T * x) - Math.sqrt(2) * Math.exp(-ωn * x * ζ) * Math.sin(ωn * x * Math.sqrt(1 - Math.pow(ζ, 2)) + Math.PI / 4))) / (-2 * T * ωn
                        * ζ + Math.pow(ωn, 2) + Math.pow(T, 2)) ** 2 - (ωn * (1 - ζ / Math.sqrt(1 - Math.pow(ζ, 2))) * (Math.exp(-T * x) - Math.sqrt(2) * Math.exp(-ωn * x * ζ) * Math.sin(ωn * x * Math.sqrt(1 - Math.pow(ζ
                            , 2)) + Math.PI / 4))) / (-2 * T * ωn * ζ + Math.pow(ωn, 2) + Math.pow(T, 2))) * (y - K * ((1 - Math.exp(-T * x)) / T - ((ωn * (Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) - T) * (Math.exp(-T * x) - Math.sqrt(2) * Math.exp(-ωn * x * ζ) * Math.sin(ωn * x * Math.sqrt(1 - Math.pow(ζ, 2)) + Math.PI / 4))) /
                                (-2 * T * ωn * ζ + Math.pow(ωn, 2) + Math.pow(T, 2))))) / n

                dEdT += -(2 * K * ((Math.exp(-x * T) - Math.sqrt(2) * Math.exp(-ωn * x * ζ) * Math.sin(ωn * x * Math.sqrt(1 -
                    Math.pow(ζ, 2)) + Math.PI / 4)) / (Math.pow(T, 2) - 2 * ωn * ζ * T + Math.pow(ωn, 2)) + ((ωn * (Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) - T) * (2 * T - 2 * ωn * ζ) * (Math.exp(-x * T) - Math.sqrt(2) * Math.exp(-ωn * x * ζ) * Math.sin(ωn * x * Math.sqrt(1 - Math.pow(ζ, 2)) + Math.PI / 4))) / (Math.pow(T, 2) - 2 * ωn * ζ * T + Math.pow(ωn, 2)) ** 2 + (x * (ωn * (Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) - T) * Math.exp(-x * T)) / (Math.pow(T, 2) - 2 * ωn * ζ * T + Math.pow(ωn, 2)) + (x * Math.exp(-x * T)) / T - (1 - Math.exp(-x * T)) / Math.pow(T, 2)) * (y - K * ((1 - Math.exp(-x * T)) / T - ((ωn * (Math.sqrt(1 - Math.pow(ζ, 2)) + ζ) - T) * (Math.exp(-x * T) - Math.sqrt(2) * Math.exp(-ωn * x * ζ) * Math.sin(ωn * x * Math.sqrt(1 - Math.pow(ζ, 2)) + Math.PI / 4))) / (Math.pow(T, 2) - 2 * ωn
                        * ζ * T + Math.pow(ωn, 2))))) / n

            }

            K = Math.max(K - dEdK * L, 0.01)
            ωn = Math.max(ωn - dEdωn * L, 0.01)
            ζ = Math.min(Math.max(ζ - dEdζ * L, 0.01), 0.99)
            T = Math.max(T - dEdT * L, 0.01)

            return { K, ωn, ζ, T }
        }
    }

    y = function (param, x) {
        const { K, ωn, ζ, T } = param
        var y = []
        x.forEach((x, i) => {
            y[i] = K * (
                (1 / T) * (1 - Math.exp(-T * x))
                - (
                    (ωn * (ζ + Math.sqrt(1 - Math.pow(ζ, 2))) - T)
                    / (Math.pow(ωn, 2) + Math.pow(T, 2) - 2 * T * ζ * ωn)
                )
                * (
                    Math.exp(-T * x)
                    - Math.sqrt(2)
                    * Math.exp(-x * ωn * ζ)
                    * Math.sin(ωn * Math.sqrt(1 - Math.pow(ζ, 2)) * x + Math.PI / 4)
                )
            )
        })
        return y
    }
}

var _3p = new _3p_h()

const errf = {
    'ISE': function e(y2, y1, x) {
        var sum = 0
        x.forEach((x, i) => {
            sum += Math.pow((y2[i] - y1[i]), 2)
        })
        return sum
    }
}

function reckon({ x, y, est, e, iters, L, params, log, MBIP = 10, MSI = 300 }) {
    switch (est) {
        case "3p":
            var model = new _3p_h()
            break
        case "2p":
            var model = new _2p_h()
            break
        case "p":
            var model = new _p_h()
    }
    const T = Date.now(), D = String(iters).length
    var bi = 0 // number of bad iterations
    var si = 0 // number of same iterations

    for (var i = 0; i < iters; i++) {
        if (log) var $err = errf[e](y, model.y(params, x), x) // err(n-1)
        params = model.grad[e](params, x, y, L)
        if (log) {
            var err = errf[e](y, model.y(params, x), x) // err(n)
            if (err > $err) bi++
            var bip = parseInt(bi / iters * 100) // % of bad iterations

            var log = ""
            model.params.forEach(param => {
                log += `${param}: ${params[param].toFixed(2)} | `
            })
            log += `iter: ${String(i + 1).padStart(D, ' ')} | `
            log += `${String(((i + 1) / iters * 100).toFixed(0)).padStart(3, ' ')}% | `
            log += `${String(((Date.now() - T) / 1000).toFixed(2))}s ellapsed | `
            log += `${e}: ${err.toExponential(2)} | `
            log += `Bad iterations: ${String(bip).padStart(2, ' ')}%`

            if (err > $err) {
                console.log("%c" + log, 'color: yellow;')
            }
            else console.log(log)

            if (bip >= MBIP) {
                console.log(`% of bad iterations is ${MBIP}`)
                break
            }
            if (err.toExponential(2) == $err.toExponential(2)) si++
            else si = 0
            if (si >= MSI) {
                console.log(`${e} hasn't changed in ${MSI} iterations`)
                break
            }
        }
    }
    return {
        params: params,
        y: model.y(params, x)
    }
}

function grid({ x, y, est, e, L, params, log }) {
    switch (est) {
        case "3p":
            var model = new _3p_h()
            break
        case "2p":
            var model = new _2p_h()
            break
        case "p":
            var model = new _p_h()
    }
    var __params__ = [], _ = (a, p) => { if (a === model.params.length) { __params__.push([...p]); return } let r = model.params[a]; for (let s of params[r]) p.push(s), _(a + 1, p), p.pop() }; _(0, []);
    var $params = []; __params__.forEach(a => { for (var r = {}, p = 0; p < model.params.length; p++)r[model.params[p]] = a[p]; $params.push(r) });

    const iters = $params.length
    const T = Date.now(), D = String(iters).length
    var res = []
    var bi = 0 // number of bad iterations

    $params.forEach((params, i) => {
        if (log) var $err = errf[e](y, model.y(params, x), x) // err(n-1)

        params = model.grad[e](params, x, y, L)

        if (log) {
            var err = errf[e](y, model.y(params, x), x) // err(n)
            if (err > $err) bi++
            var bip = parseInt(bi / iters * 100) // % of bad iterations

            var $log = ""
            model.params.forEach(param => {
                $log += `${param}: ${params[param].toFixed(2)} | `
            })
            $log += `iter: ${String(i + 1).padStart(D, ' ')} | `
            $log += `${String(((i + 1) / iters * 100).toFixed(0)).padStart(3, ' ')}% | `
            $log += `${String(((Date.now() - T) / 1000).toFixed(2))}s ellapsed | `
            $log += `${e}: ${err.toExponential(2)} | `
            $log += `Bad iterations: ${String(bip).padStart(2, ' ')}%`

            if (err > $err) {
                console.log("%c" + $log, 'color: yellow;')
            }
            else console.log($log)

        }
        res[i] = {
            e: err,
            params: params
        }
    })

    var i = res.reduce((e, r, a, c) => r.e < c[e].e ? a : e, 0);

    return res[i]
}

const module = {
    reckon,
    grid,
    _3p,
    _2p
};

export default module;