// Service
import { serviceCallInversionOfControl, ServiceCallMethod } from './api';


describe('fetch api wrapper', () => {

    test('a basic fetch call', async () => {
        const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('success') } as Response));
        const serviceCall = serviceCallInversionOfControl(mockFetch);

        await serviceCall('http://www.example.com/api/titles');

        expect(mockFetch).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledWith(
            expect.any(URL),
            {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                method : 'GET',
            }
        );
    });

    test('when passed urlParams in the config the url bracket values as "{year}" are replaced by the values in urlParams', async () => {
        const mockFetch = jest.fn((url: URL | RequestInfo) => {
            expect(url.toString()).toBe('http://www.example.com/api/titles/esp/year/1998');
            return Promise.resolve({ json: () => Promise.resolve('success') } as Response);
        });
        const serviceCall = serviceCallInversionOfControl(mockFetch);
        const urlParams = { 'country_code': 'esp', 'year': '1998', 'unused_url_param': 'foobar' };

        await serviceCall('http://www.example.com/api/titles/{country_code}/year/{year}', { method: ServiceCallMethod.Get, urlParams });

        expect(mockFetch).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledWith(
            expect.any(URL),
            {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                method : 'GET',
                urlParams,
            }
        );
    });

    test('if the url passed as parameter don\'t contains the URL location this it\'s appended to the start', async () => {
        const mockFetch = jest.fn((url: URL | RequestInfo) => {
            expect(url.toString()).toBe('http://localhost/api/titles');
            return Promise.resolve({ json: () => Promise.resolve('success') } as Response);
        });
        const serviceCall = serviceCallInversionOfControl(mockFetch);

        await serviceCall('/api/titles');

        expect(mockFetch).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledWith(
            expect.any(URL),
            {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                method : 'GET',
            }
        );
    });

    test('when params are passed in the config the url it\'s completed with them', async () => {
        const mockFetch = jest.fn((url: URL | RequestInfo) => {
            console.log(url.toString());
            expect(url.toString()).toBe('http://www.example.com/api/titles?query=Homero&limit=10&bounds=20%2C50');
            return Promise.resolve({ json: () => Promise.resolve('success') } as Response);
        });
        const serviceCall = serviceCallInversionOfControl(mockFetch);
        const params = { query: 'Homero', limit: 10, bounds: ['20', 50] };

        await serviceCall('http://www.example.com/api/titles', { method: ServiceCallMethod.Get, params });

        expect(mockFetch).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledWith(
            expect.any(URL),
            {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                method : 'GET',
                params,
            }
        );
    });
});
