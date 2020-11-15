const config = require("../config")

const defaultConfig = {
    development: {
        username: 'some_username',
        password: 'some_password',
        theme: 'some_theme',
        ignore_patterns: [],
        ignores: []
    }
}

describe('config', () => {
    describe('getConfigPath', () => {
        test.todo('returns an absolute path for a config file')
    })
    describe('writeConfig', () => {
        test.todo('writes the config to disk')
    })
    describe('getConfig', () => {
        test.todo('reads an environment from disk')
    })
    describe('validateConfig', () => {
        test('throws an error on an invalid username', () => {
            const fixture = Object.assign({}, defaultConfig)

            fixture.development.username = 2
            
            expect(() => config.validateConfig(fixture)).toThrowError()
        })
        test('throws an error on an invalid password', () => {
            const fixture = Object.assign({}, defaultConfig)

            fixture.development.password = 2
            
            expect(() => config.validateConfig(fixture)).toThrowError()
        })
        test('throws an error on an invalid theme', () => {
            const fixture = Object.assign({}, defaultConfig)

            fixture.development.theme = 2
            
            expect(() => config.validateConfig(fixture)).toThrowError()
        })
        test('throws an error on an invalid ignore_files', () => {
            const fixture = Object.assign({}, defaultConfig)

            fixture.development.ignore_files = 2
            
            expect(() => config.validateConfig(fixture)).toThrowError()
        })
        test('throws an error on an invalid ignores', () => {
            const fixture = Object.assign({}, defaultConfig)

            fixture.development.ignores = 2
            
            expect(() => config.validateConfig(fixture)).toThrowError()
        })
    })
})