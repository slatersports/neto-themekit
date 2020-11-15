const files = require('../files')

describe('files', () => {
    describe('getWorkingDirectory', () => {
        test('returns the current working directory', () => {
            expect(files.getWorkingDirectory()).toMatch('neto-themekit')
        })
    })
    describe('getRemotePath', () => {
        test('returns the equivalent remote path', () => {
            expect(files.getRemotePath('some-theme', 'template.html')).toEqual('httpdocs/assets/themes/some-theme/template.html')
            expect(files.getRemotePath('some-other-theme')).toEqual('httpdocs/assets/themes/some-other-theme')
        })
    })
    describe('getRelativePath', () => {
        test('returns the path of a file relative to the current working directory', () => {
            const spy = jest.spyOn(process, 'cwd').mockImplementationOnce(() => 'home/me/some-working-directory')

            expect(files.getRelativePath('home/me/some-working-directory/templates/template.html')).toEqual('/templates/template.html')

            spy.mockRestore()
        })
    })
})