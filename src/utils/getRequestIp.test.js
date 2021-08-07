import getRequestIp from './getRequestIp';

describe('getRequestIp', () => {
  test('default header use request-ip handling.', () => {
    const request = {
      'headers': {
        'x-forwarded-for': '100.30.552.910, 10.0.0.59,::ffff:10.0.0.187,::ffff:10.0.0.168',
        'x-forwarded-host': 'xyz-thehost.qa',
        'x-forwarded-port': '443,80,80',
        'x-forwarded-proto': 'https,http,http',
        'x-forwarded-server': 'something-traefik',
        'x-real-ip': '100.30.552.210',
      }
    };
    expect(getRequestIp(request)).toEqual('100.30.552.910');
  });

  test('x-forwarded-for header is present in request.', () => {
    const request = {
      'headers': {
        'x-forwarded-for': '123.456.78.910, 10.255.0.25, 10.0.0.59,::ffff:10.0.0.187,::ffff:10.0.0.168',
      }
    };
    expect(getRequestIp(request)).toEqual('123.456.78.910');
  });

  test('Incapsula header is present in request.', () => {
    const request = {
      'headers': {
        'x-forwarded-for': '123.456.78.910',
        'incap-client-ip': '65.88.88.123'
      }
    };
    expect(getRequestIp(request)).toEqual('65.88.88.123');
  });

  test('Debug mode is enabled.', () => {
    const request = {
      'headers': {
        'x-forwarded-for': '123.456.78.910',
        'incap-client-ip': '65.88.88.123'
      }
    };
    const debugIpAddress = '999.99.99.999';
    expect(getRequestIp(request, debugIpAddress)).toEqual('999.99.99.999');
  });
});